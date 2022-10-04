import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { withPortal } from "@hoc";
import { useDatas } from "@hooks";
import GlobalConfig from "@config";

import type { MouseEvent } from "react";
import type { ModalProps } from "@typing/proptypes";

import "@stylesComponents/Modal.scss";

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
  const modalRef = useRef<HTMLElement | null>(null);

  const handleStopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  if (!open) return null;

  return (
    <section
      ref={modalRef}
      className="modal"
      data-hastitle={Boolean(title)}
      onClick={onClose}
      role="dialog"
      {...datas}
    >
      <div className="modal__container" onClick={handleStopPropagation} role="alertdialog">
        {config.header ? (
          <div className="modal__header">
            {title ? (
              <h2 className="modal__title">{title}</h2>
            ) : (
              <img src="Logo" alt={GlobalConfig.brand} className="modal__logo" />
            )}
          </div>
        ) : null}
        <div className="modal__content">
          {children(config)}
        </div>
        <button type="button" className="modal__button" onClick={onClose}>
          {!config.close ? (
            <span>{t("modal-accept")}</span>
          ) : (
            <img src="IconClose" alt={t("close")} className="modal__button-icon" />
          )}
        </button>
      </div>
    </section>
  );
}

export default withPortal(Modal, "#modal-root");
