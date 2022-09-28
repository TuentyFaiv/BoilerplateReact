/* eslint-disable import/prefer-default-export */
import { withField } from "@hoc";

import type { AreaFieldProps } from "@typing/proptypes";

const Area = ({ error, field, meta, helpers, ...props }: Omit<AreaFieldProps, "data" | "file">) => (
  <textarea
    id={props.id || props.name}
    data-error={error}
    className="field__area"
    {...field}
    {...props}
  />
);

export default withField<AreaFieldProps>(Area);
