import Link from "next/link";

export interface Breadcrumb {
  name: string;
  path: string;
}

export function Breadcrumbs({
  crumbs,
  className = "",
  inverse = false,
}: {
  crumbs: Breadcrumb[];
  className?: string;
  inverse?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-sm ${inverse ? "text-white/45" : "text-muted"} ${className}`}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {isLast ? (
              <span className={`line-clamp-1 ${inverse ? "text-white/65" : "text-ink-soft"}`}>
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className={`transition-colors ${inverse ? "hover:text-white" : "hover:text-accent-bright"}`}
              >
                {crumb.name}
              </Link>
            )}
            {!isLast && <span aria-hidden>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
