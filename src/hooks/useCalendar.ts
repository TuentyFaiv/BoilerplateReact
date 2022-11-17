import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, getDaysInMonth } from "date-fns";
import { es, enUS } from "date-fns/locale";

import type {
  HookCalendarLangs,
  HookCalendarParam,
  HookCalendarReturn,
  HookCalendarState
} from "@typing/hooks";

const langs: HookCalendarLangs = {
  en: enUS,
  es
};

export default function useCalendar(type: HookCalendarParam = "past"): HookCalendarReturn {
  const { i18n } = useTranslation("common", { useSuspense: false });
  const lang = i18n.language.split("-")[0];
  const locale = useMemo(() => ({ locale: langs[lang] }), [lang]);
  const [selected, setSelected] = useState<HookCalendarState>({
    year: 0,
    month: "",
    day: ""
  });
  const date = useMemo(() => {
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
  }, []);
  const initialYear = useMemo(() => (type === "past" ? date.getFullYear() - 18 : date.getFullYear()), [date, type]);

  const getMonths = useCallback((year: number) => new Array(12).fill("").map((_, month) => {
    const monthOfYear = new Date(year, month);
    const monthFormatted = format(monthOfYear, "MMMM", locale);
    const monthName = monthFormatted.charAt(0).toUpperCase() + monthFormatted.slice(1);

    return {
      days: new Array(getDaysInMonth(monthOfYear)).fill("").map((__, day) => {
        const dayOfMonth = new Date(year, month, day + 1);
        const dayFormatted = format(dayOfMonth, "EEEE", locale);
        const dayName = dayFormatted.charAt(0).toUpperCase() + dayFormatted.slice(1);

        return {
          key: dayOfMonth.getDay(),
          name: dayName,
          number: `${dayOfMonth.getDate()}`.padStart(2, "0")
        };
      }),
      name: monthName,
      number: `${monthOfYear.getMonth() + 1}`.padStart(2, "0")
    };
  }), [locale]);
  const years = useMemo(() => new Array(80).fill("").map((_, index) => {
    const year: number = type === "past" ? initialYear - index : initialYear + index;

    return {
      number: year,
      months: getMonths(year)
    };
  }), [initialYear, type, getMonths]);
  const months = useMemo(() => getMonths(initialYear), [getMonths, initialYear]);
  const days = useMemo(() => (
    selected.year === 0 && selected.month === ""
      ? months[0].days
      : years
        .find(({ number }) => (number === selected.year))?.months
        .find(({ number }) => (number === selected.month))?.days ?? months[0].days
  ), [months, years, selected.year, selected.month]);

  const chooseYear = useCallback((year: string | number | unknown) => {
    setSelected((prev) => ({ ...prev, year: parseInt(`${year}`, 10) }));
  }, []);

  const chooseMonth = useCallback((month: string | unknown) => {
    setSelected((prev) => ({ ...prev, month: `${month}` }));
  }, []);

  const chooseDay = useCallback((day: string | unknown) => {
    setSelected((prev) => ({ ...prev, day: `${day}` }));
  }, []);

  return {
    calendar: {
      years,
      months,
      days,
      selected,
      date,
      locale
    },
    chooseYear,
    chooseMonth,
    chooseDay
  };
}
