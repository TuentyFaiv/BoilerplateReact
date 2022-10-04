import type { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import type { ObjStrCommon } from "./types";

export interface HOCDatasetsProps {
  data?: ObjStrCommon;
}

export interface HOCDatasets {
  datas: ObjStrCommon;
}

export type HOCFieldProps = {
  data?: ObjStrCommon;
  label: string;
  file?: boolean;
  readOnly?: boolean;
};

export interface HOCField {
  error: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldInputProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: FieldMetaProps<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helpers: FieldHelperProps<any>;
}

export interface HOCAuth {
  auth: boolean;
}

export type HOCAuthState = {
  from?: string;
};

export type HOCAuthType = "component" | "page";
