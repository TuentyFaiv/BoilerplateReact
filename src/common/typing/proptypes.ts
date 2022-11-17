import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  MouseEvent,
  ButtonHTMLAttributes
} from "react";
import type {
  FieldHookConfig,
  FormikProps
} from "formik";
import type {
  ModalTypeState,
  ObjStrCustom,
  Product
} from "./types";
import type { HookModalFunc } from "./hooks";
import type {
  HOCAuth,
  HOCDatasets,
  HOCDatasetsProps,
  HOCField,
  HOCFieldProps
} from "./hocs";
import type { PaymentValues, ReturnConfigPsps } from "./services";
import type { DocumentFields } from "./payment";

export interface InputProps extends HOCDatasetsProps, HOCDatasets {
  children?: ReactNode;
  id?: string;
  name: string;
  value?: string;
  checked: boolean;
  label?: string;
  label2?: string | null;
  payment?: boolean;
  onSelect?: (event?: MouseEvent) => void;
}

type InputElement = Omit<
DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
keyof FieldHookConfig<string>
>;

export type InputFieldProps = HOCFieldProps & HOCField & InputElement & {
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
};

type AreaElement = Omit<
DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
keyof FieldHookConfig<string>
>;

export type AreaFieldProps = HOCFieldProps & HOCField & AreaElement & {
  id?: string;
  name: string;
  placeholder?: string;
};

export type FileFieldProps = HOCFieldProps & HOCField & InputElement & {
  id?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  profile?: boolean;
  onChange?: (values: File[] | File) => void;
};

type SelectOption = {
  value: string;
  label: string;
  key?: string;
};

export type SelectFieldProps = Omit<HOCFieldProps, "file"> & HOCField & {
  id?: string;
  name: string;
  options: SelectOption[];
  value?: string | null;
  withoutValue?: string;
  onSelect?: (value: unknown) => void;
};

export interface LanguageProps {
  onClose?: VoidFunction;
}

export type HeaderProps = HOCAuth;

export interface LoaderSimpleProps {
  msg: string;
}

export type LoaderPageProps = Partial<LoaderSimpleProps>;

export interface ModalProps {
  children: (config: ObjStrCustom<boolean>) => ReactNode;
  title?: string;
  config?: ObjStrCustom<boolean>;
  open: boolean;
  onClose: HookModalFunc;
}

export interface ScrollLinkProps {
  to: string;
  text: string;
  compareHash?: string;
  className: string;
  children?: ReactNode;
  span?: boolean;
}

export interface NavLinkProps {
  to: string;
  text: string;
}

export type LayoutProps = HOCAuth;

type ModalTermsChildren = {
  active: boolean;
  open: (type: ModalTypeState) => void;
};

export interface ModalTermsProps {
  onClose?: ModalProps["onClose"];
  redirect?: string;
  children?: (config: ModalTermsChildren) => ReactNode;
}

export interface ModalPaymentProps {
  onClose?: ModalProps["onClose"];
}

export interface ExchangeAmountProps {
  amount: number;
  currency: string;
}

export interface ContactFormProps {
  children: ReactNode;
}

export interface PersonalizedFormProps extends HOCAuth {
  onBack: VoidFunction;
}

type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>,
"form" | "disabled" | "type">;

export interface ButtonBaseProps extends ButtonProps {
  onClick: ((event: MouseEvent) => void) | (() => void);
  children: ReactNode;
  back?: boolean;
  go?: boolean;
  margin?: "center" | "start" | "end" | "zero";
  size?: "big" | "normal" | "small";
}

export type ButtonGoProps = Partial<Omit<ButtonBaseProps,
"children" | "go" | "back">> & {
  text: string;
};

type ButtonBasic = Pick<ButtonBaseProps, "onClick" | "disabled">;

export type ButtonGreenProps = ButtonBasic & {
  text: string;
};

export type ButtonBackProps = ButtonBasic;

export interface CardProductProps extends HOCAuth, Product {
  country: string;
}

export interface PaymentFormikProps {
  configuration: ReturnConfigPsps[];
  pspActive: ReturnConfigPsps;
}

export type PaymentFormProps = PaymentFormikProps & FormikProps<PaymentValues>;

export interface ChoosePspProps extends PaymentFormikProps {
  values: FormikProps<PaymentValues>["values"];
}

export interface DLocalProps {
  document: string;
  name: string;
}

export interface GenericsPaymentProps extends Partial<DocumentFields> {
  activeDocument: boolean;
  currencies: SelectOption[];
  methods: SelectOption[];
}

export interface AddressProps {
  state?: boolean;
}

export interface CardProps {
  holder?: "full" | "split";
  icon?: boolean;
  email?: boolean;
  phone?: boolean;
}

export interface SummaryProps {
  terms: PaymentValues["terms"];
}
