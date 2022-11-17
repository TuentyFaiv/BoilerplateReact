import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@context";
import { useModal } from "@hooks";
import { Actions } from "@typing/enums";

import type { HeaderProps } from "@typing/proptypes";

import "@stylesComponents/Header.scss";

import LogoLarge from "@icons/logo-large.svg";
import IconUp from "@icons/icon-up.svg";

import { Language, ScrollLink, NavLink } from "@components";

export default function Header({ auth }: HeaderProps) {
  const { t } = useTranslation("header", { useSuspense: false });
  const { global: { user }, dispatch } = useAppContext();
  const { hash, pathname } = useLocation();
  const [modal, toggleModal] = useModal({ query: "(max-width: 635px)" });
  const [fixed, setFixed] = useState(false);
  const hiddenRef = useRef<HTMLSpanElement | null>(null);

  const handleSignout = () => {
    dispatch({ type: Actions.SIGNOUT });
  };

  const handleUp = () => {
    hiddenRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const element = hiddenRef.current;
    const observer = new IntersectionObserver((entries) => {
      const firstElement = entries[0];
      setFixed(!firstElement.isIntersecting);
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [hiddenRef]);

  useEffect(() => {
    toggleModal(false);
  }, [hash, pathname, toggleModal]);

  return (
    <>
      <span ref={hiddenRef} className="header__observer" />
      <header className="header" data-fixed={fixed}>
        <div className="header__content">
          <ul className="header__list">
            <li className="header__list-item">
              <ScrollLink
                to="#about"
                text={t("about")}
                compareHash={hash}
                className="header__link"
              />
            </li>
            <li className="header__list-item">
              <ScrollLink
                to="#plans"
                text={t("plans")}
                compareHash={hash}
                className="header__link"
              />
            </li>
            <li className="header__list-item">
              <ScrollLink
                to="#contact"
                text={t("contact")}
                compareHash={hash}
                className="header__link"
              />
            </li>
          </ul>
          <Link to="/" className="header__logo-link">
            <picture className="header__logo-picture">
              {/* <source media="(max-width: 768px)" srcSet={Logo} /> */}
              <img src={LogoLarge} alt="Logo" className="header__logo" />
            </picture>
          </Link>
          <button
            onClick={toggleModal}
            type="button"
            className="header__menu-button"
          >
            <div className="header__menu-button-icon" data-active={modal}>
              <span />
              <span />
              <span />
            </div>
          </button>
          <nav className="header__nav" data-active={modal}>
            <ul className="header__list header__list--mobile">
              <li className="header__list-item">
                <ScrollLink
                  to="#about"
                  text={t("about")}
                  compareHash={hash}
                  className="header__link"
                />
              </li>
              <li className="header__list-item">
                <ScrollLink
                  to="#plans"
                  text={t("plans")}
                  compareHash={hash}
                  className="header__link"
                />
              </li>
              <li className="header__list-item">
                <ScrollLink
                  to="#contact"
                  text={t("contact")}
                  compareHash={hash}
                  className="header__link"
                />
              </li>
              {auth ? (
                <li className="header__list-item header__list-item--session">
                  <img
                    src={user.profileImage}
                    alt=""
                    className="header__user"
                  />
                  <button onClick={handleSignout} type="button" className="header__link header__link--button">
                    {t("signout")}
                  </button>
                </li>
              ) : (
                <li className="header__list-item header__list-item--auth">
                  <NavLink to="/signin" text={t("signin")} />
                  /
                  <NavLink to="/signup" text={t("signup")} />
                </li>
              )}
              <li className="header__list-item">
                <Language
                  onClose={() => { toggleModal(false); }}
                />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {fixed && (
        <button onClick={handleUp} type="button" className="header__up">
          <img src={IconUp} alt="" className="header__up-icon" />
        </button>
      )}
    </>
  );
}
