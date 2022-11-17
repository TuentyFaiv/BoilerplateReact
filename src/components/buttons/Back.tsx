import type { ButtonBackProps } from "@typing/proptypes";

import IconBack from "@icons/back.png";

import { Button } from "@components";

function Back({ onClick, ...props }: ButtonBackProps) {
  return (
    <Button onClick={onClick} back margin="zero" {...props}>
      <img
        className="button-icon"
        src={IconBack}
        alt="Regresar"
      />
    </Button>
  );
}

Back.displayName = "ButtonBack";

export default Back;
