import type { LoaderSimpleProps } from "@typing/proptypes";

import { Loader as Styles } from "@cstyles";

const Simple = ({ msg }: LoaderSimpleProps) => (
  <Styles.Simple>
    {msg}
  </Styles.Simple>
);

Simple.displayName = "LoaderSimple";

export default Simple;
