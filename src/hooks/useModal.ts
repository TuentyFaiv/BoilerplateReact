/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useState } from "react";

import type { HookModalFunc, HookModalParameters, HookModalReturn } from "@typing/hooks";

export default function useModal({ query: mediaQuery = null, element = "body" } : HookModalParameters): HookModalReturn {
  const [modal, setModal] = useState(false);
  const resetModal = matchMedia(mediaQuery ?? "(min-width: 0px)");

  const toogleModal: HookModalFunc = useCallback((custom) => {
    if (typeof custom === "boolean") {
      setModal(custom);
    } else {
      setModal((prevModal) => !prevModal);
    }
  }, []);

  useEffect(() => {
    const disableScroll = (query: MediaQueryList | MediaQueryListEvent) => {
      const html = document.querySelector("html")!;
      const body: HTMLElement | null = document.querySelector(element);
      if (modal && query.matches) {
        html.style.overflow = "hidden";
        if (body) body.style.overflow = "hidden";
      } else {
        html.style.overflow = "";
        if (body) body.style.overflow = "";
      }
    };
    const listener = (event: MediaQueryListEvent) => {
      if (modal && !event.matches) setModal(false);
      if (mediaQuery !== null) disableScroll(event);
    };
    resetModal.addEventListener("change", listener);

    if (mediaQuery !== null) disableScroll(resetModal);

    return () => {
      resetModal.removeEventListener("change", listener);
    };
  }, [modal, resetModal, mediaQuery, element]);

  return [modal, toogleModal];
}
