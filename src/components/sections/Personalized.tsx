import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PersonalizedForm } from "@containers";
import { ButtonGo } from "@components";

export default function Personalized() {
  const { t } = useTranslation("translation", { useSuspense: false });
  const [personalized, setPersonalized] = useState<boolean>(false);

  const handleToggleForm = () => {
    setPersonalized(!personalized);
  };

  return (
    <section className="personalized">
      <div className="personalized__container">
        {!personalized ? (
          <>
            <h2 className="personalized__title">
              {t("personalized-title")}
              {" "}
              <span className="personalized__title personalized__title--green">
                {t("personalized-title2")}
              </span>
              ?
            </h2>
            <p className="personalized__text">{t("personalized-text")}</p>
            <ButtonGo
              onClick={handleToggleForm}
              text={t("button-buy")}
            />
          </>
        ) : (
          <PersonalizedForm onBack={handleToggleForm} />
        )}
      </div>
    </section>
  );
}
