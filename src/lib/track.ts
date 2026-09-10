// Shared GA4 event helper (client-side).
// gtag.js is loaded with strategy="lazyOnload" in layout.tsx, so the function
// may not exist yet when a component mounts — we retry briefly (bounded) instead
// of dropping the event.
type GAParams = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, params: GAParams = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };

  // Strip null/undefined/empty — GA4 dislikes empty params.
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') clean[k] = v;
  }

  let tries = 0;
  const fire = () => {
    if (typeof w.gtag === 'function') {
      w.gtag('event', event, clean);
      return;
    }
    if (tries++ >= 25) return; // ~5s max — don't leak timers if GA is blocked
    window.setTimeout(fire, 200);
  };
  fire();
}
