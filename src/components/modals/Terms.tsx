import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useModal, useQuery } from "@hooks";

import type { ModalTermsProps } from "@typing/proptypes";
import type { ModalTypeState } from "@typing/types";

import "@stylesComponents/Footer.scss";

import { Modal } from "@components";

function Terms({ onClose, children, redirect = "/" }: ModalTermsProps) {
  const { t } = useTranslation("header", { useSuspense: false });
  const navigate = useNavigate();
  const [modal, toggleModal] = useModal();
  const query = useQuery();
  const [type, setType] = useState<ModalTypeState>(undefined);

  const handleModal = useCallback((modalType: ModalTypeState) => {
    setType(modalType);
    toggleModal(true);
  }, [toggleModal]);

  useEffect(() => {
    if (query.modal) handleModal(query.modal as ModalTypeState);
  }, [query, handleModal]);

  return (
    <>
      {children?.({ active: modal, open: handleModal })}
      <Modal
        title={t((type === "terms" || type === "both") ? "terms-title" : "privacy-title", { ns: "terms" })}
        open={modal}
        onClose={() => {
          onClose?.();
          setType(undefined);
          toggleModal(false);
          navigate(redirect, { replace: true });
        }}
        config={{
          scroll: true
        }}
      >
        {() => (
          <>
            {(type === "terms" || type === "both") ? (
              <>
                <p className="modal__paragraph">
                  {t("terms-paragraph", { ns: "terms" })}
                </p>
                <h3 className="modal__subtitle">
                  {t("terms-subtitle1", { ns: "terms" })}
                </h3>
                <p className="modal__paragraph">
                  {t("terms-paragraph1", { ns: "terms" })}
                </p>
                <h3 className="modal__subtitle">
                  {t("terms-subtitle2", { ns: "terms" })}
                </h3>
                <p className="modal__paragraph">
                  {t("terms-paragraph2", { ns: "terms" })}
                  <span>
                    <span className="modal__paragraph-bold">
                      {t("terms-paragraph2-1-bold", { ns: "terms" })}
                    </span>
                    {t("terms-paragraph2-1", { ns: "terms" })}
                  </span>
                </p>
                <h3 className="modal__subtitle">
                  {t("terms-subtitle3", { ns: "terms" })}
                </h3>
                <p className="modal__paragraph">
                  {t("terms-paragraph3", { ns: "terms" })}
                </p>
              </>
            ) : null}
            {type === "both" ? (
              <h3 className="modal__subtitle">
                {t("privacy-title", { ns: "terms" })}
              </h3>
            ) : null}
            {(type === "privacy" || type === "both") ? (
              <p className="modal__paragraph">
                {t("privacy-text", { ns: "terms" })}
              </p>
            ) : null}
          </>
        )}
      </Modal>
    </>
  );
}

Terms.displayName = "ModalTerms";

export default Terms;
