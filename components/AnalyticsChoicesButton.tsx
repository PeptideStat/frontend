"use client";

import { openTraceDartConsentChoices } from "@/lib/tracedart";

export function AnalyticsChoicesButton() {
  return (
    <button
      type="button"
      onClick={openTraceDartConsentChoices}
      className="uppercase hover:text-canvas"
    >
      Analytics choices
    </button>
  );
}
