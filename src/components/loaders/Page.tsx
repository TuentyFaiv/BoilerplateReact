import { withPortal } from "@hoc";

import type { LoaderPageProps } from "@typing/proptypes";

import { Loader as Styles } from "@cstyles";

import { LoaderSimple } from "@components";

const Page = ({ msg = "" }: LoaderPageProps) => (
  <Styles.Page>
    <LoaderSimple msg={msg} />
  </Styles.Page>
);

Page.displayName = "LoaderPage";

export default withPortal(Page, "#loader-root");
