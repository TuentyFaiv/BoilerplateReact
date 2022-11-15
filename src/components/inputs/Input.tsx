import { useState } from "react";
import { withField } from "@hoc";

import type { InputFieldProps } from "@typing/proptypes";

import { Input as Styles } from "@cstyles";

const GeneralInput = ({ error, field, meta, helpers, type, ...props }: Omit<InputFieldProps, "data" | "file">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Styles.Input
        id={props.id || props.name}
        data-error={error}
        type={(type === "password" && showPassword) ? "text" : type}
        {...field}
        {...props}
      />
      {type === "password" && (
        <Styles.Show
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Styles.ShowIcon
            src={showPassword ? "IconEye" : "IconEyeClose"}
            alt={showPassword ? "Show password" : "Hide password"}
          />
        </Styles.Show>
      )}
    </>
  );
};

GeneralInput.displayName = "Input";

export default withField<InputFieldProps>(GeneralInput);
