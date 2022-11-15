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

export type BootContact = Boot & BootAuthSignup & {
  onlyNumbers: string;
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
