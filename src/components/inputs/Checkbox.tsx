import { forwardRef } from "react";
import { withDatasets } from "@hoc";

import type { Ref } from "react";
import type { InputProps } from "@typing/proptypes";

import { Input as Styles, InputCheck as StylesC } from "@cstyles";

const CheckboxInput = ({ children, label, label2 = null, ...props }: Omit<InputProps, "data">, ref: Ref<HTMLLabelElement>) => {
  const value = props.value ? { value: props.value } : {};

  return (
    <Styles.Field
      ref={ref}
      htmlFor={props.id}
      data-checked={props.checked}
      onClick={props.onSelect}
      check
      {...props.datas}
    >
      <StylesC.Checkbox
        type="checkbox"
        id={props.id}
        name={props.name}
        disabled={props.datas["data-disabled"]}
        {...value}
      />
      <StylesC.Error component="span" name={props.name} />
      <Styles.Text check>
        {label}
        {children}
        {label2}
      </Styles.Text>
    </Styles.Field>
  );
};

const Checkbox = forwardRef(CheckboxInput);

Checkbox.displayName = "Checkbox";

export default withDatasets<InputProps>(Checkbox);
