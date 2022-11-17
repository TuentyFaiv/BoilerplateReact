/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import endpoints from "@endpoints";
import { useAppContext, useServiceContext } from "@context";

import type { HookAntifraudTokensReturn, HookAntifraudTokensState } from "@typing/hooks";
import type { BodyAntifraudPayU } from "@typing/services";

export default function useAntifraudPayU(): HookAntifraudTokensReturn {
  const { global: { openPay, sessionId } } = useAppContext();
  const { api } = useServiceContext();
  const [tokens, setTokens] = useState<HookAntifraudTokensState>({
    payu: "",
    openpay: ""
  });

  useEffect(() => {
    const antifraud = async () => {
      const { payload: tokenPayu } = await api!.post<BodyAntifraudPayU, string>({
        endpoint: endpoints.antifraud_payu,
        body: { action: "device", data: { sessionId: sessionId ?? "" } },
        secure: false,
        punkaso: true
      });

      setTokens((prevTokens) => ({ ...prevTokens, payu: tokenPayu }));
      const script = document.createElement("script");
      script.src = `https://maf.pagosonline.net/ws/fp/tags.js?id=${tokenPayu}80200`;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };
    antifraud();
  }, [api, sessionId]);

  useEffect(() => {
    if (openPay) {
      const tokenOpenpay = openPay.deviceData.setup();
      setTokens((prevTokens) => ({ ...prevTokens, openpay: tokenOpenpay }));
    }
  }, [openPay]);

  return tokens;
}
