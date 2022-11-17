/* eslint-disable max-classes-per-file */
import swal from "sweetalert";
import { Currencies, Method } from "@typing/enums";

import type { TFunction } from "react-i18next";
import type {
  ContextAppUser,
  ContextCartError,
  ContextCartState,
  HttpConnectionError
} from "@typing/contexts";
import type { ReturnConfigPsps } from "@typing/services";
import type { Product } from "@typing/types";

/* User */
import DEFAULT_IMAGE from "@icons/default-user-profile.svg";
/* User */

/* Products */
import TraderCleanerImage from "@images/box_forex-trade-cleaner.png";
import ImpulseTraderImage from "@images/box_forex-impulse-trader.png";
import ProScalperImage from "@images/box_dynamic-pro-scalper.png";
import ProfitDefenderImage from "@images/box_forex-profit-defender.png";
import PulseDetectorImage from "@images/box_forex-pulse-detector.png";
import TrendHunterImage from "@images/box_forex-trend-hunter.png";
/* Products */

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// User
export const DEFAULT_USER: ContextAppUser = {
  firstName: "",
  lastName: "",
  country: "",
  crmId: "",
  email: "",
  profileImage: DEFAULT_IMAGE,
  tpId: ""
};

// DatePicker
export const spacesInCalendar = 42;
export const weekDays = 7;
export const DEFAULT_FORMAT = "yyyy-MM-dd";

// Products
export const PRODUCTS: Product[] = [
  {
    title: "CURRENCY TRADE CLEANER",
    cover: TraderCleanerImage,
    price: 200,
    list: [
      {
        bold: "meta-list-one",
        light: "meta-list-five"
      },
      {
        bold: "meta-list-two",
        light: "meta-list-six"
      },
      {
        bold: "meta2-list-one",
        light: null
      },
      {
        bold: "meta-list-thirteen",
        light: "meta2-list-two"
      }
    ]
  },
  {
    title: "CURRENCY IMPULSE TRADER",
    cover: ImpulseTraderImage,
    price: 250,
    list: [
      {
        bold: "meta-list-one",
        light: "meta2-list-three",
        pairs: 6
      },
      {
        bold: "meta-list-two",
        light: "M15"
      },
      {
        bold: "meta-list-eight",
        light: "meta-list-twelve"
      },
      {
        bold: "meta-list-thirteen",
        light: "meta-list-twelve"
      }
    ]
  },
  {
    title: "CURRENCY TREND HUNTER",
    cover: TrendHunterImage,
    price: 450,
    list: [
      {
        bold: "meta-list-one",
        light: "meta2-list-three",
        pairs: 5
      },
      {
        bold: "meta-list-two",
        light: "meta2-list-four"
      },
      {
        bold: "meta-list-eight",
        light: "meta-list-twelve"
      },
      {
        bold: "meta-list-thirteen",
        light: "meta2-list-five"
      }
    ]
  },
  {
    title: "CURRENCY PROFIT DEFENDER",
    cover: ProfitDefenderImage,
    price: 1500,
    list: [
      {
        bold: "meta-list-one",
        light: "meta-list-five"
      },
      {
        bold: "meta-list-two",
        light: "meta-list-six"
      },
      {
        bold: "meta-list-three",
        light: null
      },
      {
        bold: "meta-list-four",
        light: null
      }
    ]
  },
  {
    title: "CURRENCY PULSE DEFENDER",
    cover: PulseDetectorImage,
    price: 3500,
    list: [
      {
        bold: "meta-list-one",
        light: "GBPUSD, EURGBP"
      },
      {
        bold: "meta-list-two",
        light: "meta-list-six"
      },
      {
        bold: "meta-list-eight",
        light: "meta-list-nine"
      },
      {
        bold: "meta-list-ten",
        light: "Scalping, Grid"
      }
    ]
  },
  {
    title: "DYNAMIC PRO SCALPER",
    cover: ProScalperImage,
    price: 6000,
    list: [
      {
        bold: "meta-list-one",
        light: "meta2-list-three",
        pairs: 9
      },
      {
        bold: "meta-list-two",
        light: "M15"
      },
      {
        bold: "meta-list-eight",
        light: "meta-list-twelve"
      },
      {
        bold: "meta-list-ten",
        light: "Asian Scalper"
      }
    ]
  }
];

// Payment
export const DEFAULT_CART: ContextCartState = {
  amount: 0,
  currency: Currencies.USD,
  description: "",
  idPsp: NaN,
  method: Method.CARD,
  namePsp: "",
  country: "MX",
  exchangeAmount: 0,
  exchangeCurrency: Currencies.USD
};

export const DEFAULT_CART_ERROR: ContextCartError = {
  code: null,
  psp_code: null,
  psp_name: null,
  message: null
};

export const DEFAULT_PSP_ACTIVE: ReturnConfigPsps = {
  id: NaN,
  name: "",
  pspId: NaN,
  currency: {},
  method: {},
  available: false,
  maxAmount: NaN,
  minAmount: NaN,
  selectedCountries: [],
  availableCountries: [],
  availableBusinessUnits: [],
  notAvailableBusinessUnit: []
};

// Errors
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

export function showError(error: unknown, t: TFunction, alert?: (message: string) => void) {
  let msg = "";
  if (error instanceof Error) {
    msg = error.message;
  }
  if (error instanceof ServiceError) {
    msg = error.viewData().message;
  }
  if (!alert) {
    swal("Error!", t(msg, { ns: "errors" }), "error");
  } else {
    alert(msg);
  }
}
