import { withPortal } from "@hoc";

import type { LoaderPageProps } from "@typing/proptypes";

import "@cstyles/Loader.scss";

import { LoaderSimple } from "@components";

const Page = ({ msg = "" }: LoaderPageProps) => (
  <div className="loader-page">
    <LoaderSimple msg={msg} />
  </div>
);

Page.displayName = "LoaderPage";

export default withPortal(Page, "#loader-root");
