/** Marks that the entrance animations have already played this session. */
export const ENTRANCE_STORAGE_KEY = "entered";

/**
 * Plays the hero entrance once per session, then stops.
 *
 * Runs before first paint, in <head>, next to the theme script. On the first
 * page a visitor lands on, nothing is stamped and the animations run. Every
 * navigation and reload afterwards finds the flag, stamps `entered` on <html>,
 * and the CSS switches the animations off — so the content is simply there.
 *
 * Two reasons this is worth doing. The obvious one is that watching the same
 * entrance replay on every page gets tiring. The measurable one is that Chrome
 * will not accept an animating element as a Largest Contentful Paint candidate
 * until its animation finishes: the interior heroes measured 328ms without the
 * entrance and 944ms with it. Skipping the replay hands that back on every
 * load after the first, which in real traffic is most of them.
 *
 * `sessionStorage`, not `localStorage`: someone returning tomorrow should see
 * the site the way a new visitor does.
 *
 * Kept as a string because it must execute synchronously, ahead of hydration.
 */
export const ENTRANCE_INIT_SCRIPT = `
(function () {
  try {
    if (sessionStorage.getItem('${ENTRANCE_STORAGE_KEY}')) {
      document.documentElement.classList.add('${ENTRANCE_STORAGE_KEY}');
    } else {
      sessionStorage.setItem('${ENTRANCE_STORAGE_KEY}', '1');
    }
  } catch (e) {}
})();
`.trim();
