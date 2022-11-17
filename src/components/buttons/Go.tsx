import type { ButtonGoProps } from "@typing/proptypes";

import IconArrow from "@icons/icon-arrow.svg";

import { Button } from "@components";

function Go({ text, onClick = () => {}, ...props }: ButtonGoProps) {
  return (
    <Button onClick={onClick} go {...props}>
      <span>{text}</span>
      <img src={IconArrow} alt="" className="button-icon" />
    </Button>
  );
}

Go.displayName = "ButtonGo";

export default Go;
