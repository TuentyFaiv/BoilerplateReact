import { forwardRef } from "react";
import { ErrorMessage, Field } from "formik";
import { withDatasets } from "@hoc";

import type { Ref } from "react";
import type { InputProps } from "@typing/proptypes";

const RadioInput = ({ children, name, checked, value, ...props }: Omit<InputProps, "data">, ref: Ref<HTMLLabelElement>) => (
  <label
    ref={ref}
    htmlFor={props.id}
    data-checked={checked}
    data-payment={props.payment}
    className="field field--radio"
    onClick={props.onSelect}
    {...props.datas}
  >
    <Field
      type="radio"
      id={props.id}
      name={name}
      value={value}
      className="field__radio"
    />
    <ErrorMessage
      component="span"
      name={name}
      className="field__radio-error"
    />
    <span className="field__text field__text--radio">
      {props.label}
      {children}
      {props.label2}
    </span>
  </label>
);

const Radio = forwardRef(RadioInput);

Radio.displayName = "Radio";

export default withDatasets<InputProps>(Radio);
