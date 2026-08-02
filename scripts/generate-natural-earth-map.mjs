import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
const OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "maps",
  "natural-earth-110m.svg",
);

const WIDTH = 760;
const HEIGHT = 380;
const PADDING = 12;
const A1 = 1.340264;
const A2 = -0.081106;
const A3 = 0.000893;
const A4 = 0.003796;
const M = Math.sqrt(3) / 2;

function equalEarthRaw(longitude, latitude) {
  const lambda = (longitude * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const l = Math.asin(M * Math.sin(phi));
  const l2 = l * l;
  const l6 = l2 * l2 * l2;

  return {
    x:
      (lambda * Math.cos(l)) /
      (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    y: l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)),
  };
}

const horizontalExtent = Math.abs(equalEarthRaw(180, 0).x);
const verticalExtent = Math.abs(equalEarthRaw(0, 90).y);
const scale = Math.min(
  (WIDTH - PADDING * 2) / (horizontalExtent * 2),
  (HEIGHT - PADDING * 2) / (verticalExtent * 2),
);

function project([longitude, latitude]) {
  const raw = equalEarthRaw(longitude, latitude);
  return [WIDTH / 2 + raw.x * scale, HEIGHT / 2 - raw.y * scale];
}

function coordinate(value) {
  return Number(value.toFixed(2));
}

function ringToPath(ring) {
  return ring
    .map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? "M" : "L"}${coordinate(x)} ${coordinate(y)}`;
    })
    .join("") + "Z";
}

function geometryToPath(geometry) {
  const polygons =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons
    .flatMap((polygon) => polygon.map((ring) => ringToPath(ring)))
    .join("");
}

async function loadGeoJson() {
  const inputPath = process.argv[2];
  if (inputPath) {
    return JSON.parse(await readFile(path.resolve(inputPath), "utf8"));
  }

  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Natural Earth download failed (${response.status})`);
  }
  return response.json();
}

const geoJson = await loadGeoJson();
const paths = geoJson.features
  .filter(
    (feature) =>
      feature.geometry?.type === "Polygon" ||
      feature.geometry?.type === "MultiPolygon",
  )
  .map((feature) => {
    const name = String(
      feature.properties?.ADMIN ?? feature.properties?.NAME ?? "Country",
    ).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
    return `  <path data-country="${name}" d="${geometryToPath(feature.geometry)}" />`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Natural Earth Admin 0 Countries, version 5.1.1. Public domain.
     Source: https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/ -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="World country boundaries">
  <g fill="#17201a" fill-rule="evenodd" stroke="#3c4840" stroke-width="0.55" stroke-linejoin="round" vector-effect="non-scaling-stroke">
${paths}
  </g>
</svg>
`;

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, svg);
console.log(`Generated ${OUTPUT_PATH} from ${geoJson.features.length} countries.`);
