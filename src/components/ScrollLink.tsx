import { useResolvedPath } from "react-router-dom";

import type { ScrollLinkProps } from "@typing/proptypes";

import { ScrollLink as Styles } from "@cstyles";

const ScrollLink = ({ to, text, compareHash, ...props }: ScrollLinkProps) => {
  const { hash } = useResolvedPath(to);
  const active = (hash === compareHash);

  const handleScroll = () => {
    const section = document.getElementById(hash.slice(1));
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Styles.ScrollLink
      to={`/${to}`}
      active={active}
      onClick={handleScroll}
    >
      {props.span ? <span>{text}</span> : text}
      {props.children}
    </Styles.ScrollLink>
  );
};

export default ScrollLink;
