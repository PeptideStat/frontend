"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyCodeButton({
  code,
  compact = false,
}: {
  code: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      aria-label={`Copy discount code ${code}`}
      className={`group inline-flex overflow-hidden rounded-lg border-2 border-dashed border-ink/35 bg-paper text-ink shadow-[0_2px_0_rgba(17,23,19,0.12)] transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_4px_0_rgba(17,23,19,0.14)] active:translate-y-0 active:shadow-none ${
        compact ? "min-h-8" : "min-h-11"
      }`}
    >
      <span
        className={`flex items-center bg-paper font-mono font-black tracking-[0.06em] text-ink ${
          compact ? "px-2.5 text-[10px]" : "px-4 text-sm"
        }`}
      >
        {code}
      </span>
      <span
        aria-live="polite"
        className={`flex items-center justify-center gap-1.5 border-l-2 border-dashed border-ink/25 font-sans font-black uppercase tracking-[0.08em] text-white transition-colors ${
          copied
            ? "bg-accent"
            : "bg-ink group-hover:bg-accent-dark"
        } ${compact ? "px-2.5 text-[9px]" : "px-3.5 text-[10px]"}`}
      >
        {copied ? (
          <CheckIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        ) : (
          <CopyIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        )}
        <span>{copied ? "Copied" : "Copy"}</span>
      </span>
    </button>
  );
}
