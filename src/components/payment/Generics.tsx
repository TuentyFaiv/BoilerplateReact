import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useExchangeService } from "@services";
import { useCartContext } from "@context";
import { Actions, Currencies, Method } from "@typing/enums";

import type { GenericsPaymentProps } from "@typing/proptypes";

import { Input, Select } from "@components";

export default function Generics({ activeDocument, currencies, placeHolder, methods, ...props }: GenericsPaymentProps) {
  const { t } = useTranslation("payment", { useSuspense: false });
  const { cart, dispatch } = useCartContext();
  const { changeAmount } = useExchangeService();

  const handleChooseCurrency = useCallback(async (currency: unknown) => {
    const { amount: exchangeAmount, currency: exchangeCurrency } = await changeAmount({
      currency: currency as string,
      amount: cart.amount
    });
    dispatch({
      type: Actions.EXCHANGE_CART,
      payload: {
        exchangeAmount,
        exchangeCurrency: exchangeCurrency as Currencies
      }
    });
  }, [cart.amount, changeAmount, dispatch]);

  const handleChooseMethod = useCallback((method: unknown) => {
    dispatch({
      type: Actions.SET_PAYMENT_METHOD,
      payload: method as Method
    });
  }, [dispatch]);

  return (
    <>
      {activeDocument ? (
        <Input
          label={t("document-identity")}
          name="document"
          type="text"
          placeholder={placeHolder}
          {...props}
        />
      ) : null}
      {currencies.length > 0 ? (
        <Select
          label={t("currency")}
          name="currency"
          options={currencies}
          onSelect={handleChooseCurrency}
          data={{
            level: 10
          }}
        />
      ) : null}
      {methods.length > 0 ? (
        <Select
          label={t("method")}
          name="method"
          options={methods}
          onSelect={handleChooseMethod}
          data={{
            level: 9
          }}
        />
      ) : null}
    </>
  );
}
