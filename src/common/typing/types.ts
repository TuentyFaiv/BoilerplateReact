export type ObjStrCustom<T> = {
  [key: string]: T;
};

export type ObjStrCommon = {
  [key: string]: boolean | number | string;
};

export type Boot = {
  required: string;
};

export type BootAuth = Boot & {
  email: string;
};

export type BootAuthSignup = Boot & {
  requiredTerms: string;
  email: string;
};

export type BootPayment = Boot & {
  numbers: string;
  methods: string;
};

export type BootContact = Boot & BootAuthSignup;

export type SelectOption = {
  label: string;
  value: string;
};

export type Day = {
  key: number;
  name: string;
  number: string;
};

export type Month = {
  days: Day[];
  name: string;
  number: string;
};

export type Year = {
  number: number;
  months: Month[];
};

export type Review = {
  text: string;
  name: string;
  profession: string;
};

export type ClockState = {
  future: number;
  now: number;
  timeleft: () => number;
  day: () => number;
  hours: () => number;
  minutes: () => number;
  seconds: () => number;
};

export type ModalTypeState = "terms" | "privacy" | "both" | undefined;

export type Product = {
  title: string;
  cover: string;
  price: number;
  list: {
    bold: string;
    light: string | null;
    pairs?: number;
  }[];
};
