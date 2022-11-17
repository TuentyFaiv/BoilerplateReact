import { useState } from "react";
import { withField } from "@hoc";

import type { InputFieldProps } from "@typing/proptypes";

const GeneralInput = ({ error, field, meta, helpers, type, ...props }: Omit<InputFieldProps, "data" | "file">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        id={props.id || props.name}
        className="field__input"
        data-error={error}
        type={(type === "password" && showPassword) ? "text" : type}
        {...field}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          className="field__show"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? "IconEye" : "IconEyeClose"}
            alt={showPassword ? "Hide password" : "Show password"}
            className="field__show-icon"
          />
        </button>
      )}
    </>
  );
};

GeneralInput.displayName = "Input";

export default withField<InputFieldProps>(GeneralInput);
