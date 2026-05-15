import type { SVGProps } from "react";

/**
 * PeptideStat brand mark.
 *
 * Periodic-table-inspired Ps block + laboratory flask + molecule motif +
 * "PEPTIDESTAT" wordmark. The original source uses dark navy on white; this
 * component drops the white background and uses `currentColor` so the logo
 * adopts the text color of its container (works on dark and light surfaces
 * alike). The two inner accents stay literal white where they form the
 * decorative contrast inside the molecule.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 620"
      role="img"
      aria-label="PeptideStat logo"
      {...props}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* periodic table frame */}
        <path d="M152 72H630V412" fill="none" />
        <path d="M152 72V548H722" fill="none" />
        <path d="M630 72V171" fill="none" />
        <path d="M152 548H722" fill="none" />

        {/* number + Ps + wordmark */}
        <text
          x="204"
          y="170"
          fontSize="62"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight={500}
          stroke="none"
        >
          16
        </text>
        <text
          x="225"
          y="392"
          fontSize="235"
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
          fontWeight={900}
          stroke="none"
        >
          Ps
        </text>
        <text
          x="205"
          y="492"
          fontSize="34"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight={700}
          letterSpacing="11"
          stroke="none"
        >
          PEPTIDESTAT
        </text>

        {/* flask outline */}
        <path d="M668 171H781" fill="none" />
        <path d="M690 171V315L595 522" fill="none" />
        <path d="M759 171V315L854 522" fill="none" />
        <path
          d="M595 522C584 548 602 575 632 575H817C847 575 866 548 854 522"
          fill="none"
        />
        <path d="M672 202H689" fill="none" />
        <path d="M672 246H689" fill="none" />

        {/* flask liquid */}
        <path
          d="M634 533C629 544 637 555 650 555H799C812 555 820 544 815 533L778 452C747 430 712 430 682 452L634 533Z"
          stroke="none"
        />
        <path
          d="M635 533C630 544 638 555 651 555H799C812 555 820 544 815 533"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />

        {/* molecule inside flask — the white strokes/fill stay literal so
            they punch holes through the dark liquid above */}
        <g>
          <path
            d="M654 504L704 540L748 500L798 536"
            stroke="#fff"
            strokeWidth={10}
            fill="none"
          />
          <path
            d="M748 500L765 445"
            stroke="#fff"
            strokeWidth={10}
            fill="none"
          />
          <circle
            cx={654}
            cy={504}
            r={20}
            fill="currentColor"
            stroke="#fff"
            strokeWidth={10}
          />
          <circle
            cx={704}
            cy={540}
            r={20}
            fill="currentColor"
            stroke="#fff"
            strokeWidth={10}
          />
          <circle cx={748} cy={500} r={20} fill="#fff" stroke="none" />
          <circle
            cx={798}
            cy={536}
            r={22}
            fill="currentColor"
            stroke="#fff"
            strokeWidth={10}
          />
          <circle
            cx={765}
            cy={445}
            r={20}
            fill="currentColor"
            stroke="#fff"
            strokeWidth={10}
          />
        </g>

        {/* bubbles */}
        <circle cx={723} cy={66} r={15} stroke="none" />
        <circle cx={694} cy={111} r={20} stroke="none" />
        <circle cx={656} cy={147} r={15} stroke="none" />
      </g>
    </svg>
  );
}
