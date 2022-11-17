import { useTranslation } from "react-i18next";

import TimeIcon from "@icons/robots1.svg";
import StrategyIcon from "@icons/robots2.svg";
import CoverageIcon from "@icons/robots3.svg";
import VerifyIcon from "@icons/robots4.svg";

export default function Robots() {
  const { t } = useTranslation("translation", { useSuspense: false });

  return (
    <section className="robots">
      <div className="robots__container">
        <h2 className="robots__title">
          {t("robots-title")}
          <span className="robots__green">
            {t("robots-title2")}
            <span>?</span>
          </span>
        </h2>
        <p className="robots__paragraph">{t("robots-paragraph")}</p>
        <div className="robots__grid">
          <article className="robots__item">
            <img src={TimeIcon} alt="Time" className="robots__icon" />
            <div className="robots__text">
              <h3 className="robots__box-title">{t("robots-box-title")}</h3>
              <p className="robots__box-paragraph">{t("robots-box-text")}</p>
            </div>
          </article>
          <article className="robots__item">
            <img src={StrategyIcon} alt="Strategy" className="robots__icon" />
            <div className="robots__text">
              <h3 className="robots__box-title">{t("robots-box-title2")}</h3>
              <p className="robots__box-paragraph">{t("robots-box-text2")}</p>
            </div>
          </article>
          <article className="robots__item">
            <img src={CoverageIcon} alt="Coverage" className="robots__icon" />
            <div className="robots__text">
              <h3 className="robots__box-title">{t("robots-box-title3")}</h3>
              <p className="robots__box-paragraph">{t("robots-box-text3")}</p>
            </div>
          </article>
          <article className="robots__item">
            <img src={VerifyIcon} alt="Verify" className="robots__icon" />
            <div className="robots__text">
              <h3 className="robots__box-title">{t("robots-box-title4")}</h3>
              <p className="robots__box-paragraph">{t("robots-box-text4")}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
