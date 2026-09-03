/**
 * Lightweight analytics bridge.
 * Dispatches a custom event for in-app listeners and forwards to gtag when present.
 */
export function track(name, payload = {}) {
  window.dispatchEvent(
    new CustomEvent("hermes:analytics", { detail: { name, ...payload } }),
  );
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
}
