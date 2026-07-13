import { appendFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalogSourcePath = resolve(projectRoot, "data/ascensionLinks.ts");
const availabilityBaselinePath = resolve(
  projectRoot,
  "data/ascensionAvailability.json",
);
const categoryRoot =
  "https://ascensionpeptides.com/product-category/peptides/";
const categoryPages = [1, 2, 3, 4];
const strict = process.argv.includes("--strict");
const configOnly = process.argv.includes("--config-only");

function decodeHtml(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

function cleanText(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProductPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  return decoded.endsWith("/") ? decoded : `${decoded}/`;
}

function mergeStockStatus(left = "unknown", right = "unknown") {
  if (left === "unknown") return right;
  if (right === "unknown" || left === right) return left;
  return "mixed";
}

function parseCatalogSource(source) {
  const referralCode = source.match(
    /export const ascensionReferralCode = "([^"]+)"/,
  )?.[1];
  const couponCode = source.match(
    /export const ascensionCouponCode = "([^"]+)"/,
  )?.[1];
  const products = [];
  const productPattern =
    /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*catalogPage:\s*([1-4])\s*\}/g;

  for (const match of source.matchAll(productPattern)) {
    products.push({
      id: match[1],
      name: match[2],
      path: normalizeProductPath(match[3]),
      catalogPage: Number(match[4]),
    });
  }

  return { referralCode, couponCode, products };
}

export function parseProductLinks(html, pageNumber, pageUrl) {
  const products = new Map();
  const anchorPattern =
    /<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(anchorPattern)) {
    const rawHref = decodeHtml(match[1] ?? match[2] ?? "");

    try {
      const url = new URL(rawHref, pageUrl);
      if (!/(^|\.)ascensionpeptides\.com$/i.test(url.hostname)) continue;

      const path = normalizeProductPath(url.pathname);
      if (!/^\/product\/[^/]+\/$/.test(path)) continue;

      const name = cleanText(match[3]);
      const existing = products.get(path);
      products.set(path, {
        path,
        name:
          name.length > (existing?.name.length ?? 0) ? name : existing?.name ?? "",
        pages: new Set([...(existing?.pages ?? []), pageNumber]),
        stockStatus: existing?.stockStatus ?? "unknown",
      });
    } catch {
      // Ignore malformed third-party markup and continue the rest of the page.
    }
  }

  const productCardPattern = /<li\b([^>]*)>([\s\S]*?)<\/li>/gi;
  for (const match of html.matchAll(productCardPattern)) {
    const attributes = match[1];
    const cardHtml = match[2];
    const classMatch = attributes.match(
      /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)')/i,
    );
    const className = classMatch?.[1] ?? classMatch?.[2] ?? "";
    if (!className.split(/\s+/).includes("product")) continue;

    let stockStatus = "unknown";
    const classes = new Set(className.split(/\s+/));
    if (classes.has("outofstock") || />\s*Read more\s*</i.test(cardHtml)) {
      stockStatus = "out-of-stock";
    } else if (
      classes.has("instock") ||
      />\s*Add to cart\s*</i.test(cardHtml) ||
      /ajax_add_to_cart/i.test(cardHtml)
    ) {
      stockStatus = "in-stock";
    }

    const hrefMatch = cardHtml.match(
      /<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')/i,
    );
    const rawHref = decodeHtml(hrefMatch?.[1] ?? hrefMatch?.[2] ?? "");

    try {
      const url = new URL(rawHref, pageUrl);
      if (!/(^|\.)ascensionpeptides\.com$/i.test(url.hostname)) continue;
      const path = normalizeProductPath(url.pathname);
      if (!/^\/product\/[^/]+\/$/.test(path)) continue;

      const existing = products.get(path);
      products.set(path, {
        path,
        name: existing?.name ?? "",
        pages: new Set([...(existing?.pages ?? []), pageNumber]),
        stockStatus: mergeStockStatus(existing?.stockStatus, stockStatus),
      });
    } catch {
      // Ignore a malformed card; the general anchor pass still checks its URL.
    }
  }

  return products;
}

function validateLocalConfig(config) {
  const errors = [];
  const ids = new Set();
  const paths = new Set();

  if (!config.referralCode) errors.push("Referral code could not be parsed.");
  if (!config.couponCode) errors.push("Coupon code could not be parsed.");
  if (config.products.length === 0) errors.push("No catalog products were parsed.");

  for (const product of config.products) {
    if (ids.has(product.id)) errors.push(`Duplicate product id: ${product.id}`);
    if (paths.has(product.path)) errors.push(`Duplicate product path: ${product.path}`);
    if (!/^\/product\/[^/]+\/$/.test(product.path)) {
      errors.push(`Invalid product path for ${product.id}: ${product.path}`);
    }

    ids.add(product.id);
    paths.add(product.path);

    const referralUrl = new URL(
      `${product.path}ref/${config.referralCode}/`,
      "https://ascensionpeptides.com",
    );
    referralUrl.searchParams.set("campaign", `audit_${product.id}`);

    if (
      referralUrl.pathname !==
      `${product.path}ref/${config.referralCode}/`
    ) {
      errors.push(`Referral path contract failed for ${product.id}.`);
    }
    if (referralUrl.searchParams.get("campaign") !== `audit_${product.id}`) {
      errors.push(`Campaign contract failed for ${product.id}.`);
    }
  }

  return errors;
}

function validateAvailabilityBaseline(config, baseline) {
  const errors = [];
  const knownIds = new Set(config.products.map((product) => product.id));
  const seen = new Set();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(baseline.checkedAt ?? "")) {
    errors.push("Availability baseline needs a YYYY-MM-DD checkedAt date.");
  }
  if (!Array.isArray(baseline.outOfStock)) {
    errors.push("Availability baseline needs an outOfStock array.");
    return errors;
  }

  for (const id of baseline.outOfStock) {
    if (!knownIds.has(id)) errors.push(`Unknown out-of-stock product id: ${id}`);
    if (seen.has(id)) errors.push(`Duplicate out-of-stock product id: ${id}`);
    seen.add(id);
  }

  return errors;
}

async function fetchCategoryPage(pageNumber) {
  const pageUrl =
    pageNumber === 1 ? categoryRoot : `${categoryRoot}page/${pageNumber}/`;
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(pageUrl, {
        headers: {
          accept: "text/html,application/xhtml+xml",
          "user-agent":
            "Mozilla/5.0 (compatible; PeptideStatCatalogAudit/1.0; +https://www.peptidestat.com/about)",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const products = parseProductLinks(html, pageNumber, response.url);

      if (products.size === 0) {
        throw new Error("no product links found");
      }

      return { pageNumber, pageUrl, finalUrl: response.url, products };
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_000));
    }
  }

  throw new Error(
    `Page ${pageNumber} (${pageUrl}): ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}

function mergeLiveProducts(pageResults) {
  const live = new Map();

  for (const result of pageResults) {
    for (const product of result.products.values()) {
      const existing = live.get(product.path);
      live.set(product.path, {
        path: product.path,
        name:
          product.name.length > (existing?.name.length ?? 0)
            ? product.name
            : existing?.name ?? "",
        pages: new Set([...(existing?.pages ?? []), ...product.pages]),
        stockStatus: mergeStockStatus(
          existing?.stockStatus,
          product.stockStatus,
        ),
      });
    }
  }

  return live;
}

function markdownList(items, formatter) {
  return items.length ? items.map((item) => `- ${formatter(item)}`).join("\n") : "- None";
}

function buildReport({
  availabilityBaseline,
  config,
  currentOutOfStock,
  fetchErrors,
  missing,
  moved,
  pageResults,
  stockChanges,
  stockConflicts,
  untracked,
}) {
  const lines = [
    "# Ascension catalog audit",
    "",
    `- Local catalog entries: **${config.products.length}**`,
    `- Live product paths: **${pageResults.length ? mergeLiveProducts(pageResults).size : 0}**`,
    `- Referral code: \`${config.referralCode}\``,
    `- Displayed coupon: \`${config.couponCode}\``,
    `- Missing local destinations: **${missing.length}**`,
    `- New untracked destinations: **${untracked.length}**`,
    `- Currently out of stock: **${currentOutOfStock.length}**`,
    `- Stock changes since ${availabilityBaseline.checkedAt}: **${stockChanges.length}**`,
    `- Products moved between pages: **${moved.length}**`,
    "",
    "## Category pages",
    markdownList(pageResults, (result) =>
      `Page ${result.pageNumber}: ${result.products.size} product paths (${result.finalUrl})`,
    ),
    "",
  ];

  if (fetchErrors.length) {
    lines.push(
      "## Fetch errors",
      markdownList(fetchErrors, (error) => error.message),
      "",
    );
  }

  lines.push(
    "## Missing from the live category pages",
    markdownList(missing, (product) => `\`${product.id}\` — ${product.path}`),
    "",
    "## Live but not mapped locally",
    markdownList(
      untracked,
      (product) =>
        `${product.name || "Unnamed product"} — ${product.path} (page ${[...product.pages].join(", ")})`,
    ),
    "",
    "## Pagination changes",
    markdownList(
      moved,
      ({ local, livePages }) =>
        `\`${local.id}\`: expected page ${local.catalogPage}; now found on ${livePages.join(", ")}`,
    ),
    "",
    "## Current out-of-stock listings",
    markdownList(
      currentOutOfStock,
      (product) => `\`${product.id}\` — ${product.name}`,
    ),
    "",
    `## Stock changes since ${availabilityBaseline.checkedAt}`,
    markdownList(
      stockChanges,
      ({ actual, expected, product }) =>
        `\`${product.id}\`: ${expected} → ${actual}`,
    ),
    "",
    "## Conflicting live stock signals",
    markdownList(stockConflicts, (product) => `\`${product.id}\` — ${product.path}`),
    "",
  );

  return lines.join("\n");
}

async function writeGithubSummary(report) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  await appendFile(process.env.GITHUB_STEP_SUMMARY, `${report}\n`, "utf8");
}

async function main() {
  const [source, availabilitySource] = await Promise.all([
    readFile(catalogSourcePath, "utf8"),
    readFile(availabilityBaselinePath, "utf8"),
  ]);
  const config = parseCatalogSource(source);
  const availabilityBaseline = JSON.parse(availabilitySource);
  const configErrors = [
    ...validateLocalConfig(config),
    ...validateAvailabilityBaseline(config, availabilityBaseline),
  ];

  const parserSelfTest = parseProductLinks(
    [
      '<li class="product type-product instock"><a href="https://ascensionpeptides.com/product/example-10mg/">Example 10mg</a><a>Add to cart</a></li>',
      '<li class="product type-product outofstock"><a href="https://ascensionpeptides.com/product/example-sold-out/">Sold Out</a><a>Read more</a></li>',
    ].join(""),
    1,
    categoryRoot,
  );
  if (!parserSelfTest.has("/product/example-10mg/")) {
    configErrors.push("HTML product-link parser self-test failed.");
  } else if (
    parserSelfTest.get("/product/example-10mg/").stockStatus !== "in-stock"
  ) {
    configErrors.push("HTML stock-status parser self-test failed.");
  } else if (
    parserSelfTest.get("/product/example-sold-out/")?.stockStatus !==
    "out-of-stock"
  ) {
    configErrors.push("HTML out-of-stock parser self-test failed.");
  }

  if (configErrors.length) {
    console.error(configErrors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
    return;
  }

  if (configOnly) {
    console.log(
      `Ascension config OK: ${config.products.length} unique direct referral destinations; referral=${config.referralCode}; coupon=${config.couponCode}.`,
    );
    return;
  }

  const settled = await Promise.allSettled(categoryPages.map(fetchCategoryPage));
  const pageResults = settled
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  const fetchErrors = settled
    .filter((result) => result.status === "rejected")
    .map((result) =>
      result.reason instanceof Error
        ? result.reason
        : new Error(String(result.reason)),
    );
  const live = mergeLiveProducts(pageResults);
  const localByPath = new Map(config.products.map((product) => [product.path, product]));
  const missing = config.products.filter((product) => !live.has(product.path));
  const untracked = [...live.values()].filter(
    (product) => !localByPath.has(product.path),
  );
  const moved = config.products.flatMap((local) => {
    const liveProduct = live.get(local.path);
    if (!liveProduct || liveProduct.pages.has(local.catalogPage)) return [];
    return [{ local, livePages: [...liveProduct.pages].sort() }];
  });
  const baselineOutOfStock = new Set(availabilityBaseline.outOfStock);
  const currentOutOfStock = config.products.filter(
    (product) => live.get(product.path)?.stockStatus === "out-of-stock",
  );
  const stockConflicts = config.products.filter(
    (product) => live.get(product.path)?.stockStatus === "mixed",
  );
  const stockChanges = config.products.flatMap((product) => {
    const actual = live.get(product.path)?.stockStatus;
    if (actual !== "in-stock" && actual !== "out-of-stock") return [];
    const expected = baselineOutOfStock.has(product.id)
      ? "out-of-stock"
      : "in-stock";
    return actual === expected ? [] : [{ product, expected, actual }];
  });
  const report = buildReport({
    availabilityBaseline,
    config,
    currentOutOfStock,
    fetchErrors,
    missing,
    moved,
    pageResults,
    stockChanges,
    stockConflicts,
    untracked,
  });

  console.log(report);
  await writeGithubSummary(report);

  if (
    fetchErrors.length ||
    missing.length ||
    (strict && (untracked.length || stockChanges.length || stockConflicts.length))
  ) {
    process.exitCode = 1;
  }
}

await main();
