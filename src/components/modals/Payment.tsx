import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import { showError } from "@utils";
import { usePaymentExternalService } from "@services";
import { useCartContext } from "@context";
import { useModal, useQuery } from "@hooks";

import type { ModalPaymentProps } from "@typing/proptypes";
import type { ModalPaymentState } from "@typing/interfaces";

import { ButtonGreen, Modal } from "@components";
import { PSP } from "@typing/enums";

export default function Payment({ onClose }: ModalPaymentProps) {
  const { t } = useTranslation("payment", { useSuspense: false });
  const { error: errorCart } = useCartContext();
  const { confirmOpenpayCard } = usePaymentExternalService();
  const navigate = useNavigate();
  const [modal, toggleModal] = useModal({ query: "(min-width: 0px)" });
  const query = useQuery();
  const linkRef = useRef<HTMLParagraphElement | null>(null);
  const [message, setMessage] = useState<ModalPaymentState>({
    title: t("payment-title-modal")
  });

  const handleCopyLink = async () => {
    try {
      const link = linkRef.current?.textContent;
      if (!link) throw new Error(t("no-link-to-copy"));
      await navigator.clipboard.writeText(link ?? "");

      swal({
        title: "Success",
        text: t("link-copied-success"),
        icon: "success",
        timer: 1500
      });
    } catch (error) {
      showError(error, t);
    }
  };

  const handleUpdateMessage = useCallback((messageToUpdate: Partial<ModalPaymentState>) => {
    setMessage((prevMessage) => ({
      ...prevMessage,
      ...messageToUpdate
    }));
  }, []);

  useEffect(() => {
    if (query?.orderSucceed) {
      handleUpdateMessage({
        title: t("payment-3dsecure"),
        action: "forestpayment"
      });
    }
    if (query?.status) {
      handleUpdateMessage({
        title: t("payment-mit-title"),
        subtitle: t("payment-text-modal")
      });
    }
    if (query?.psp === "openpay" && query?.id) {
      (async () => {
        try {
          const successOpenpay = await confirmOpenpayCard({ id: query.id });

          handleUpdateMessage({
            action: "openpay",
            text: t(`openpay-${successOpenpay}`)
          });

        } catch (error) {
          const onError = (text: string) => {
            handleUpdateMessage({
              action: "openpay",
              text
            });
          };
          showError(error, t, onError);
        } finally {
          navigate("/");
        }
      })();
    }

    if (query?.psp || query?.status || query?.orderSucceed || errorCart.psp_name) {
      toggleModal(true);
    }
    return () => {
      toggleModal(false);
    };
  }, [
    query,
    errorCart.psp_name,
    confirmOpenpayCard,
    handleUpdateMessage,
    toggleModal,
    navigate,
    t
  ]);

  return (
    <Modal
      title={message.title}
      open={modal}
      onClose={() => {
        onClose?.();
        toggleModal(false);
        navigate("/");
      }}
      config={{
        scroll: true,
        close: true,
        center: true
      }}
    >
      {() => (
        <div className="payment__modal">
          {message?.subtitle ? <h2 className="payment__modal-title">{message.subtitle}</h2> : null}
          <div className="payment__modal-content">
            {query?.status ? (
              <p className="payment__modal-paragraph">
                {query?.status === "Aprobado" ? `
                  Tu pago ha sido procesado con exito,
                  tu producto fue enviado al correo
                ` : null}
                {query?.status === "Rechazado" ? "Tu pago ha sido rechazado, revisa tus datos" : null}
                {(query?.status === "APPROVED" || query?.status === "REJECTED") ? query?.msg : null}
              </p>
            ) : null}
            {(message?.action === "MIT") ? (
              <>
                <p ref={linkRef} className="payment__modal-link">{message.link}</p>
                <ButtonGreen
                  onClick={handleCopyLink}
                  text={t("copy-link")}
                />
              </>
            ) : null}
            {(message?.action === "forestpayment") ? (
              <h2 className="payment__modal-title">
                {query?.orderSucceed === "1" ? "Tu pago ha sido procesado con exito" : null}
                {query?.orderSucceed === "0" ? "Tu pago ha sido rechazado" : null}
              </h2>
            ) : null}
            {(message?.action === "openpay") || (errorCart.psp_name === PSP.OPENPAY) ? (
              <p className="payment__modal-paragraph">
                {message.text ?? errorCart.message}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </Modal>
  );
}
