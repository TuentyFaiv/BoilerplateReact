import { useTranslation } from "react-i18next";
import { useModal } from "@hooks";
import config from "@config";

import type { LanguageProps } from "@typing/proptypes";

import { Language as Styles } from "@cstyles";

export default function Language({ onClose }: LanguageProps) {
  const { i18n } = useTranslation("translation", { useSuspense: false });
  const [modal, toggleModal] = useModal();
  const lang = `${i18n.language}`.split("-")[0];

  return (
    <Styles.Container
      onClick={toggleModal}
      role="button"
      tabIndex={0}
      data-open={modal}
    >
      {lang}
      {modal && (
        <Styles.Options>
          {config.i18n_langs.map((language) => (
            <Styles.Option
              key={language}
              type="button"
              onClick={() => {
                i18n.changeLanguage(language);
                if (onClose) onClose();
              }}
            >
              {`${language}`.split("-")[0]}
            </Styles.Option>
          ))}
        </Styles.Options>
      )}
    </Styles.Container>
  );
}
