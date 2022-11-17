import type { Locale } from "date-fns";
import type {
  Day,
  Month,
  Year,
  ObjStrCustom,
  SelectOption
} from "./types";

// HookModal
export type HookModalParameters = {
  query?: HookMediaParameters;
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
  chooseYear: (year: string | number | unknown) => void;
  chooseMonth: (month: string | unknown) => void;
  chooseDay: (day: string | unknown) => void;
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
  keys: {
    label: string;
    value: string;
  };
};
export type HookMakeOptionsReturn = SelectOption[];

export type HookAntifraudTokensState = {
  payu: string;
  openpay: string;
};

export type HookAntifraudTokensReturn = HookAntifraudTokensState;
