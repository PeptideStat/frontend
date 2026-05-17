/**
 * Ping IndexNow with every public URL on the site.
 *
 * Runs as `postbuild` so each production deploy notifies Bing/Yandex/etc.
 *
 * Gating:
 *   - Pings only when VERCEL_ENV === "production", INDEXNOW_FORCE=1, or
 *     `--force` is passed on the command line.
 *   - Skips silently (exit 0) otherwise — local builds and preview deploys
 *     never ping. `npm run ping-indexnow` passes --force for manual runs.
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

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const CONTENT_DIR = path.join(ROOT, "content", "peptides");
const DATA_DIR = path.join(ROOT, "data");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://peptidestat.com"
).replace(/\/$/, "");

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
  "/database",
  "/peptides",
  "/about",
  "/editorial-policy",
  "/authors/peptidestat-editorial-team",
  "/disclaimer",
  "/privacy",
];

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

if (urlList.length === 0) {
  console.warn("[indexnow] No URLs discovered. Skipping ping.");
  process.exit(0);
}

// --- POST to IndexNow ----------------------------------------------------

const payload = { host, key, keyLocation, urlList };

try {
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200 OK and 202 Accepted are both success per the IndexNow spec.
  if (res.ok || res.status === 202) {
    console.log(
      `[indexnow] Pinged ${urlList.length} URLs (HTTP ${res.status}) ` +
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
