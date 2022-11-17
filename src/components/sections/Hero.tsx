import { useTranslation } from "react-i18next";

import { ButtonGo, Clock } from "@components";

export default function Hero() {
  const { t } = useTranslation("translation", { useSuspense: false });

  const handleGoToPlans = () => {
    const section = document.querySelector("#plans");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="hero">
        <div className="hero__container">
          <div className="hero__text">
            <h2 className="hero__subtitle">{t("hero-subtitle")}</h2>
            <h1 className="hero__title">
              {t("hero-title")}
              {" "}
              <span className="hero__green">{t("hero-title2")}</span>
              !
            </h1>
            <p className="hero__paragraph">{t("hero-paragraph")}</p>
            <ButtonGo
              onClick={handleGoToPlans}
              text={t("button-buy-now")}
              margin="start"
            />
          </div>
        </div>
      </section>
      <Clock />
    </>
  );
}
