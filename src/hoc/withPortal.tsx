import { forwardRef } from "react";
import { createPortal } from "react-dom";

import type { ComponentType, Ref } from "react";

function withPortal<T>(Component: ComponentType<T>, selector: string) {
  const WithPortal = (props: T, ref: Ref<HTMLElement>) => {
    const root = document.querySelector(selector);

    if (!root) throw new Error(`Could not find element with selector: ${selector}`);

    return root ? createPortal(
      <Component ref={ref} {...props} />,
      root
    ) : null;
  };

  WithPortal.displayName = `withPortal(${Component.displayName || Component.name})`;

  return forwardRef(WithPortal);
}

export default withPortal;
