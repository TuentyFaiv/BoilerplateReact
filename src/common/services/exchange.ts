/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback } from "react";
import endpoints from "@endpoints";
import { useServiceContext } from "@context";

import type { BodyExchange, ReturnExchange } from "@typing/services";

const useExchangeService = () => {
  const { api } = useServiceContext();

  const changeAmount = useCallback(async (values: BodyExchange) => {
    const { payload } = await api!.get<ReturnExchange>({
      endpoint: endpoints.exchange,
      query: `?amount=${values.amount}&currency=${values.currency}`,
      local: true,
      secure: false
    });
    return {
      amount: parseFloat(payload.amount),
      currency: payload.currency
    };
  }, [api]);

  return {
    changeAmount
  };
};

export default useExchangeService;
