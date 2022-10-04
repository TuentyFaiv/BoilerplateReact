import { useEffect, useState } from "react";

import type { HookMediaParameters, HookMediaReturn } from "@typing/hooks";

export default function useMedia(query: HookMediaParameters = null): HookMediaReturn {
  const [device, setDevice] = useState(false);
  const media = matchMedia(query ?? "(min-width: 0px)");

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setDevice(event.matches);
    };

    setDevice(media.matches);

    media.addEventListener("change", listener);
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [media]);

  return device;
}
