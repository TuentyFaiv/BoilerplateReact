import { useTranslation } from "react-i18next";
import { useCalendar, useMakeOptions } from "@hooks";

import type { Day, Month, Year } from "@typing/types";

import { Select } from "@components";

export default function Birthdate() {
  const { t } = useTranslation("payment", { useSuspense: false });
  const { calendar, chooseYear, chooseMonth } = useCalendar();
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
  const days = useMakeOptions<Day>({
    options: calendar.days,
    keys: {
      label: "number",
      value: "number"
    }
  });

  return (
    <div className="payment__flex">
      <Select
        label={t("birthdate-day")}
        name="birthdateDay"
        options={days}
      />
      <Select
        label={t("birthdate-month")}
        name="birthdateMonth"
        options={months}
        onSelect={chooseMonth}
      />
      <Select
        label={t("birthdate-year")}
        name="birthdateYear"
        options={years}
        onSelect={chooseYear}
      />
    </div>
  );
}
