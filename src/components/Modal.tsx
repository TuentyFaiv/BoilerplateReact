import { useTranslation } from "react-i18next";
import { withPortal } from "@hoc";
import { useDatas } from "@hooks";
import GlobalConfig from "@config";

import type { MouseEvent } from "react";
import type { ModalProps } from "@typing/proptypes";

import { Modal as Styles } from "@cstyles";

// import Logo from "@icons/logo.svg";
// import IconClose from "@icons/icon-close.svg";

const DEFAULT_CONFIG = {
  small: false,
  white: false,
  center: false,
  close: false,
  scroll: false,
  header: true
};

function Modal({ children, title = "", config: conf = {}, open, onClose }: ModalProps) {
  const { t } = useTranslation("modal", { useSuspense: false });
  const config = { ...DEFAULT_CONFIG, ...conf };
  const datas = useDatas(config);

  const handleStopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  if (!open) return null;

  return (
    <Styles.Overlay
      data-hastitle={Boolean(title)}
      onClick={onClose}
      role="dialog"
      {...datas}
    >
      <Styles.Container onClick={handleStopPropagation} role="alertdialog">
        {config.header ? (
          <Styles.Header>
            {title ? (
              <Styles.Title>{title}</Styles.Title>
            ) : (
              <Styles.Logo src="Logo" alt={GlobalConfig.brand} />
            )}
          </Styles.Header>
        ) : null}
        <Styles.Content>
          {children(config)}
        </Styles.Content>
        <Styles.Close type="button" onClick={onClose}>
          {!config.close ? (
            <span>{t("modal-accept")}</span>
          ) : (
            <Styles.CloseIcon src="IconClose" alt={t("close") ?? ""} />
          )}
        </Styles.Close>
      </Styles.Container>
    </Styles.Overlay>
  );
}

export default withPortal(Modal, "#modal-root");
