"use client";

import { useEffect, useState } from "react";

export const INTRO_EVENT = "bn:intro-done";
export const INTRO_KEY = "bn-intro-seen";

/** Marks the intro as finished and notifies listeners (Hero waits on this). */
export function finishIntro() {
  document.documentElement.dataset.introDone = "1";
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/** True once the preloader has lifted (or immediately if it was skipped). */
export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.introDone === "1") {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener(INTRO_EVENT, on);
    const safety = setTimeout(on, 3500);
    return () => {
      window.removeEventListener(INTRO_EVENT, on);
      clearTimeout(safety);
    };
  }, []);
  return ready;
}
