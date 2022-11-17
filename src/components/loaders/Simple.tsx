import type { LoaderSimpleProps } from "@typing/proptypes";

import "@stylesComponents/Loader.scss";

const Simple = ({ msg }: LoaderSimpleProps) => (
  <div className="loader">
    <div className="loader__spinner" />
    <p className="loader__text">{msg}</p>
  </div>
);

Simple.displayName = "LoaderSimple";

export default Simple;
