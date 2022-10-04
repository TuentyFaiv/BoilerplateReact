import { forwardRef } from "react";
import { useField } from "formik";
import { useDatas } from "@hooks";

import type { ComponentType, Ref } from "react";
import type { FieldHookConfig } from "formik";
import type { HOCField, HOCFieldProps } from "@typing/hocs";

import "@stylesComponents/Input.scss";

function withField<T extends HOCField = HOCField>(InputComponent: ComponentType<T>) {
  const WithField = forwardRef((props: Omit<T, keyof HOCField>, ref: Ref<HTMLLabelElement>) => {
    const { label, file, data = {}, ...newProps } = props as T & HOCFieldProps & FieldHookConfig<string>;
    const [field, meta, helpers] = useField(newProps);
    const datas = useDatas(data);
    const error = Boolean(meta.touched && meta.error);
    const fileStyles = file ? " field--file" : "";

    return (
      <label
        ref={ref}
        htmlFor={newProps.id || newProps.name}
        data-error={error}
        data-error-msg={meta.error}
        data-readonly={newProps.readOnly}
        data-disabled={newProps.disabled}
        data-password={newProps.type === "password"}
        className={`field${fileStyles}`}
        {...datas}
      >
        <InputComponent
          {...(newProps as T)}
          error={error}
          field={field}
          meta={meta}
          helpers={helpers}
          label={label}
        />
        <p
          className="field__text"
          title={meta.error}
          data-error={error}
          data-error-msg={error ? meta.error : null}
        >
          {label}
        </p>
      </label>
    );
  });

  WithField.displayName = `withField(${InputComponent.displayName ?? InputComponent.name})`;

  return WithField;
}

export default withField;
