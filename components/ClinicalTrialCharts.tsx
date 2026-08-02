import type {
  ClinicalTrial,
  ClinicalTrialSeriesPoint,
} from "@/lib/clinicalTrialsTypes";

function ChartHeader({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 px-5 py-4 sm:px-6">
      <div>
        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-lime">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-sm font-semibold tracking-[-0.015em] text-white">
          {title}
        </h3>
      </div>
      {note ? (
        <p className="max-w-[180px] text-right font-mono text-[8px] uppercase leading-4 tracking-[0.08em] text-white/25">
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function TrialsOverTimeChart({
  data,
  title = "Trials over time",
}: {
  data: ClinicalTrialSeriesPoint[];
  title?: string;
}) {
  const width = 760;
  const height = 230;
  const padding = { top: 24, right: 18, bottom: 34, left: 42 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maximum = Math.max(1, ...data.map((point) => point.value));
  const points = data.map((point, index) => ({
    ...point,
    x:
      padding.left +
      (index / Math.max(1, data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (point.value / maximum) * chartHeight,
  }));
  const line = points
    .map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`)
    .join(" ");
  const area = points.length
    ? `${line} L${points.at(-1)?.x},${padding.top + chartHeight} L${points[0].x},${padding.top + chartHeight} Z`
    : "";
  const labelEvery = Math.max(1, Math.ceil(data.length / 6));

  return (
    <figure className="overflow-hidden border border-white/10 bg-[#111713]">
      <ChartHeader
        eyebrow="Velocity"
        title={title}
        note="Study start year · indexed snapshot"
      />
      <div className="px-3 pb-3 pt-2 sm:px-5">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${title}, ranging from ${data[0]?.label ?? "unknown"} to ${data.at(-1)?.label ?? "unknown"}`}
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="trial-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d9f36a" stopOpacity=".24" />
              <stop offset="1" stopColor="#d9f36a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartHeight * ratio;
            const value = Math.round(maximum * (1 - ratio));
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,.08)"
                  strokeDasharray="2 5"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="rgba(255,255,255,.28)"
                  fontSize="8"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {value}
                </text>
              </g>
            );
          })}
          {area ? <path d={area} fill="url(#trial-area)" /> : null}
          {line ? (
            <path
              d={line}
              fill="none"
              stroke="#d9f36a"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
          {points.map((point, index) => (
            <g key={point.label}>
              {index % labelEvery === 0 || index === points.length - 1 ? (
                <text
                  x={point.x}
                  y={height - 9}
                  fill="rgba(255,255,255,.3)"
                  fontSize="8"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {point.label}
                </text>
              ) : null}
              <circle cx={point.x} cy={point.y} r="2.3" fill="#d9f36a">
                <title>{`${point.label}: ${point.value} trials`}</title>
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}

export function TrialBarChart({
  eyebrow,
  title,
  data,
  accent = "lime",
}: {
  eyebrow: string;
  title: string;
  data: ClinicalTrialSeriesPoint[];
  accent?: "lime" | "coral" | "sky";
}) {
  const maximum = Math.max(1, ...data.map((point) => point.value));
  const color =
    accent === "coral"
      ? "bg-coral"
      : accent === "sky"
        ? "bg-[#86a8ff]"
        : "bg-lime";

  return (
    <figure className="border border-white/10 bg-[#111713]">
      <ChartHeader eyebrow={eyebrow} title={title} />
      <div className="space-y-3 px-5 py-5 sm:px-6">
        {data.map((point) => (
          <div key={point.label} className="grid grid-cols-[minmax(90px,.7fr)_1.3fr_42px] items-center gap-3">
            <span className="truncate text-[10px] text-white/52" title={point.label}>
              {point.label}
            </span>
            <span className="h-1.5 overflow-hidden bg-white/[0.06]">
              <span
                className={`block h-full min-w-px ${color}`}
                style={{ width: `${(point.value / maximum) * 100}%` }}
              />
            </span>
            <span className="text-right font-mono text-[10px] font-bold text-white/65">
              {point.value.toLocaleString("en")}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function PhaseDistributionChart({
  data,
}: {
  data: ClinicalTrialSeriesPoint[];
}) {
  const total = data.reduce((sum, point) => sum + point.value, 0) || 1;
  const colors = ["#92a7ff", "#d9f36a", "#55c997", "#df7657", "#d7b7ff"];
  const stops = data.map((point, index) => {
    const consumedBefore = data
      .slice(0, index)
      .reduce((sum, item) => sum + item.value, 0);
    const consumedAfter = consumedBefore + point.value;
    return `${colors[index % colors.length]} ${(consumedBefore / total) * 100}% ${(consumedAfter / total) * 100}%`;
  });

  return (
    <figure className="border border-white/10 bg-[#111713]">
      <ChartHeader eyebrow="Development" title="Trials by phase" />
      <div className="grid items-center gap-6 px-5 py-6 sm:grid-cols-[150px_1fr] sm:px-6">
        <div
          role="img"
          aria-label={data.map((point) => `${point.label}: ${point.value}`).join(", ")}
          className="mx-auto grid aspect-square w-32 place-items-center rounded-full"
          style={{ background: `conic-gradient(${stops.join(",")})` }}
        >
          <div className="grid aspect-square w-[76%] place-items-center rounded-full bg-[#111713] text-center">
            <span>
              <strong className="block font-mono text-xl text-white">
                {total.toLocaleString("en")}
              </strong>
              <small className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/30">
                phase labels
              </small>
            </span>
          </div>
        </div>
        <div className="space-y-2.5">
          {data.map((point, index) => (
            <div key={point.label} className="flex items-center gap-2 text-[10px]">
              <span
                className="h-2 w-2 shrink-0"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="min-w-0 flex-1 truncate text-white/48">
                {point.label}
              </span>
              <strong className="font-mono text-white/70">
                {point.value.toLocaleString("en")}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

const worldMapWidth = 760;
const worldMapHeight = 380;
const equalEarthA1 = 1.340264;
const equalEarthA2 = -0.081106;
const equalEarthA3 = 0.000893;
const equalEarthA4 = 0.003796;
const equalEarthM = Math.sqrt(3) / 2;
const equalEarthPadding = 12;

function equalEarthRaw(longitude: number, latitude: number) {
  const lambda = (longitude * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const l = Math.asin(equalEarthM * Math.sin(phi));
  const l2 = l * l;
  const l6 = l2 * l2 * l2;

  return {
    x:
      (lambda * Math.cos(l)) /
      (equalEarthM *
        (equalEarthA1 +
          3 * equalEarthA2 * l2 +
          l6 * (7 * equalEarthA3 + 9 * equalEarthA4 * l2))),
    y:
      l *
      (equalEarthA1 +
        equalEarthA2 * l2 +
        l6 * (equalEarthA3 + equalEarthA4 * l2)),
  };
}

const equalEarthHorizontalExtent = Math.abs(equalEarthRaw(180, 0).x);
const equalEarthVerticalExtent = Math.abs(equalEarthRaw(0, 90).y);
const equalEarthScale = Math.min(
  (worldMapWidth - equalEarthPadding * 2) /
    (equalEarthHorizontalExtent * 2),
  (worldMapHeight - equalEarthPadding * 2) / (equalEarthVerticalExtent * 2),
);

function projectWorldPoint(longitude: number, latitude: number) {
  const raw = equalEarthRaw(longitude, latitude);
  return {
    x: worldMapWidth / 2 + raw.x * equalEarthScale,
    y: worldMapHeight / 2 - raw.y * equalEarthScale,
  };
}

function projectedPath(points: [number, number][], close = false) {
  return `${points
    .map(([longitude, latitude], index) => {
      const point = projectWorldPoint(longitude, latitude);
      return `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    })
    .join("")}${close ? "Z" : ""}`;
}

function numberRange(start: number, end: number, step: number) {
  return Array.from(
    { length: Math.floor((end - start) / step) + 1 },
    (_, index) => start + index * step,
  );
}

export function RecruitmentMap({ trials }: { trials: ClinicalTrial[] }) {
  const clusters = new Map<
    string,
    {
      latitudeTotal: number;
      longitudeTotal: number;
      siteCount: number;
      countries: Set<string>;
    }
  >();

  trials
    .filter(
      (trial) =>
        trial.status.group === "recruiting" || trial.status.group === "active",
    )
    .forEach((trial) => {
      trial.locations.forEach((location) => {
        if (location.latitude === null || location.longitude === null) return;
        const key = `${Math.round(location.latitude / 2.5)}:${Math.round(location.longitude / 2.5)}`;
        const cluster = clusters.get(key) ?? {
          latitudeTotal: 0,
          longitudeTotal: 0,
          siteCount: 0,
          countries: new Set<string>(),
        };
        cluster.latitudeTotal += location.latitude;
        cluster.longitudeTotal += location.longitude;
        cluster.siteCount += 1;
        if (location.country) cluster.countries.add(location.country);
        clusters.set(key, cluster);
      });
    });

  const points = [...clusters.entries()]
    .map(([key, cluster]) => {
      const projected = projectWorldPoint(
        cluster.longitudeTotal / cluster.siteCount,
        cluster.latitudeTotal / cluster.siteCount,
      );
      return {
        key,
        ...projected,
        siteCount: cluster.siteCount,
        countries: [...cluster.countries],
        radius: Math.min(8, 1.4 + Math.sqrt(cluster.siteCount) * 0.35),
      };
    })
    .sort((a, b) => a.siteCount - b.siteCount);
  const siteCount = points.reduce((sum, point) => sum + point.siteCount, 0);
  const meridians = numberRange(-150, 150, 30).map((longitude) =>
    projectedPath(
      numberRange(-90, 90, 3).map((latitude) => [
        longitude,
        latitude,
      ]),
    ),
  );
  const parallels = numberRange(-60, 60, 30).map((latitude) =>
    projectedPath(
      numberRange(-180, 180, 3).map((longitude) => [
        longitude,
        latitude,
      ]),
    ),
  );
  const worldOutline = projectedPath(
    [
      ...numberRange(-180, 180, 3).map(
        (longitude) => [longitude, 90] as [number, number],
      ),
      ...numberRange(87, -90, -3).map(
        (latitude) => [180, latitude] as [number, number],
      ),
      ...numberRange(-180, 177, 3)
        .reverse()
        .map((longitude) => [longitude, -90] as [number, number]),
      ...numberRange(-87, 87, 3).map(
        (latitude) => [-180, latitude] as [number, number],
      ),
    ],
    true,
  );

  return (
    <figure className="overflow-hidden border border-white/10 bg-[#111713]">
      <ChartHeader
        eyebrow="Geography"
        title="Active recruitment footprint"
        note={`${siteCount.toLocaleString("en")} geocoded sites · ${points.length.toLocaleString("en")} clusters`}
      />
      <svg
        viewBox={`0 0 ${worldMapWidth} ${worldMapHeight}`}
        role="img"
        aria-label={`Natural Earth world map showing ${siteCount} recruiting or active clinical-trial sites in ${points.length} geographic clusters`}
        className="h-auto w-full bg-[#0d120f]"
      >
        <defs>
          <clipPath id="clinical-trials-world-clip">
            <path d={worldOutline} />
          </clipPath>
        </defs>
        <rect width={worldMapWidth} height={worldMapHeight} fill="#0d120f" />
        <g clipPath="url(#clinical-trials-world-clip)">
          <path d={worldOutline} fill="#101712" />
          {[...meridians, ...parallels].map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke="rgba(255,255,255,.055)"
              strokeWidth="0.7"
            />
          ))}
          <image
            href="/maps/natural-earth-110m.svg"
            width={worldMapWidth}
            height={worldMapHeight}
            preserveAspectRatio="xMidYMid meet"
          />
          {points.map((point) => (
            <circle
              key={point.key}
              cx={point.x}
              cy={point.y}
              r={point.radius}
              fill="#d9f36a"
              fillOpacity=".68"
              stroke="#0d120f"
              strokeOpacity=".72"
              strokeWidth=".8"
              vectorEffect="non-scaling-stroke"
            >
              <title>
                {`${point.siteCount.toLocaleString("en")} active ${point.siteCount === 1 ? "site" : "sites"}${point.countries.length ? ` · ${point.countries.slice(0, 3).join(", ")}` : ""}`}
              </title>
            </circle>
          ))}
        </g>
        <path
          d={worldOutline}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <g transform={`translate(24 ${worldMapHeight - 27})`}>
          <circle cx="0" cy="0" r="2" fill="#d9f36a" fillOpacity=".72" />
          <circle cx="42" cy="0" r="4" fill="#d9f36a" fillOpacity=".72" />
          <circle cx="88" cy="0" r="7" fill="#d9f36a" fillOpacity=".72" />
          <text x="10" y="3" fill="rgba(255,255,255,.42)" fontSize="8" fontFamily="monospace">
            1
          </text>
          <text x="50" y="3" fill="rgba(255,255,255,.42)" fontSize="8" fontFamily="monospace">
            50
          </text>
          <text x="100" y="3" fill="rgba(255,255,255,.42)" fontSize="8" fontFamily="monospace">
            250+ sites
          </text>
        </g>
      </svg>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.09em] text-white/28 sm:px-6">
        <span>Site density grouped in 2.5° cells</span>
        <a
          href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-white/60"
        >
          Natural Earth · Admin 0 · 1:110m
        </a>
      </figcaption>
    </figure>
  );
}

export function EvidenceTimeline({ trials }: { trials: ClinicalTrial[] }) {
  const events = [...trials]
    .filter((trial) => trial.dates.start || trial.dates.firstPosted)
    .sort((a, b) =>
      (a.dates.start ?? a.dates.firstPosted ?? "").localeCompare(
        b.dates.start ?? b.dates.firstPosted ?? "",
      ),
    );
  if (!events.length) return null;
  const firstYear = Number(
    (events[0].dates.start ?? events[0].dates.firstPosted)?.slice(0, 4),
  );
  const lastYear = Number(
    (events.at(-1)?.dates.start ?? events.at(-1)?.dates.firstPosted)?.slice(0, 4),
  );
  const span = Math.max(1, lastYear - firstYear);
  const significant = events
    .filter((trial, index) => {
      if (index === 0 || index === events.length - 1) return true;
      return (
        trial.hasResults ||
        trial.phases.highest >= 3 ||
        trial.status.group === "recruiting"
      );
    })
    .slice(0, 18);

  return (
    <figure className="border border-white/10 bg-[#111713] p-5 sm:p-6">
      <figcaption>
        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-lime">
          Evidence timeline
        </p>
        <h3 className="mt-1 text-sm font-semibold text-white">
          {firstYear}—{lastYear}
        </h3>
      </figcaption>
      <div className="relative mt-12 h-24 border-t border-white/20">
        {significant.map((trial, index) => {
          const year = Number(
            (trial.dates.start ?? trial.dates.firstPosted)?.slice(0, 4),
          );
          const left = ((year - firstYear) / span) * 100;
          return (
            <a
              key={trial.nctId}
              href={`/clinical-trials/${trial.nctId}`}
              title={`${year} · ${trial.nctId} · ${trial.title}`}
              className="group absolute top-0 -translate-x-1/2"
              style={{ left: `${Math.max(1, Math.min(99, left))}%` }}
            >
              <span className="block h-3 w-px bg-lime" />
              <span
                className={`mt-1 block font-mono text-[7px] text-white/30 transition-colors group-hover:text-lime ${index % 2 ? "translate-y-6" : ""}`}
              >
                {year}
              </span>
            </a>
          );
        })}
      </div>
    </figure>
  );
}
