export const TRACEDART_CONSENT_STORAGE_KEY =
  "peptidestat:tracedart-consent:v1";
export const TRACEDART_CHOICES_EVENT = "peptidestat:analytics-choices";

const MAX_QUEUED_EVENTS = 50;
const MAX_PROPERTY_LENGTH = 255;

export type TraceDartConsent = "pending" | "granted" | "denied";
export type TraceDartEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type TraceDartQueuedEvent = {
  name: string;
  properties: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    tracedart?: {
      lastResult?: unknown;
      profile?: unknown;
      track?: (
        name: string,
        properties?: Record<string, string | number | boolean>,
      ) => void;
    };
    analyticsTrack?: (
      name: string,
      properties?: Record<string, string | number | boolean>,
    ) => void;
    __peptideStatTraceDartConsent?: TraceDartConsent;
    __peptideStatTraceDartQueue?: TraceDartQueuedEvent[];
  }
}

function sanitizeProperties(properties: TraceDartEventProperties) {
  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (value === null || value === undefined) continue;

    if (typeof value === "string") {
      const normalized = value.trim().slice(0, MAX_PROPERTY_LENGTH);
      if (normalized) sanitized[key] = normalized;
      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

function isValidEventName(name: string) {
  return /^[a-z0-9_]{1,64}$/.test(name);
}

export function setTraceDartConsent(consent: TraceDartConsent) {
  if (typeof window === "undefined") return;
  window.__peptideStatTraceDartConsent = consent;
}

export function trackTraceDartEvent(
  name: string,
  properties: TraceDartEventProperties = {},
) {
  if (
    typeof window === "undefined" ||
    window.__peptideStatTraceDartConsent !== "granted"
  ) {
    return false;
  }

  if (!isValidEventName(name)) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[PeptideStat] Ignored invalid TraceDart event: ${name}`);
    }
    return false;
  }

  const event = { name, properties: sanitizeProperties(properties) };

  if (window.tracedart?.track) {
    window.tracedart.track(event.name, event.properties);
    return true;
  }

  const queue = (window.__peptideStatTraceDartQueue ??= []);
  queue.push(event);

  if (queue.length > MAX_QUEUED_EVENTS) {
    queue.splice(0, queue.length - MAX_QUEUED_EVENTS);
  }

  return false;
}

export function flushTraceDartQueue() {
  if (
    typeof window === "undefined" ||
    window.__peptideStatTraceDartConsent !== "granted" ||
    !window.tracedart?.track
  ) {
    return;
  }

  const queue = window.__peptideStatTraceDartQueue ?? [];
  window.__peptideStatTraceDartQueue = [];

  for (const event of queue) {
    window.tracedart.track(event.name, event.properties);
  }
}

export function clearTraceDartIdentity() {
  if (typeof window === "undefined") return;

  window.__peptideStatTraceDartQueue = [];
  window.localStorage.removeItem("tracedart:visitor");
  window.sessionStorage.removeItem("tracedart:session");
  document.cookie = "_td_vid=; Max-Age=0; Path=/; SameSite=Lax";
}

export function openTraceDartConsentChoices() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TRACEDART_CHOICES_EVENT));
}
