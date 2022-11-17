/* eslint-disable react/button-has-type */
import { useDatas } from "@hooks";

import type { ButtonBaseProps } from "@typing/proptypes";

import "@stylesComponents/Button.scss";

function Base({ onClick, children, disabled, type = "button", ...props }: ButtonBaseProps) {
  const datas = useDatas(props);

  return (
    <button
      onClick={onClick}
      type={type}
      className="button-primary"
      disabled={disabled}
      {...datas}
    >
      {children}
    </button>
  );
}

Base.displayName = "Button";

export default Base;
