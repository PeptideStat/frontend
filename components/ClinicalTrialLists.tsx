import Link from "next/link";
import type { ClinicalTrial } from "@/lib/clinicalTrialsTypes";

function shortDate(value: string | null) {
  if (!value) return "—";
  return value.slice(0, 7);
}

function statusColor(group: string) {
  if (group === "recruiting") return "text-lime";
  if (group === "completed") return "text-emerald-300";
  if (group === "terminated" || group === "withdrawn") {
    return "text-[#ffad94]";
  }
  return "text-white/55";
}

export function ClinicalTrialList({
  trials,
  emptyMessage = "No studies in this snapshot.",
  limit,
}: {
  trials: ClinicalTrial[];
  emptyMessage?: string;
  limit?: number;
}) {
  const displayed = typeof limit === "number" ? trials.slice(0, limit) : trials;

  if (!displayed.length) {
    return (
      <div className="border border-white/10 bg-[#111713] px-6 py-14 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-white/10 bg-[#111713]">
      <div className="hidden grid-cols-[105px_minmax(0,1fr)_120px_82px_82px] gap-4 border-b border-white/10 bg-[#151c18] px-5 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/28 md:grid">
        <span>NCT ID</span>
        <span>Study</span>
        <span>Phase / status</span>
        <span className="text-right">Enrollment</span>
        <span className="text-right">Updated</span>
      </div>
      {displayed.map((trial) => (
        <article
          key={trial.nctId}
          className="grid gap-3 border-b border-white/[0.08] px-4 py-4 last:border-0 hover:bg-white/[0.03] md:grid-cols-[105px_minmax(0,1fr)_120px_82px_82px] md:items-center md:gap-4 md:px-5"
        >
          <Link
            href={`/clinical-trials/${trial.nctId}`}
            className="font-mono text-[9px] font-bold text-lime hover:text-white"
          >
            {trial.nctId}
          </Link>
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-xs font-semibold leading-5 text-white/82">
              <Link
                href={`/clinical-trials/${trial.nctId}`}
                className="hover:text-lime"
              >
                {trial.title}
              </Link>
            </h3>
            <p className="mt-1 truncate text-[9px] text-white/30">
              {trial.sponsor.name} · {trial.conditions.slice(0, 2).join(" · ")}
            </p>
          </div>
          <div className="flex items-center gap-2 md:block">
            <p className="font-mono text-[9px] text-white/45">
              {trial.phases.label}
            </p>
            <p
              className={`mt-0.5 font-mono text-[8px] uppercase tracking-[0.08em] ${statusColor(trial.status.group)}`}
            >
              {trial.status.label}
            </p>
          </div>
          <p className="font-mono text-[10px] text-white/55 md:text-right">
            {trial.enrollment?.toLocaleString("en") ?? "—"}
          </p>
          <p className="font-mono text-[9px] text-white/35 md:text-right">
            {shortDate(trial.dates.lastUpdated)}
          </p>
        </article>
      ))}
      {typeof limit === "number" && trials.length > limit ? (
        <div className="border-t border-white/10 bg-[#0d120f] px-5 py-3 text-right font-mono text-[8px] uppercase tracking-[0.1em] text-white/25">
          Showing {limit} of {trials.length.toLocaleString("en")} studies
        </div>
      ) : null}
    </div>
  );
}

export function ClinicalTrialSectionNav() {
  return (
    <nav className="flex flex-wrap gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em]">
      {[
        ["All trials", "/clinical-trials"],
        ["Recruiting", "/clinical-trials/status/recruiting"],
        ["Phase 1", "/clinical-trials/phase/phase-1"],
        ["Phase 2", "/clinical-trials/phase/phase-2"],
        ["Phase 3", "/clinical-trials/phase/phase-3"],
        ["Phase 4", "/clinical-trials/phase/phase-4"],
      ].map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="border border-white/12 px-3 py-2 text-white/45 hover:border-lime hover:text-lime"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
