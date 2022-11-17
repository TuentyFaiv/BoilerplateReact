/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { showError } from "@utils";
import endpoints from "@endpoints";
import { usePay } from "@services";
import { useAntifraudTokens } from "@hooks";
import { useAppContext, useCartContext, useServiceContext } from "@context";
import { Method, OpenpayErrors, PSP } from "@typing/enums";

import type {
  BodyConfirmOpenpay,
  BodyDLocalCard,
  BodyOpenpayCard,
  OpenpayCardParam
} from "@typing/services";
import type { OpenpayErrorParam, OpenpaySuccessParam } from "@typing/payment";
import type { ContextCountryCart } from "@typing/contexts";

const usePaymentExternalService = () => {
  const { global: { sessionId, user, openPay } } = useAppContext();
  const { api } = useServiceContext();
  const { cart, changeError } = useCartContext();
  const { t } = useTranslation("errors", { useSuspense: false });
  const { pay, openLink } = usePay();
  const tokens = useAntifraudTokens();

  const dlocalCard = useCallback(async (values: Pick<BodyDLocalCard, "token" | "document" | "cardholder">) => {
    const body = {
      psp: cart.idPsp,
      tp_id: user.tpId,
      session: sessionId ?? "",
      original_amount: cart.amount,
      amount: cart.exchangeAmount,
      currency: cart.exchangeCurrency,
      action: Method.CARD,
      ...values
    };

    return pay<BodyDLocalCard, string>(body);
  }, [
    pay,
    sessionId,
    cart.amount,
    cart.exchangeAmount,
    cart.exchangeCurrency,
    cart.idPsp,
    user.tpId
  ]);

  const openpayCard = ({ tokenConfig, body, onSuccess, loading }: OpenpayCardParam) => {
    const handleSuccess = async (success: Promise<OpenpaySuccessParam>) => {
      try {
        loading(true);
        const { data } = await success;
        const bodyOpenpayCard: BodyOpenpayCard = {
          ...body,
          card: data.card,
          token_card: data.id,
          device_session_id: tokens.openpay
        };
        const paymentLink = await pay<BodyOpenpayCard, string>(bodyOpenpayCard);
        openLink(paymentLink, true);
        onSuccess?.();
      } catch (error) {
        showError(error, t);
      } finally {
        loading(false);
      }
    };
    const handleError = async (error: Promise<OpenpayErrorParam>) => {
      try {
        const { data } = await error;
        const message = (
          data.error_code === OpenpayErrors.CARD_FUNDS
          || data.error_code === OpenpayErrors.CARD_STOLEN
        ) ? t("card-declined") : data.description;
        changeError({
          code: data.http_code,
          psp_code: data.error_code,
          psp_name: PSP.OPENPAY,
          message
        });
      } catch (err) {
        showError(err, t);
      } finally {
        loading(false);
      }
    };
    openPay?.token.create(tokenConfig, handleSuccess, handleError);
  };

  const confirmOpenpayCard = useCallback(async (body: Pick<BodyConfirmOpenpay, "id">) => {

    const { payload } = await api!.post<BodyConfirmOpenpay, string>({
      endpoint: endpoints.confirm_openpay,
      body: {
        ...body,
        method: "confirm",
        site: "TRADERBOTIC",
        country: user.country as ContextCountryCart
      },
      secure: false
    });
    return payload;
  }, [api, user.country]);

  return {
    dlocalCard,
    openpayCard,
    confirmOpenpayCard
  };
};

export default usePaymentExternalService;
