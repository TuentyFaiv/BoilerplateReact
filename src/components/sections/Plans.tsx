import { useTranslation } from "react-i18next";
import { PRODUCTS } from "@utils";
import { useGetCountry } from "@hooks";

import Meta5Icon1 from "@icons/Icon_001_MT5.svg";
import Meta5Icon2 from "@icons/Icon_002_MT5.svg";
import Meta5Icon3 from "@icons/Icon_003_MT5.svg";
import Meta5Icon4 from "@icons/Icon_004_MT5.svg";
import Meta5Icon5 from "@icons/Icon_005_MT5.svg";
import Meta5Icon6 from "@icons/Icon_006_MT5.svg";

import { CardProduct } from "@components";

export default function Plans() {
  const { t } = useTranslation("translation", { useSuspense: false });
  const { country } = useGetCountry();

  return (
    <section id="plans" className="meta">
      <div className="meta__container">

        {/* <h2 className="meta__subtitle">{t("meta-subtitle")}</h2>
          <h1 className="meta__title">{t("meta-title")}</h1>
          <p className="meta__paragraph">{t("meta-paragraph")}</p>
          <h3 className="meta__intro">{t("meta-best")}</h3> */}

        {/* <h2 className="meta__top">{t("meta-subtitle2")}</h2>
          <h1 className="meta__title">MetaTrader 5</h1>
          <div className="meta__points">
            <article className="meta__value">
              <img src={Meta5Icon1} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title1")}</p>
              <p className="meta__value-text">{t("meta-box-text1")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon2} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title2")}</p>
              <p className="meta__value-text">{t("meta-box-text2")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon3} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title3")}</p>
              <p className="meta__value-text">{t("meta-box-text3")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon4} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title4")}</p>
              <p className="meta__value-text">{t("meta-box-text4")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon5} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title5")}</p>
              <p className="meta__value-text">{t("meta-box-text5")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon6} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title6")}</p>
              <p className="meta__value-text">{t("meta-box-text6")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon7} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title7")}</p>
              <p className="meta__value-text">{t("meta-box-text7")}</p>
            </article>
            <article className="meta__value">
              <img src={Meta5Icon8} alt="Meta 5" className="meta__value-icon" />
              <p className="meta__value-title">{t("meta-box-title8")}</p>
              <p className="meta__value-text">{t("meta-box-text8")}</p>
            </article>
          </div> */}

        <h2 className="meta__subtitle">{t("meta2-subtitle")}</h2>
        <h1 className="meta__title">{t("meta2-title")}</h1>
        <p className="meta__paragraph">{t("meta2-paragraph")}</p>
        <h3 className="meta__intro">{t("meta-best")}</h3>
        <div className="meta__grid">
          {PRODUCTS.map((product) => (
            <CardProduct
              key={product.title}
              country={country.code}
              {...product}
            />
          ))}
        </div>
        <div className="meta__points">
          <article className="meta__value">
            <img src={Meta5Icon1} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title1")}</p>
            <p className="meta__value-text">{t("meta2-box-text1")}</p>
          </article>
          <article className="meta__value">
            <img src={Meta5Icon2} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title2")}</p>
            <p className="meta__value-text">{t("meta2-box-text2")}</p>
          </article>
          <article className="meta__value">
            <img src={Meta5Icon3} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title3")}</p>
            <p className="meta__value-text">{t("meta2-box-text3")}</p>
          </article>
          <article className="meta__value">
            <img src={Meta5Icon4} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title4")}</p>
            <p className="meta__value-text">{t("meta2-box-text4")}</p>
          </article>
          <article className="meta__value">
            <img src={Meta5Icon5} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title5")}</p>
            <p className="meta__value-text">{t("meta2-box-text5")}</p>
          </article>
          <article className="meta__value">
            <img src={Meta5Icon6} alt="Meta 5" className="meta__value-icon" />
            <p className="meta__value-title">{t("meta2-box-title6")}</p>
            <p className="meta__value-text">{t("meta2-box-text6")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
