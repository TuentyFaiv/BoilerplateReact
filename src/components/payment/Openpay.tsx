import { useTranslation } from "react-i18next";
import { useCartContext } from "@context";
import { Method } from "@typing/enums";

import OpenPayCards from "@icons/openpay-cards.svg";
import BBVA from "@icons/BBVA.svg";
import Santander from "@icons/Santander.svg";
import HSBC from "@icons/HSBC.svg";
import Scotiabank from "@icons/Scotiabank.svg";
import IMBURSA from "@icons/IMBURSA.svg";
import IXE from "@icons/IXE.svg";
import Security from "@icons/security-openpay.svg";
import OpenpayLogo from "@images/openpay-logo.png";

import { CardPayment } from "@components";

const Openpay = () => {
  const { cart } = useCartContext();
  const { t } = useTranslation("payment", { useSuspense: false });

  return (cart.method === Method.CARD ? (
    <>
      <p className="payment__subtitle">{t("credit-card")}</p>
      <div className="payment__brands">
        <img src={OpenPayCards} alt={t("credit-card")} className="payment__brands-image" />
      </div>
      <p className="payment__subtitle">{t("debit-card")}</p>
      <div className="payment__brands">
        <img src={BBVA} alt={`${t("debit-card")} BBVA`} className="payment__brand" />
        <img src={Santander} alt={`${t("debit-card")} Santander`} className="payment__brand" />
        <img src={HSBC} alt={`${t("debit-card")} HSBC`} className="payment__brand" />
        <img src={Scotiabank} alt={`${t("debit-card")} Scotiabank`} className="payment__brand" />
        <img src={IMBURSA} alt={`${t("debit-card")} IMBURSA`} className="payment__brand" />
        <img src={IXE} alt={`${t("debit-card")} IXE`} className="payment__brand" />
      </div>
      <CardPayment holder="full" icon />
      <p className="payment__text">{t("transactions-by")}</p>
      <div className="payment__brands">
        <img src={OpenpayLogo} alt="Openpay" className="payment__openpay-logo" />
        <div className="payment__security">
          <img src={Security} alt="Openpay" className="payment__security-icon" />
          <p className="payment__text payment__text">{t("security-openpay")}</p>
        </div>
      </div>
    </>
  ) : null);
};

export default Openpay;
