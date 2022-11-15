import { withField } from "@hoc";

import type { AreaFieldProps } from "@typing/proptypes";

import { InputArea as Styles } from "@cstyles";

const Area = ({ error, field, meta, helpers, ...props }: Omit<AreaFieldProps, "data" | "file">) => (
  <Styles.Area
    id={props.id || props.name}
    data-error={error}
    {...field}
    {...props}
  />
);

Area.displayName = "TextArea";

export default withField<AreaFieldProps>(Area);
