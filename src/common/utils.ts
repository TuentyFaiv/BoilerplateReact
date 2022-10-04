/* eslint-disable max-classes-per-file */
import type { HttpConnectionError } from "@typing/contexts";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// DatePicker
export const spacesInCalendar = 42;
export const weekDays = 7;
export const DEFAULT_FORMAT = "yyyy-MM-dd";

export class PaymentError extends Error {
  title: string;
  date: Date;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(title = "!Oh no¡", ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PaymentError);
    }

    this.name = "PaymentError";
    this.title = title;
    this.date = new Date();
  }
}

export class ServiceError extends Error {
  title: string;
  date: Date;

  constructor(
    private data: HttpConnectionError,
    title = "!Connection Error¡",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...params: any[]
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }

    this.name = "ServiceError";
    this.title = title;
    this.date = new Date();
  }

  viewData = () => (this.data);
}
