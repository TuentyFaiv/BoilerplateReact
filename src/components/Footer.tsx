import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useGetCountry } from "@hooks";

import "@stylesComponents/Footer.scss";

import LogoLarge from "@icons/logo-large.svg";

import { ScrollLink, ModalTerms } from "@components";

export default function Footer() {
  const { t } = useTranslation("header", { useSuspense: false });
  const { country } = useGetCountry();
  const { pathname } = useLocation();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__content">
          <span className="footer__copy-right">
            <span className="footer__copy-right footer__copy-right--bold">
              Copyright © TRADERBOTIC.com
            </span>
            {` ${t("reserved")}`}
          </span>
          <ul className="footer__list">
            <li className="footer__list-item">
              <ScrollLink
                to="#about"
                text={t("about")}
                className="footer__link"
              />
            </li>
            <li className="footer__list-item">
              <ScrollLink
                to="#plans"
                text={t("plans")}
                className="footer__link"
              />
            </li>
            <li className="footer__list-item">
              <ScrollLink
                to="#contact"
                text={t("contact")}
                className="footer__link"
              />
            </li>
            <ModalTerms redirect={pathname}>
              {({ open }) => (
                <>
                  <li className="footer__list-item">
                    <button
                      onClick={() => { open("terms"); }}
                      type="button"
                      className="footer__link footer__link--button"
                    >
                      {t("terms")}
                    </button>
                  </li>
                  <li className="footer__list-item">
                    <button
                      onClick={() => { open("privacy"); }}
                      type="button"
                      className="footer__link footer__link--button"
                    >
                      {t("privacy")}
                    </button>
                  </li>
                </>
              )}
            </ModalTerms>
          </ul>
          <p className="footer__content-text">
            {country.code === "MX" ? (
              <span>
                Florencia 57, 5532082413, support@traderbotic.com
              </span>
            ) : null}
            <br />
            {t("copy-right")}
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <picture className="footer__logo-container">
          <img src={LogoLarge} alt="" className="footer__logo" />
        </picture>
      </div>
    </footer>
  );
}
