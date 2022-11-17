import { useTranslation } from "react-i18next";

export default function Smart() {
  const { t } = useTranslation("translation", { useSuspense: false });
  return (
    <section className="smart">
      <div className="smart__banner">
        <h2 className="smart__banner-title">
          {t("smart-title")}
          <span>{t("smart-title2")}</span>
        </h2>
      </div>
      {/* <div className="smart__banner smart__banner--big">
          <div className="smart__content">
            <h2 className="smart__title">{t("smart-subtitle")}</h2>
            <p className="smart__subtitle">{t("smart-subtitle2")}</p>
            <p className="smart__text">{t("smart-paragraph")}</p>
            <ScrollLink
              to="#plans"
              text={t("button-try")}
              className="smart__link"
              span
            >
              <img src={IconArrow} alt="" className="smart__link-icon" />
            </ScrollLink>
          </div>
        </div> */}
    </section>
  );
}
