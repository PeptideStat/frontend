import { readdir, readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appOutput = resolve(projectRoot, ".next/server/app");

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory()
        ? findHtmlFiles(path)
        : Promise.resolve(extname(entry.name) === ".html" ? [path] : []);
    }),
  );

  return nested.flat();
}

const files = await findHtmlFiles(appOutput);
let sponsoredCount = 0;
const unlabeled = [];

for (const file of files) {
  const html = await readFile(file, "utf8");

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const anchor = match[0];
    const rel = anchor.match(/\brel="([^"]*)"/i)?.[1] ?? "";
    if (!rel.split(/\s+/).includes("sponsored")) continue;

    sponsoredCount += 1;
    if (!/\bdata-affiliate-placement="[^"]+"/i.test(anchor)) {
      unlabeled.push({
        file: file.slice(projectRoot.length + 1),
        href: anchor.match(/\bhref="([^"]+)"/i)?.[1] ?? "unknown",
      });
    }
  }
}

if (unlabeled.length) {
  console.error(
    [
      `${unlabeled.length} sponsored anchors are missing data-affiliate-placement:`,
      ...unlabeled.map(({ file, href }) => `- ${file}: ${href}`),
    ].join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    `Affiliate markup OK: ${sponsoredCount} sponsored anchors across ${files.length} prerendered pages are labeled.`,
  );
}
