/* eslint-disable import/prefer-default-export */
import { useState } from "react";
import { withField } from "@hoc";

import type { InputFieldProps } from "@typing/proptypes";

const GeneralInput = ({ error, field, meta, helpers, type, ...props }: Omit<InputFieldProps, "data" | "file">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        id={props.id || props.name}
        className="input__input"
        data-error={error}
        type={(type === "password" && showPassword) ? "text" : type}
        {...field}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          className="input__show"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? "IconEye" : "IconEyeClose"}
            alt={showPassword ? "Show password" : "Hide password"}
            className="input__show-icon"
          />
        </button>
      )}
    </>
  );
};

export const Input = withField<InputFieldProps>(GeneralInput);
