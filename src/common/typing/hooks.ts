import type { Locale } from "date-fns";
import type {
  Day,
  Month,
  Year,
  ObjStrCustom
} from "./types";
import type { SelectOption } from "./interfaces";

// HookModal
export type HookModalParameters = {
  query?: null | HookMediaParameters;
  element?: string;
};
export type HookModalFunc = (custom?: unknown) => void;
export type HookModalReturn = [boolean, HookModalFunc];

// HookMedia
export type HookMediaParameters = null | `(${"max" | "min"}-width: ${number}px)`;
export type HookMediaReturn = boolean;

// HookCountry
export type HookCountry = {
  name_en: string;
  name_es: string;
  dial_code: string;
  code: string;
};

// HookCountries
export type HookCountries = {
  countries: HookCountry[];
};

// HookCalendar
export type HookCalendarLangs = ObjStrCustom<Locale>;
export type HookCalendarParam = "past" | "future";
export type HookCalendarState = {
  year: number;
  month: string;
  day: string;
};
type Calendar = {
  years: Year[];
  months: Month[];
  days: Day[];
  selected: HookCalendarState;
  date: Date;
  locale: {
    locale: Locale;
  }
};
export type HookCalendarReturn = {
  calendar: Calendar;
  chooseYear: (year: string | number) => void;
  chooseMonth: (month: string) => void;
  chooseDay: (day: string) => void;
};

// HookDatePicker
export type HookDatePickerDays = Day & {
  month: string;
  year: number;
};
export type HookDatePickerUpdateParam = {
  year?: number;
  month?: number | string;
  day?: number | string;
};
export type HookDatePickerUpdate = (updatedDate?: HookDatePickerUpdateParam) => void;
export type HookDatePickerState = HookDatePickerDays[];
export type HookDatePickerReturn = {
  render: {
    days: HookDatePickerState;
    header: string;
    week: string[];
    years: Year[];
  },
  value: string;
  selected: HookCalendarState;
  date: Date;
  update: HookDatePickerUpdate;
};

// HookMakeOptions
export type HookMakeOptionsParam<T = ObjStrCustom<string>> = {
  options: T[];
  keys: SelectOption;
};
export type HookMakeOptionsReturn = SelectOption[];
