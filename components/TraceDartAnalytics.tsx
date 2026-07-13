"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  clearTraceDartIdentity,
  flushTraceDartQueue,
  setTraceDartConsent,
  trackTraceDartEvent,
  TRACEDART_CHOICES_EVENT,
  TRACEDART_CONSENT_STORAGE_KEY,
  type TraceDartConsent,
} from "@/lib/tracedart";

type ConsentUiState = "loading" | TraceDartConsent;

export function TraceDartAnalytics({ apiKey }: { apiKey: string }) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [consent, setConsent] = useState<ConsentUiState>("loading");

  useEffect(() => {
    let cancelled = false;
    // TraceDart is enabled by default. A previously saved opt-out is the only
    // state that prevents the browser script from loading.
    let storedConsent: TraceDartConsent = "granted";

    try {
      const stored = window.localStorage.getItem(
        TRACEDART_CONSENT_STORAGE_KEY,
      );
      if (stored === "denied") {
        storedConsent = stored;
      }
    } catch {
      // If preference storage is unavailable, analytics remains enabled for
      // this page view.
    }

    setTraceDartConsent(storedConsent);
    queueMicrotask(() => {
      if (!cancelled) setConsent(storedConsent);
    });

    function openChoices() {
      setConsent("pending");
    }

    window.addEventListener(TRACEDART_CHOICES_EVENT, openChoices);
    return () => {
      cancelled = true;
      window.removeEventListener(TRACEDART_CHOICES_EVENT, openChoices);
    };
  }, []);

  useEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;

    if (consent !== "granted" || previous === pathname) return;

    // TraceDart's current browser script records hard-load pageviews but does
    // not observe Next.js pushState navigation. Preserve those route changes
    // as an explicit event; TraceDart attaches the current page URL itself.
    trackTraceDartEvent("virtual_pageview", {
      navigation_type: "next_app_router",
    });
  }, [consent, pathname]);

  function chooseConsent(nextConsent: Exclude<TraceDartConsent, "pending">) {
    const trackerWasLoaded = Boolean(window.tracedart?.track);

    try {
      window.localStorage.setItem(
        TRACEDART_CONSENT_STORAGE_KEY,
        nextConsent,
      );
    } catch {
      // The in-memory choice still applies to this page view.
    }

    setTraceDartConsent(nextConsent);
    setConsent(nextConsent);

    if (nextConsent === "denied") {
      clearTraceDartIdentity();

      // A loaded third-party script cannot be safely unloaded. Reload after a
      // withdrawal so its timers and listeners stop immediately.
      if (trackerWasLoaded) window.location.reload();
    }
  }

  return (
    <>
      {consent === "granted" ? (
        <Script
          id="tracedart-analytics"
          src="https://api.tracedart.com/analytics.js"
          data-api-key={apiKey}
          strategy="afterInteractive"
          onReady={flushTraceDartQueue}
          onError={() => {
            if (process.env.NODE_ENV === "development") {
              console.debug("[PeptideStat] TraceDart failed to load");
            }
          }}
        />
      ) : null}

      {consent === "pending" ? (
        <section
          aria-label="Analytics settings"
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl border border-ink bg-paper p-4 shadow-[0_18px_60px_rgba(21,27,24,0.24)] sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                Analytics settings
              </p>
              <p className="mt-1.5 text-xs leading-5 text-ink-soft">
                TraceDart analytics is enabled by default to help us understand
                visits and referral clicks using a first-party visitor token
                and browser/device signals. You can disable or re-enable it
                here. We do not send calculator inputs, emails or self-reported
                health data. {" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-ink underline underline-offset-2"
                >
                  Privacy details
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => chooseConsent("denied")}
                className="h-10 border border-line-strong px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
              >
                Disable analytics
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("granted")}
                className="h-10 bg-ink px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-white hover:bg-accent"
              >
                Enable analytics
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
