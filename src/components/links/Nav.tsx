import { NavLink } from "react-router-dom";

import type { NavLinkProps } from "@typing/proptypes";

export default function Nav({ to, text }: NavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "header__link header__link--active" : "header__link")}
      end
    >
      {text}
    </NavLink>
  );
}
