import type { ButtonGreenProps } from "@typing/proptypes";

function Green({ onClick, text, ...props }: ButtonGreenProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="button-green"
      {...props}
    >
      {text}
    </button>
  );
}

Green.displayName = "ButtonGreen";

export default Green;
