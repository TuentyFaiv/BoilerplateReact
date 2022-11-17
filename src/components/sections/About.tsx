import { useTranslation } from "react-i18next";

import WhoImage from "@images/who-image.png";

export default function About() {
  const { t } = useTranslation("translation", { useSuspense: false });
  return (
    <section className="who" id="about">
      <div className="who__container">
        <h1 className="who__title">
          {t("who-title")}
          {" "}
          <span className="who__green">TRADERBOTIC?</span>
        </h1>
        <div className="who__grid">
          <div className="who__box">
            <img src={WhoImage} alt="Who" className="who__image" />
          </div>
          <div className="who__box">
            <p className="who__text">
              {t("who-paragraph")}
              {" "}
              <b>TRADERBOTIC</b>
              {t("who-paragraph2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
