import Image from "next/image";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type Peptide,
} from "@/data/peptides";

const PROFILE_IMAGE_BY_ROUTE: Record<
  Peptide["routeOfAdministration"],
  string
> = {
  Subcutaneous: "/images/database/profile-injectable.webp",
  Intramuscular: "/images/database/profile-injectable.webp",
  Intravenous: "/images/database/profile-injectable.webp",
  Intrathecal: "/images/database/profile-injectable.webp",
  Oral: "/images/database/profile-oral.webp",
  Intranasal: "/images/database/profile-intranasal.webp",
  Topical: "/images/database/profile-topical.webp",
  Implant: "/images/database/profile-implant.webp",
};

export function getPeptideProfileImage(
  route: Peptide["routeOfAdministration"],
) {
  return PROFILE_IMAGE_BY_ROUTE[route];
}

export function PeptideProfileVisual({
  peptide,
  priority = false,
  variant = "card",
  className = "",
}: {
  peptide: Peptide;
  priority?: boolean;
  variant?: "card" | "detail";
  className?: string;
}) {
  const isDetail = variant === "detail";
  const imageSrc = getPeptideProfileImage(peptide.routeOfAdministration);

  return (
    <figure
      className={`relative isolate overflow-hidden bg-[#f3f4ef] ${
        isDetail ? "aspect-square rounded-lg" : "aspect-[4/3] rounded-md"
      } ${className}`}
    >
      <Image
        src={imageSrc}
        alt={`Illustrative ${peptide.routeOfAdministration.toLowerCase()} database profile for ${peptide.name}`}
        fill
        priority={priority}
        sizes={
          isDetail
            ? "(max-width: 1024px) 100vw, 420px"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        }
        className="object-cover"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
        <span className="rounded-md border border-white/70 bg-paper/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-muted shadow-sm backdrop-blur-sm">
          Illustrative profile
        </span>
        <span className="rounded-md bg-accent-dark px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
          {peptide.routeOfAdministration}
        </span>
      </div>

      <figcaption
        className={`absolute inset-x-3 bottom-3 rounded-lg border border-white/80 bg-paper/94 shadow-[0_12px_30px_-22px_rgba(17,23,19,.6)] backdrop-blur-md ${
          isDetail ? "p-5" : "p-3"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-accent">
            Database profile
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-muted-soft">
            {STATUS_LABELS[peptide.status]}
          </span>
        </div>
        <strong
          className={`mt-1.5 block font-semibold leading-none tracking-[-0.035em] text-ink ${
            isDetail ? "text-3xl sm:text-4xl" : "truncate text-lg"
          }`}
        >
          {peptide.name}
        </strong>
        <span
          className={`mt-1.5 block text-muted ${
            isDetail ? "text-xs" : "truncate text-[10px]"
          }`}
        >
          {CATEGORY_LABELS[peptide.category]}
        </span>
      </figcaption>
    </figure>
  );
}
