import { useTranslation } from "react-i18next";

import type { AddressProps } from "@typing/proptypes";

import { Input } from "@components";

export default function Address({ state }: AddressProps) {
  const { t } = useTranslation("payment", { useSuspense: false });

  return (
    <>
      <Input
        label={t("address")}
        name="address"
        type="text"
        placeholder={t("address")}
      />
      <div className="payment__flex">
        <Input
          label={t("city")}
          name="city"
          type="text"
          placeholder={t("city")}
        />
        {state ? (
          <Input
            label={t("state")}
            name="state"
            type="text"
            placeholder={t("state")}
          />
        ) : null}
        <Input
          label={t("postal-code")}
          name="postalCode"
          type="text"
          placeholder={t("postal-code")}
        />
      </div>
    </>
  );
}
