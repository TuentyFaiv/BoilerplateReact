import { forwardRef } from "react";
import { withDatasets } from "@hoc";

import type { Ref } from "react";
import type { InputProps } from "@typing/proptypes";

import { Input as Styles, InputRadio as StyledR } from "@cstyles";

const RadioInput = ({ children, name, checked, value, ...props }: Omit<InputProps, "data">, ref: Ref<HTMLLabelElement>) => (
  <Styles.Field
    ref={ref}
    htmlFor={props.id}
    data-checked={checked}
    data-payment={props.payment}
    radio
    onClick={props.onSelect}
    {...props.datas}
  >
    <StyledR.Radio
      type="radio"
      id={props.id}
      name={name}
      value={value}
      disabled={props.datas["data-disabled"]}
    />
    <StyledR.Error
      component="span"
      name={name}
    />
    <Styles.Text radio>
      {props.label}
      {children}
      {props.label2}
    </Styles.Text>
  </Styles.Field>
);

const Radio = forwardRef(RadioInput);

Radio.displayName = "Radio";

export default withDatasets<InputProps>(Radio);
