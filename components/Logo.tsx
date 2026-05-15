import type { SVGProps } from "react";

/**
 * PeptideStat brand assets.
 *
 *   <Logo />     — full lockup (icon + "PEPTIDESTAT" wordmark). Use in
 *                  header, footer, hero, anywhere with horizontal room.
 *   <LogoMark /> — icon only (periodic-table Ps block + flask). Use in
 *                  favicons, OG images, small avatars, or anywhere the
 *                  wordmark would be illegible.
 *
 * Both drop the white background from the original SVGs and swap the
 * navy ink for `currentColor`, so the logo adopts the text color of its
 * container — works on dark and light surfaces alike. The literal `#fff`
 * highlights inside the molecule motif are preserved so they keep their
 * decorative contrast against the flask liquid.
 */

/* ------------------------------------------------------------------ */
/* Logo — icon + wordmark lockup (2.92:1 aspect ratio)                 */
/* ------------------------------------------------------------------ */

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1900 650"
      role="img"
      aria-label="PeptideStat"
      {...props}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Icon group — translated + scaled per the source */}
        <g transform="translate(95 95) scale(.78)">
          {/* open lab / periodic frame */}
          <path d="M36 36H250" fill="none" />
          <path d="M500 36H610" fill="none" />
          <path d="M36 36V438" fill="none" />
          <path d="M36 438H610" fill="none" />
          <path d="M610 36V438" fill="none" />

          {/* flask outline */}
          <path d="M286 92H392" fill="none" />
          <path d="M305 92V197L209 406" fill="none" />
          <path d="M374 92V197L470 406" fill="none" />
          <path
            d="M209 406C196 435 217 468 250 468H431C464 468 484 435 470 406"
            fill="none"
          />
          <path d="M286 132H305" fill="none" />
          <path d="M286 177H305" fill="none" />

          {/* flask liquid */}
          <path
            d="M250 421C245 436 255 449 271 449H410C426 449 435 436 429 421L398 352C363 328 324 329 288 354L250 421Z"
            stroke="none"
          />
          <path
            d="M250 421C245 436 255 449 271 449H410C426 449 435 436 429 421"
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
            fill="none"
          />

          {/* molecule — keeps literal white highlights so they read as
              cutouts against the dark liquid above */}
          <g>
            <path
              d="M277 398L319 428L363 390L409 423"
              stroke="#fff"
              strokeWidth={10}
              fill="none"
            />
            <path
              d="M363 390L382 338"
              stroke="#fff"
              strokeWidth={10}
              fill="none"
            />
            <circle
              cx={277}
              cy={398}
              r={18}
              fill="currentColor"
              stroke="#fff"
              strokeWidth={9}
            />
            <circle
              cx={319}
              cy={428}
              r={18}
              fill="currentColor"
              stroke="#fff"
              strokeWidth={9}
            />
            <circle cx={363} cy={390} r={18} fill="#fff" stroke="none" />
            <circle
              cx={409}
              cy={423}
              r={20}
              fill="currentColor"
              stroke="#fff"
              strokeWidth={9}
            />
            <circle
              cx={382}
              cy={338}
              r={18}
              fill="currentColor"
              stroke="#fff"
              strokeWidth={9}
            />
          </g>

          {/* bubbles */}
          <circle cx={343} cy={-25} r={15} stroke="none" />
          <circle cx={320} cy={45} r={20} stroke="none" />
          <circle cx={278} cy={80} r={16} stroke="none" />
        </g>

        {/* Wordmark */}
        <text
          x="620"
          y="365"
          fontSize={112}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight={800}
          letterSpacing={24}
          stroke="none"
        >
          PEPTIDESTAT
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* LogoMark — icon only (periodic Ps block + flask + bubbles)          */
/* Aspect ratio 1.61:1                                                 */
/* ------------------------------------------------------------------ */

export function LogoMark(props: SVGProps<SVGSVGElement>) {
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

        {/* number + Ps + wordmark inside the cell */}
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

        {/* molecule */}
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
