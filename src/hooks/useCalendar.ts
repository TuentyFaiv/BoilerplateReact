import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, getDaysInMonth } from "date-fns";
import { es, enUS } from "date-fns/locale";

import type {
  HookCalendarLangs,
  HookCalendarParam,
  HookCalendarState,
  HookCalendarReturn
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
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const adultYear = useMemo(() => currentYear - 18, [currentYear]);

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
          name: dayName,
          number: format(dayOfMonth, "dd")
        };
      }),
      name: monthName,
      number: format(monthOfYear, "MM")
    };
  }), [locale]);
  const years = useMemo(() => new Array(80).fill("").map((_, index) => {
    const year = type === "past" ? adultYear - index : currentYear + index;

    return {
      year,
      months: getMonths(year)
    };
  }), [currentYear, adultYear, type, getMonths]);
  const months = useMemo(() => getMonths(currentYear), [getMonths, currentYear]);
  const days = useMemo(() => (
    selected.year === 0 && selected.month === ""
      ? months[0].days
      : years
        .find(({ year }) => (year === selected.year))?.months
        .find(({ number }) => (number === selected.month))?.days ?? months[0].days
  ), [months, years, selected.year, selected.month]);

  const chooseYear = useCallback((year: string) => {
    setSelected((prev) => ({ ...prev, year: parseInt(year, 10) }));
  }, [setSelected]);

  const chooseMonth = useCallback((month: string) => {
    setSelected((prev) => ({ ...prev, month }));
  }, [setSelected]);

  const chooseDay = useCallback((day: string) => {
    setSelected((prev) => ({ ...prev, day }));
  }, [setSelected]);

  const selects = useMemo(() => ({
    years: years.map(({ year }) => ({
      label: `${year}`,
      value: `${year}`
    })),
    months: months.map(({ name, number }) => ({
      label: name,
      value: number
    })),
    days: days.map(({ number }) => ({
      label: number,
      value: number
    }))
  }), [years, months, days]);

  return {
    calendar: {
      years,
      months,
      days,
      selected
    },
    selects,
    chooseYear,
    chooseMonth,
    chooseDay
  };
}
