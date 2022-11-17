import { useTranslation } from "react-i18next";
import { useCalendar, useMakeOptions } from "@hooks";

import type { CardProps } from "@typing/proptypes";
import type { Month, Year } from "@typing/types";

import CVVIcon1 from "@icons/cvv-icon-1.svg";
import CVVIcon2 from "@icons/cvv-icon-2.svg";

import { Input, Select } from "@components";

const CardMethod = ({ icon, email, phone, holder }: CardProps) => {
  const { t } = useTranslation("payment", { useSuspense: false });
  const { calendar, chooseYear, chooseMonth } = useCalendar("future");
  const years = useMakeOptions<Year>({
    options: calendar.years,
    keys: {
      label: "number",
      value: "number"
    }
  });
  const months = useMakeOptions<Month>({
    options: calendar.months,
    keys: {
      label: "number",
      value: "number"
    }
  });

  return (
    <>
      <Input
        label={t("card-number")}
        placeholder={t("card-number")}
        name="cardNumber"
        type="text"
        maxLength={16}
      />
      {holder === "full" ? (
        <Input label={t("holder-name")} placeholder={t("holder-name")} name="name" type="text" />
      ) : null}
      {holder === "split" ? (
        <div className="payment__flex">
          <Input label={t("first-name")} placeholder={t("first-name")} name="firstName" type="text" />
          <Input label={t("last-name")} placeholder={t("last-name")} name="lastName" type="text" />
        </div>
      ) : null}
      <div className="payment__flex">
        <Select
          label={t("exp-month")}
          name="expMonth"
          options={months}
          onSelect={chooseMonth}
          data={{
            level: 8
          }}
        />
        <Select
          label={t("exp-year")}
          name="expYear"
          options={years}
          onSelect={chooseYear}
          data={{
            level: 7
          }}
        />
        <div className="payment__flex payment__flex--child">
          <Input
            label={t("ccv")}
            placeholder={t("ccv")}
            name="ccv"
            type="text"
            maxLength={4}
          />
          {icon ? (
            <div className="payment__cvv">
              <img src={CVVIcon1} alt="" className="payment__cvv-icon" />
              <img src={CVVIcon2} alt="" className="payment__cvv-icon" />
            </div>
          ) : null}
        </div>
      </div>
      {(email || phone) ? (
        <div className="payment__flex">
          {email ? (
            <Input label={t("email")} placeholder={t("email")} name="email" type="email" />
          ) : null}
          {phone ? (
            <Input label={t("phone")} placeholder={t("phone")} name="phone" type="tel" />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default CardMethod;
