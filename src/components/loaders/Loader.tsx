import type { LoaderProps } from "@typing/proptypes";

const Loader = ({ msg }: LoaderProps) => (
  <div className="loader">
    {msg}
  </div>
);

export default Loader;
