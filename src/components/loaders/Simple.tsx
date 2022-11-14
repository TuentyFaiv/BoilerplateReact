import type { LoaderSimpleProps } from "@typing/proptypes";

import "@cstyles/Loader.scss";

const Simple = ({ msg }: LoaderSimpleProps) => (
  <div className="loader">
    {msg}
  </div>
);

Simple.displayName = "LoaderSimple";

export default Simple;
