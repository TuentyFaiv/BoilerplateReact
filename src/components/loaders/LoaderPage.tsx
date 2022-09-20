import { withPortal } from "@hoc";

import type { LoaderProps } from "@typing/proptypes";

import { Loader } from "@components";

const LoaderPage = ({ msg = "" }: LoaderProps) => (
  <div className="loader-page">
    <Loader msg={msg} />
  </div>
);

export default withPortal(LoaderPage, "#loader-root");
