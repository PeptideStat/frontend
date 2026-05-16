import type { SVGProps } from "react";

/**
 * Minimal inline icon set used across the site.
 *
 * Lucide-style: 24×24 viewBox, currentColor stroke, 1.75 stroke-width,
 * round caps & joins. Keeping them inline avoids an extra dependency and
 * lets us tint via `text-*` utilities.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WeightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 7h12l-1.4 12.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8L6 7Z" />
      <path d="M9 7a3 3 0 1 1 6 0" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="m5.6 18.4 2.8-2.8" />
      <path d="m15.6 8.4 2.8-2.8" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 4.5 3.2 8.4 8 9 4.8-.6 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function MoleculeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="17" r="2" />
      <path d="m7.5 8.3 3 7" />
      <path d="m16.5 8.3-3 7" />
      <path d="M8 7h8" />
    </svg>
  );
}

export function PulseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 10v1a3 3 0 0 0 2 2.8V15a3 3 0 0 0 3 3 3 3 0 0 0 3-3V4a0 0 0 0 0 0 0 3 3 0 0 0-3 0Z" />
      <path d="M15 4a3 3 0 0 1 3 3v.5A3 3 0 0 1 20 10v1a3 3 0 0 1-2 2.8V15a3 3 0 0 1-3 3 3 3 0 0 1-3-3V4a3 3 0 0 1 3 0Z" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 8-3 16-9 16Z" />
      <path d="M4 20c4-4 6-6 11-11" />
    </svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c4 0 7-2.5 7-6.5 0-2.5-1-4-3-6-1.7-1.7-2-4-2-6-2 1.5-5 4-5 7 0 1.2.5 2 1.5 3-1.5 0-3-1-3-3 0 6 1.5 11.5 4.5 11.5Z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12" />
      <path d="m6 18 12-12" />
    </svg>
  );
}

/**
 * Map a category icon name to its component. Used by the CategoryGrid.
 */
export const CATEGORY_ICONS = {
  weight: WeightIcon,
  spark: SparkIcon,
  shield: ShieldIcon,
  molecule: MoleculeIcon,
  pulse: PulseIcon,
  brain: BrainIcon,
  leaf: LeafIcon,
  flame: FlameIcon,
} as const;

export type CategoryIconName = keyof typeof CATEGORY_ICONS;
