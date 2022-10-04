import { useCallback, useEffect, useMemo, useState } from "react";
import { format, setDay } from "date-fns";
import { DEFAULT_FORMAT, spacesInCalendar, weekDays } from "@utils";
import { useCalendar } from "@hooks";

import type {
  HookDatePickerState,
  HookDatePickerDays,
  HookDatePickerUpdate,
  HookDatePickerReturn
} from "@typing/hooks";

export default function useDatePicker(formatter = DEFAULT_FORMAT): HookDatePickerReturn {
  const { calendar, chooseYear, chooseMonth, chooseDay } = useCalendar("future");
  const [days, setDays] = useState<HookDatePickerState>([]);
  const [header, setHeader] = useState(format(calendar.date, "MMM yyyy", calendar.locale).toUpperCase());
  const value = useMemo(() => (format(
    calendar.selected.year !== 0
      ? new Date(
        calendar.selected.year,
        parseInt(calendar.selected.month, 10) - 1,
        parseInt(calendar.selected.day, 10)
      ) : calendar.date,
    formatter,
    calendar.locale
  )), [calendar.selected, calendar.date, calendar.locale, formatter]);

  const week = useMemo(() => (
    new Array(weekDays).fill("").map((_, index) => (
      format(setDay(calendar.date, index), "EEEEE", calendar.locale).toUpperCase()
    ))
  ), [calendar.date, calendar.locale]);

  const update: HookDatePickerUpdate = useCallback((date = {}) => {
    const {
      year = calendar.date.getFullYear(),
      month = calendar.date.getMonth() + 1,
      day = calendar.date.getDate()
    } = date;

    const monthFormatted = parseInt(`${month}`, 10);
    const dayFormatted = parseInt(`${day}`, 10);

    const pastYear = monthFormatted === 1 ? year - 1 : year;
    const futureYear = monthFormatted === 12 ? year + 1 : year;

    const updatedDate = new Date(year, monthFormatted - 1, dayFormatted);
    const updatedDatePast = new Date(pastYear, updatedDate.getMonth() - 1, 1);
    const updatedDateFuture = new Date(futureYear, updatedDate.getMonth() + 1, 1);

    const currentMonthNumber = `${updatedDate.getMonth() + 1}`.padStart(2, "0");
    const pastMonthNumner = `${updatedDatePast.getMonth() + 1}`.padStart(2, "0");
    const futureMonthNumner = `${updatedDateFuture.getMonth() + 1}`.padStart(2, "0");

    const updateDay = `${updatedDate.getDate()}`.padStart(2, "0");

    setHeader(format(updatedDate, "MMM yyyy", calendar.locale).toUpperCase());
    chooseYear(updatedDate.getFullYear());
    chooseMonth(currentMonthNumber);
    chooseDay(updateDay);

    const currentYear = calendar.years.find(({ number }) => (number === updatedDate.getFullYear()));
    const currentMonth = currentYear?.months.find(({ number }) => (number === currentMonthNumber));
    const pastMonth = currentYear?.months.find(({ number }) => (number === pastMonthNumner));
    const futureMonth = currentYear?.months.find(({ number }) => (number === futureMonthNumner));
    const currentDay = currentMonth?.days.find(({ number }) => (number === updateDay));

    const validateCalendar = (
      pastMonth
      && futureMonth
      && currentYear?.number
      && currentMonth?.name
      && currentDay?.name
    );

    if (!validateCalendar) return;

    const firstDay = (currentMonth.days.at(0)?.key ?? 0);
    const leftDays = (spacesInCalendar - currentMonth.days.length);
    const futureDays = (leftDays - firstDay);
    const past: HookDatePickerDays[] = firstDay !== 0 ? pastMonth.days.map((pastDay) => ({
      ...pastDay,
      year: pastYear,
      month: pastMonth.number
    })).slice(-firstDay, pastMonth.days.length) : [];
    const future: HookDatePickerDays[] = futureMonth.days.map((futureDay) => ({
      ...futureDay,
      year: futureYear,
      month: futureMonth.number
    })).slice(0, futureDays);

    setDays([
      ...past,
      ...currentMonth.days.map((currentday) => ({
        ...currentday,
        year,
        month: currentMonth.number
      })),
      ...future
    ]);
  }, [chooseYear, chooseMonth, chooseDay, calendar.years, calendar.date, calendar.locale]);

  useEffect(() => {
    update();
    return () => {
      setDays([]);
    };
  }, [update]);

  return {
    render: {
      days,
      header,
      week,
      years: calendar.years
    },
    date: calendar.date,
    value,
    selected: calendar.selected,
    update
  };
}
