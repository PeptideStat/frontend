import Link from "next/link";

export interface Breadcrumb {
  name: string;
  path: string;
}

export function Breadcrumbs({
  crumbs,
  className = "",
}: {
  crumbs: Breadcrumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-sm text-muted ${className}`}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {isLast ? (
              <span className="line-clamp-1 text-ink-soft">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.path}
                className="transition-colors hover:text-accent-bright"
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
