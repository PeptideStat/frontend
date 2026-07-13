import type { SVGProps } from "react";

/**
 * PeptideStat's compact product mark: a geometric P and a single chartreuse
 * data point. It avoids the molecule/beaker shorthand used by most peptide
 * sites and stays legible at favicon size.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 235 48"
      role="img"
      aria-label="PeptideStat"
      {...props}
    >
      <rect x="1" y="1" width="46" height="46" rx="13" fill="#124734" />
      <path
        d="M14 35V12h8.5c7 0 11 3.2 11 8.5S29.5 29 22.5 29H14"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="35" r="3.5" fill="#d9f36a" />

      <text
        x="60"
        y="32"
        fill="currentColor"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="25"
        letterSpacing="-1.1"
      >
        <tspan fontWeight="600">Peptide</tspan>
        <tspan fontWeight="800">Stat</tspan>
      </text>
    </svg>
  );
}

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="PeptideStat logo"
      {...props}
    >
      <rect x="1" y="1" width="46" height="46" rx="13" fill="#124734" />
      <path
        d="M14 35V12h8.5c7 0 11 3.2 11 8.5S29.5 29 22.5 29H14"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="35" r="3.5" fill="#d9f36a" />
    </svg>
  );
}
