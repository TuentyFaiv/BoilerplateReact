import { forwardRef } from "react";
import { ErrorMessage, Field } from "formik";
import { withDatasets } from "@hoc";

import type { Ref } from "react";
import type { InputProps } from "@typing/proptypes";

const CheckboxInput = ({ children, label, label2 = null, ...props }: Omit<InputProps, "data">, ref: Ref<HTMLLabelElement>) => {
  const value = props.value ? { value: props.value } : {};

  return (
    <label
      ref={ref}
      htmlFor={props.id}
      data-checked={props.checked}
      className="field field--check"
      onClick={props.onSelect}
      {...props.datas}
    >
      <Field
        type="checkbox"
        id={props.id}
        name={props.name}
        className="field__checkbox"
        {...value}
      />
      <ErrorMessage
        component="span"
        name={props.name}
        className="field__checkbox-error"
      />
      <span className="field__text field__text--check">
        {label}
        {children}
        {label2}
      </span>
    </label>
  );
};

const Checkbox = forwardRef(CheckboxInput);

export default withDatasets<InputProps>(Checkbox);
