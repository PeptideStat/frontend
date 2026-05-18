/**
 * Ping IndexNow with recently changed public URLs.
 *
 * Runs as `postbuild` so each production deploy can notify Bing/Yandex/etc.
 *
 * Gating:
 *   - Pings only when VERCEL_ENV === "production", INDEXNOW_FORCE=1, or
 *     `--force` is passed on the command line.
 *   - Skips silently (exit 0) otherwise — local builds and preview deploys
 *     never ping. `npm run ping-indexnow` passes --force for manual runs.
 *   - Production deploys submit only URLs derived from changed files.
 *     `--force` submits the full public URL inventory for migrations,
 *     redesigns and manual catch-up pings.
 *
 * URL discovery (mirrors app/sitemap.ts):
 *   - Static routes are hard-coded below.
 *   - Article slugs come from content/peptides/*.mdx (drafts + future-dated
 *     entries are excluded, matching lib/content.ts).
 *   - Database peptide + category-hub slugs are extracted from the
 *     data/*.ts source files via regex on `slug: "..."`. The Peptide /
 *     PeptideCategoryHub `interface` declarations use `slug: string;`
 *     (no quotes) so they are not matched.
 *
 * Failures are logged but never fail the build — IndexNow is best-effort.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const CONTENT_DIR = path.join(ROOT, "content", "peptides");
const DATA_DIR = path.join(ROOT, "data");

const DEFAULT_SITE_URL = "https://www.peptidestat.com";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
)
  .replace(/^https:\/\/peptidestat\.com\/?$/i, DEFAULT_SITE_URL)
  .replace(/\/$/, "");

const forceFlag = process.argv.includes("--force");
const shouldRun =
  process.env.VERCEL_ENV === "production" ||
  process.env.INDEXNOW_FORCE === "1" ||
  forceFlag;

if (!shouldRun) {
  console.log(
    `[indexnow] Skipping — VERCEL_ENV=${process.env.VERCEL_ENV ?? "(unset)"}. ` +
      `Pass --force or set INDEXNOW_FORCE=1 to ping anyway.`,
  );
  process.exit(0);
}

// --- key discovery -------------------------------------------------------

const keyFile = fs
  .readdirSync(PUBLIC_DIR)
  .find((f) => /^[a-f0-9-]{8,128}\.txt$/i.test(f));

if (!keyFile) {
  console.warn(
    "[indexnow] No IndexNow key file found in public/. Skipping ping.",
  );
  process.exit(0);
}

const key = keyFile.replace(/\.txt$/i, "");
const keyLocation = `${SITE_URL}/${keyFile}`;
const host = new URL(SITE_URL).host;

// --- static routes (mirror app/sitemap.ts) -------------------------------

const STATIC_PATHS = [
  "/",
  "/bryan-johnson-discount-code",
  "/shop",
  "/calculators",
  "/calculators/accumulation",
  "/calculators/unit-converter",
  "/calculators/peptide-chemistry",
  "/database",
  "/peptides",
  "/about",
  "/editorial-policy",
  "/authors/peptidestat-editorial-team",
  "/disclaimer",
  "/privacy",
];

const ARTICLE_INDEX_PATHS = ["/peptides"];
const DATABASE_INDEX_PATHS = ["/database"];
const HOME_PATHS = ["/"];

const STATIC_PAGE_BY_FILE = new Map([
  ["app/page.tsx", "/"],
  ["app/bryan-johnson-discount-code/page.tsx", "/bryan-johnson-discount-code"],
  ["app/shop/page.tsx", "/shop"],
  ["app/calculators/page.tsx", "/calculators"],
  ["app/calculators/accumulation/page.tsx", "/calculators/accumulation"],
  ["app/calculators/unit-converter/page.tsx", "/calculators/unit-converter"],
  ["app/calculators/peptide-chemistry/page.tsx", "/calculators/peptide-chemistry"],
  ["app/database/page.tsx", "/database"],
  ["app/peptides/page.tsx", "/peptides"],
  ["app/about/page.tsx", "/about"],
  ["app/editorial-policy/page.tsx", "/editorial-policy"],
  [
    "app/authors/peptidestat-editorial-team/page.tsx",
    "/authors/peptidestat-editorial-team",
  ],
  ["app/disclaimer/page.tsx", "/disclaimer"],
  ["app/privacy/page.tsx", "/privacy"],
]);

// --- articles ------------------------------------------------------------

function readArticlePaths() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const now = Date.now();
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.mdx$/, ""), data };
    })
    .filter(({ data }) => !data.draft)
    .filter(({ data }) => {
      if (!data.date) return true;
      const t = new Date(data.date).getTime();
      return Number.isNaN(t) ? true : t <= now;
    })
    .map(({ slug }) => `/peptides/${slug}`);
}

// --- database peptides + category hubs -----------------------------------

function extractSlugsFromTs(file) {
  const fullPath = path.join(DATA_DIR, file);
  if (!fs.existsSync(fullPath)) return [];
  const src = fs.readFileSync(fullPath, "utf8");
  return [...src.matchAll(/slug:\s*["']([a-z0-9-]+)["']/g)].map((m) => m[1]);
}

const peptidePaths = extractSlugsFromTs("peptides.ts").map(
  (s) => `/database/${s}`,
);
const hubPaths = extractSlugsFromTs("peptideCategoryHubs.ts").map(
  (s) => `/database/${s}`,
);

// --- build full URL list -------------------------------------------------

const allPaths = [
  ...STATIC_PATHS,
  ...readArticlePaths(),
  ...peptidePaths,
  ...hubPaths,
];

const urlList = [...new Set(allPaths.map((p) => `${SITE_URL}${p}`))];

function fullUrl(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${cleanPath}`;
}

function readChangedFiles() {
  const head = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";
  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
  const zeroSha = /^0{40}$/;
  const ranges = [];

  if (previous && !zeroSha.test(previous) && previous !== head) {
    ranges.push([previous, head]);
  }
  ranges.push(["HEAD~1", "HEAD"]);

  for (const [base, tip] of ranges) {
    try {
      const output = execFileSync(
        "git",
        ["diff", "--name-status", base, tip],
        { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
      ).trim();

      if (!output) return [];

      return output.split(/\r?\n/).flatMap((line) => {
        const parts = line.split("\t");
        const status = parts[0];
        if (status.startsWith("R") || status.startsWith("C")) {
          return [parts[1], parts[2]].filter(Boolean);
        }
        return parts[1] ? [parts[1]] : [];
      });
    } catch {
      // Try the next range.
    }
  }

  return null;
}

function addAll(target, paths) {
  for (const item of paths) target.add(fullUrl(item));
}

function mapChangedFilesToUrls(files) {
  const urls = new Set();
  let submitAll = false;

  for (const rawFile of files) {
    const file = rawFile.replace(/\\/g, "/");
    const articleMatch = file.match(/^content\/peptides\/([a-z0-9-]+)\.mdx$/);

    if (articleMatch) {
      urls.add(fullUrl(`/peptides/${articleMatch[1]}`));
      addAll(urls, ARTICLE_INDEX_PATHS);
      continue;
    }

    const staticPath = STATIC_PAGE_BY_FILE.get(file);
    if (staticPath) {
      urls.add(fullUrl(staticPath));
      continue;
    }

    if (
      file === "app/peptides/[slug]/page.tsx" ||
      file === "components/mdx.tsx" ||
      file === "lib/content.ts"
    ) {
      addAll(urls, [...ARTICLE_INDEX_PATHS, ...readArticlePaths()]);
      continue;
    }

    if (
      file === "app/database/[slug]/page.tsx" ||
      file === "components/PeptideDatabase.tsx" ||
      file === "data/peptides.ts" ||
      file === "data/peptideEvidence.ts"
    ) {
      addAll(urls, [...DATABASE_INDEX_PATHS, ...peptidePaths, ...hubPaths]);
      continue;
    }

    if (
      file === "components/PeptideCategoryHub.tsx" ||
      file === "data/peptideCategoryHubs.ts"
    ) {
      addAll(urls, [...DATABASE_INDEX_PATHS, ...hubPaths]);
      continue;
    }

    if (
      file === "components/StatsRow.tsx" ||
      file === "components/HeroSection.tsx" ||
      file === "components/CategoryGrid.tsx" ||
      file === "components/FeaturedGuides.tsx" ||
      file === "components/TrustedSources.tsx" ||
      file === "lib/data.ts"
    ) {
      addAll(urls, HOME_PATHS);
      continue;
    }

    if (file.startsWith("public/images/articles/")) {
      addAll(urls, readArticlePaths());
      continue;
    }

    if (file.startsWith("public/images/categories/")) {
      addAll(urls, HOME_PATHS);
      continue;
    }

    if (
      file === "app/layout.tsx" ||
      file === "app/globals.css" ||
      file === "app/sitemap.ts" ||
      file === "app/robots.ts" ||
      file === "lib/seo.ts" ||
      file === "site.config.ts" ||
      file.startsWith("components/Header") ||
      file.startsWith("components/Footer") ||
      file.startsWith("components/InternalLinkBlocks") ||
      file.startsWith("components/Related") ||
      file.startsWith("public/favicon") ||
      file.startsWith("public/icon")
    ) {
      submitAll = true;
      break;
    }
  }

  return submitAll ? urlList : [...urls];
}

const explicitUrls = (process.env.INDEXNOW_URLS || "")
  .split(/[\s,]+/)
  .map((url) => url.trim())
  .filter(Boolean)
  .map(fullUrl);

const changedFiles = forceFlag || explicitUrls.length ? [] : readChangedFiles();
const urlsToPing = forceFlag
  ? urlList
  : explicitUrls.length
    ? [...new Set(explicitUrls)]
    : changedFiles === null
      ? []
      : mapChangedFilesToUrls(changedFiles);

if (urlsToPing.length === 0) {
  console.warn("[indexnow] No changed URLs discovered. Skipping ping.");
  process.exit(0);
}

// --- POST to IndexNow ----------------------------------------------------

const payload = { host, key, keyLocation, urlList: urlsToPing };

try {
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200 OK and 202 Accepted are both success per the IndexNow spec.
  if (res.ok || res.status === 202) {
    console.log(
      `[indexnow] Pinged ${urlsToPing.length} URLs (HTTP ${res.status}) ` +
        `via ${keyLocation}`,
    );
  } else {
    const body = await res.text().catch(() => "");
    console.warn(
      `[indexnow] Ping failed: HTTP ${res.status} — ${body.slice(0, 300)}`,
    );
  }
} catch (err) {
  console.warn(`[indexnow] Ping threw: ${err?.message ?? err}`);
}
