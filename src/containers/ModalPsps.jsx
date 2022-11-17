/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import swal from "sweetalert";
import config from "@config";
import { DEFAULT_PAYMENT_VALUES, PaymentSchema } from "@schemas";
import { exchangeAmount } from "@services";
import { useAppContext } from "@context";
import { useModal, useQuery } from "@hooks";

import "@stylesPages/Payment.scss";

import IconArrow from "@icons/icon-arrow.svg";
import OpenpayLogo from "@images/openpay-logo.png";

import {
  OpenPay,
  ConektaCheckout,
  Address,
  Modal,
  Input,
  Checkbox,
  Radio,
  Select
} from "@components";

export default function ModalPsps({ openModal, onClose, setLoader, ...props }) {
  const { t } = useTranslation("psps", { useSuspense: false });
  const { global: { user, sessionId, openPay } } = useAppContext();
  const query = useQuery();
  const navigate = useNavigate();
  const [modal, toggleModal] = useModal();
  const [modalError, toggleModalError] = useModal();
  const [disabledPay, setDisablePay] = useState(false);
  const [errorPsp, setErrorPsp] = useState({
    code: 0,
    psp_code: 0,
    psp_name: "",
    description: ""
  });
  const [configuration, setConfiguration] = useState([]);
  const [dataPayu, setDataPayu] = useState({});
  const date = new Date();
  const foo = date.setDate(date.getDate() + 10);
  const newDate = new Date(foo);
  const [modal2, setModal2] = useState({ title: "", subtitle: "", action: "", data: "" });
  const [deviceSessionOpenPay, setDeviceSessionOpenPay] = useState("");
  const [pspActive, setPspActive] = useState("");
  const [pspActiveObj, setPspActiveObj] = useState({});

  const { tpId } = user;

  const formTranslations = {
    required: t("required", { ns: "formik" }),
    requiredTerms: t("required-terms", { ns: "formik" })
  };

  const generateTransaction = async ({ params, values }) => {
    try {
      const request = await fetch(`${config.api_local}/api/transaction.php`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const { result, data, error } = await request.json();
      if (!result) throw new Error(error);

      if (values.paymentMethod === "card" && values.pspId === "68") {
        // const a = document.createElement("a");
        // a.setAttribute("href", data);
        // // a.setAttribute("target", "_blank");
        // a.click();
        console.log("result correcto");
        setModal2({ title: "Link de pago MIT", subtitle: "", action: "MIT", data });
        toggleModal();
      } else if (values.paymentMethod === "card" && values.pspId === "96" && result === 2) {
        swal({
          title: "Es necesario autenticación 3DSecure",
          text: error,
          icon: "info",
          button: "ok"
        }).then((value) => {
          const a = document.createElement("a");
          a.setAttribute("href", data);
          a.click();
        });
      } else if (values.paymentMethod === "card" && values.pspId !== "70") {
        swal("Success", "Pago realizado con exito", "success");
      } else if (values.paymentMethod === "cash" && values.pspId === "67") {
        console.log(data);
      } else if (values.pspId === "95") {
        const a = document.createElement("a");
        a.setAttribute("href", data);
        a.click();
      } else {
        const a = document.createElement("a");
        a.setAttribute("href", data);
        a.setAttribute("target", "_blank");
        a.click();
      }
    } catch (err) {
      swal("Error", err.message, "error");
    } finally {
      setLoader(false);
      setDisablePay(false);
    }
  };

  const handleErrorOpenpay = async (error) => {
    const { data } = await error;
    const errorDescription = (data.error_code === 3003 || data.error_code === 3004)
      ? t("cardDeclined") : data.description;

    setErrorPsp((prevError) => ({
      ...prevError,
      code: data.http_code,
      psp_code: data.error_code,
      psp_name: "Openpay",
      description: errorDescription
    }));
    setLoader(false);
    setDisablePay(false);
    toggleModalError();
  };

  const handleSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      setLoader(true);
      setDisablePay(true);
      onClose();
      let params = {
        tp_id: tpId,
        original_currency: "USD",
        original_amount: values.amount,
        psp: values.pspId,
        amount: values.exchangeAmount,
        currency: values.currency,
        description: values.descriptionPsp,
        tokenCard: values.conektaCheckout,
        action: values.paymentMethod,
        session: sessionId
      };

      // if ((values.pspId === "77" || values.pspId === "80") && params.original_amount > 250) {
      //   swal({
      //     title: "Error",
      //     text: "Solo se pueden hacer compras con Feenicia hasta de $250 USD",
      //     icon: "error"
      //   });
      //   setLoader(false);
      //   setDisablePay(false);
      //   actions.resetForm({ values: DEFAULT_PAYMENT_VALUES });
      //   return;
      // }

      if (values.pspId === "95") {
        params = {
          ...params,
          document: values.userDocumentNumber
        };
      }

      if (values.pspId === "76" && params.amount > 10000 && ["paycash", "oxxo"].includes(params.action)) {
        swal({
          title: "Error",
          text: `Solo se pueden hacer compras con ${params.action} hasta de $10,000 MXN`,
          icon: "error"
        });
        setLoader(false);
        setDisablePay(false);
        actions.resetForm({ values: DEFAULT_PAYMENT_VALUES });
        return;
      }

      if ((values.pspId === "77" || values.pspId === "80") && values.paymentMethod === "card") {
        params = {
          ...params,
          pan: values.pan,
          holderName: values.holderName,
          cvv: values.cvv,
          expDate: values.expirationYear[2] + values.expirationYear[3] + values.expirationMonth
        };
      }

      if (values.pspId === "70" && values.paymentMethod === "card") {
        openPay.token.create({
          card_number: values.cardNumber,
          holder_name: values.holderName,
          expiration_year: values.expirationYear,
          expiration_month: values.expirationMonth,
          cvv2: values.cvv
        }, async (success) => {
          const { data } = await success;
          await generateTransaction({
            params: {
              ...params,
              card: data.card,
              token_card: data.id,
              device_session_id: deviceSessionOpenPay
            },
            values
          });
        }, handleErrorOpenpay);
      }

      if (values.pspId === "65") {
        const address = {
          street1: values.street1,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          birthdate: `${values.birthdateYear}-${values.birthdateMonth}-${values.birthdateDay}` // YYYY-MM-DD
        };
        if (["SPEI", "BANK_REFERENCED", "ITAU", "PIX", "PSE", "COBRO_EXPRESS", "PAGOFACIL", "RAPIPAGO",
          "MULTICAJA", "BALOTO", "EFECTY", "OTHERS_CASH"]
          .includes(values.paymentMethod)) {
          params = {
            ...params,
            action: "cash",
            userDocumentNumber: values.userDocumentNumber,
            data: {
              ...address,
              expirationDate: newDate.toISOString(),
              paymentMethod: values.paymentMethod,
              sessionId: dataPayu.sessionId
            }
          };
        } else if (values.paymentMethod === "cash") {
          params = {
            ...params,
            userDocumentNumber: values.userDocumentNumber,
            data: {
              ...address,
              expirationDate: newDate.toISOString(),
              paymentMethod: values.cashMethod,
              sessionId: dataPayu.sessionId
            }
          };
        } else if (values.paymentMethod === "card") {
          params = {
            ...params,
            userDocumentNumber: values.userDocumentNumber,
            data: {
              ...address,
              cardNumber: values.cardNumber,
              cvc: values.cvc,
              expirationDate: `${values.expirationYear}/${values.expirationMonth}`,
              expirationMonth: values.expirationMonth,
              expirationYear: values.expirationYear,
              payerAddress: values.payerAddress,
              payerFirstName: values.payerFirstName,
              payerLastName: values.payerLastName,
              payerPhone: values.payerPhone,
              paymentMethod: values.paymentCardMethod,
              sessionId: dataPayu.sessionId,
              typeCard: values.typeCard
            }
          };
        }
      }

      if (values.pspId === "67") {
        params = {
          ...params,
          data: {}
        };
      }

      if (values.pspId === "96") {
        const { address, city, zip, cardNum, cvv, expMont, expYear } = values;
        params = {
          ...params,
          address,
          city,
          zip,
          cardNum,
          cvv,
          expMont,
          expYear
        };
      }
      if (values.pspId !== "70" || values.paymentMethod !== "card") {
        await generateTransaction({ params, values });
      }
    } catch (error) {
      swal("Error!", error.message, "error");
    } finally {
      actions.resetForm({ values: DEFAULT_PAYMENT_VALUES });
    }
  };

  const handleLink = () => {
    const copyText = document.getElementById("inputLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    swal({
      title: "Success",
      text: "Link copiado correctamente",
      icon: "success",
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false
    });
  };

  useEffect(() => {
    const getConfig = async () => {
      const response = await fetch(`${config.api_local}/api/configuration.php?tpId=${tpId}`);
      const configPsp = await response.json();
      if (configPsp) {
        setConfiguration(configPsp);
      }
    };
    getConfig();
  }, [tpId]);

  useEffect(() => {
    const antifraud = async () => {
      /* antifraude para PayU */
      const params = {
        action: "device",
        data: {
          sessionId: sessionId
        }
      };
      const response = await fetch("https://webservicesnt.org/phpPunkaso/PayU/payu.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const { result, data: deviceSessionId, error } = await response.json();
      setDataPayu({
        sessionId: deviceSessionId
      });
      const script = document.createElement("script");
      script.src = `https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200`;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };
    antifraud();
  }, [sessionId]);

  useEffect(() => {
    if (query?.orderSucceed) {
      setModal2({
        title: "Mensage de respuesta 3DSecure:",
        action: "forestpayment"
      });
      toggleModal();
    }
    if (query?.status) {
      setModal2({
        title: "Respuesta de pago MIT",
        subtitle: "Mensage de respuesta:"
      });
      toggleModal();
    }
    if (query?.psp === "openpay") {
      (async () => {
        try {
          const body = {
            id: query?.id
          };
          const request = await fetch(`${config.api}/payments/openpay/confirm`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
          const { result, data, error } = await request.json();
          if (!result) throw new Error(data.error_message);

          swal("Success", t(`openpay-${data.status}`), "success").then(() => {
            navigate("/");
          });
        } catch (error) {
          swal("Error", error.message, "error").then(() => {
            navigate("/");
          });
        }
      })();
    }
    // if (modal2.action === "MIT") toggleModal();
  }, [query, toggleModal, t, navigate]);

  useEffect(() => {
    if (openPay) {
      const deviceSessionId = openPay.deviceData.setup();
      setDeviceSessionOpenPay(deviceSessionId);
    }
  }, [openPay]);

  return (
    <>
      <Modal
        title={modal2.title}
        open={modal}
        onClose={toggleModal}
        config={{
          scroll: true
        }}
      >
        {() => (
          <div className="modal__container">
            <h2 className="modal__title">{ modal2.subtitle }</h2>
            <div className="modal__content">
              {
                query?.status && (
                  <p className="modal__paragraph">
                    { query?.status === "Aprobado" ? `
                        Tu pago ha sido procesado con exito, tu producto fue enviado al correo
                      ` : null }
                    { query?.status === "Rechazado" ? `
                        Tu pago ha sido rechazado, revisa tus datos` : null }
                  </p>
                )
              }
              {
                (modal2.action === "MIT") && (
                <div className="modal__form">
                  <input
                    type="text"
                    value={modal2.data}
                    className="input__input"
                    id="inputLink"
                    style={{ textAlign: "center" }}
                  />
                  <button type="button" onClick={handleLink} className="modal__button">Copiar link</button>
                </div>
                )
              }
              {
                (modal2.action === "forestpayment") && (
                <div className="modal__form">
                  <h2 style={{ textAlign: "center" }}>
                    { query?.orderSucceed === "1" ? `
                       Tu pago ha sido procesado con exito
                     ` : null }
                    { query?.orderSucceed === "0" ? `
                         Tu pago ha sido rechazado` : null }
                  </h2>
                </div>
                )
              }
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title={t("errors-title")}
        open={modalError}
        onClose={toggleModalError}
        config={{
          error: true,
          close: true,
          blue: true
        }}
      >
        {() => (
          <div>
            {errorPsp.psp_name === "Openpay" && (
              <p className="modal__paragraph">
                {errorPsp.description}
              </p>
            )}
          </div>
        )}
      </Modal>
      <Modal
        title={t("payment-method")}
        open={openModal}
        onClose={onClose}
        config={{
          scroll: true,
          close: true,
          blue: true,
          psp: true
        }}
      >
        {() => (
          <Formik
            initialValues={{
              ...DEFAULT_PAYMENT_VALUES,
              amount: props.amount,
              exchangeAmount: props.amount,
              descriptionPsp: props.descriptionPsp
            }}
            validationSchema={PaymentSchema({
              boot: formTranslations,
              minAmout: 0, // Chage for configurations
              id: pspActive
              // psp: pspActiveObj
            })}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="modal__form" id="contact">
                <div className="modal__form-content">
                  <div
                    className="modal__form-options"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    {(configuration.filter((item) => item.available).length > 0)
                      ? configuration.filter((item) => item.available).map((psp) => (
                        <Radio
                          key={psp.name}
                          id={psp.name}
                          name="pspId"
                          value={psp.id}
                          label={psp.name}
                          checked={values.pspId === psp.id.toString()}
                          onSelect={() => {
                            setPspActive(`${psp.id}`);
                            setPspActiveObj(psp);
                          }}
                        />
                      )) : (
                        <p className="modal__label-text">
                          {t("no-has-psps", { ns: "swal" })}
                        </p>
                      )}
                  </div>
                  <div className="modal__form-side">
                    {values.pspId === "64" && ( // ConektaID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                        {
                          values.paymentMethod === "card" && (
                            <ConektaCheckout
                              setFieldValue={setFieldValue}
                            />
                          )
                        }
                      </>
                    )}
                    {values.pspId === "65" && ( // PayU_ID
                      <>
                        <Input
                          label="Documento de identidad"
                          name="userDocumentNumber"
                          type="text"
                          placeholder={pspActiveObj?.document[user.country]?.placeHolder ?? t("document-identity")}
                          required
                        />
                        <Select
                          name="currency"
                          options={[
                            { value: "", label: "Selecciona moneda" },
                            ...configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                          ]}
                          onChange={async (e) => {
                            const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                            setFieldValue("currency", newCurrency);
                            const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                            setFieldValue("exchangeAmount", amount);
                          }}
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                        {values.paymentMethod === "cash" ? (
                          <Select
                            name="cashMethod"
                            options={
                              configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].efectivo[user.country]
                                ? [
                                  { value: "", label: "Selecciona el medio de pago" },
                                  ...configuration.filter(
                                    (item) => item.pspId === parseInt(values.pspId, 10)
                                  )[0].efectivo[user.country]
                                ]
                                : [{ value: "", label: "No hay medios de pago de pago para tu pais" }]
                            }
                          />
                        ) : null}
                        {values.paymentMethod === "card" ? (
                          <>
                            <div className="modal__form-selects">
                              <Select
                                name="typeCard"
                                options={[
                                  { label: "Selecciona tipo de tarjeta", value: "" },
                                  { label: "Crédito", value: "creditCard" },
                                  { label: "Débito", value: "debitCard" }
                                ]}
                              />
                              <Select
                                name="paymentCardMethod"
                                options={
                                  configuration.filter(
                                    (item) => item.pspId === parseInt(values.pspId, 10)
                                  )[0].cards[user.country][values.typeCard]
                                    ? [
                                      { value: "", label: "Selecciona la tarjeta" },
                                      ...configuration.filter(
                                        (item) => item.pspId === parseInt(values.pspId, 10)
                                      )[0].cards[user.country][values.typeCard]
                                    ]
                                    : [{ value: "", label: "No hay opciones para este tipo de tarjeta" }]
                                }
                              />
                            </div>
                            <Input
                              label="Numero de tarjeta"
                              name="cardNumber"
                              type="text"
                              placeholder="Numero de la tarjeta"
                              required
                            />
                            <Select
                              name="expirationMonth"
                              options={[
                                { value: "", label: "Mes de expiración", disabled: true, selected: true },
                                { value: "01", label: "01" },
                                { value: "02", label: "02" },
                                { value: "03", label: "03" },
                                { value: "04", label: "04" },
                                { value: "05", label: "05" },
                                { value: "06", label: "06" },
                                { value: "07", label: "07" },
                                { value: "08", label: "08" },
                                { value: "09", label: "09" },
                                { value: "10", label: "10" },
                                { value: "11", label: "11" },
                                { value: "12", label: "12" }
                              ]}
                              required
                            />
                            <Select
                              name="expirationYear"
                              options={[
                                { value: "", label: "Año de expiración", disabled: true, selected: true },
                                { value: "2022", label: "2022" },
                                { value: "2023", label: "2023" },
                                { value: "2024", label: "2024" },
                                { value: "2025", label: "2025" },
                                { value: "2026", label: "2026" },
                                { value: "2027", label: "2027" },
                                { value: "2028", label: "2028" },
                                { value: "2029", label: "2029" },
                                { value: "2030", label: "2030" },
                                { value: "2031", label: "2031" },
                                { value: "2032", label: "2032" },
                                { value: "2033", label: "2033" },
                                { value: "2034", label: "2034" },
                                { value: "2035", label: "2035" },
                                { value: "2036", label: "2036" },
                                { value: "2037", label: "2037" },
                                { value: "2038", label: "2038" },
                                { value: "2039", label: "2039" },
                                { value: "2040", label: "2040" }
                              ]}
                              required
                            />
                            <Input
                              label="CVC"
                              name="cvc"
                              type="text"
                              placeholder="CVC"
                              required
                            />
                            <Input
                              label="Nombre"
                              name="payerFirstName"
                              type="text"
                              placeholder="Nombre"
                              required
                            />
                            <Input
                              label="Apellido"
                              name="payerLastName"
                              type="text"
                              placeholder="Apellido"
                              required
                            />
                            <Input
                              label="Correo"
                              name="payerAddress"
                              type="text"
                              placeholder="Correo electronico"
                              required
                            />
                            <Input
                              label="Numero de telefono"
                              name="payerPhone"
                              type="text"
                              placeholder="Numero de telefono"
                              required
                            />
                          </>
                        ) : null}
                        <Address />
                      </>
                    )}
                    {values.pspId === "67" && ( // Paycips_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                      </>
                    )}
                    {values.pspId === "68" && ( // MIT_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                      </>
                    )}
                    {values.pspId === "70" && ( // OpenPay_ID
                      <OpenPay
                        configuration={configuration}
                        country={user.country}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    )}
                    {values.pspId === "76" && ( // Banwire_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                      </>
                    )}
                    {(values.pspId === "77" || values.pspId === "80") && ( // Feenicia_ID || FeeniciaN_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                        {
                          values.paymentMethod === "card" && (
                            <>
                              <Input
                                label="Numero de tarjeta"
                                name="pan"
                                type="text"
                                placeholder="Numero de la tarjeta"
                                required
                              />
                              <Select
                                name="expirationMonth"
                                options={[
                                  { value: "", label: "Mes de expiración", disabled: true, selected: true },
                                  { value: "01", label: "01" },
                                  { value: "02", label: "02" },
                                  { value: "03", label: "03" },
                                  { value: "04", label: "04" },
                                  { value: "05", label: "05" },
                                  { value: "06", label: "06" },
                                  { value: "07", label: "07" },
                                  { value: "08", label: "08" },
                                  { value: "09", label: "09" },
                                  { value: "10", label: "10" },
                                  { value: "11", label: "11" },
                                  { value: "12", label: "12" }
                                ]}
                                required
                              />
                              <Select
                                name="expirationYear"
                                options={[
                                  { value: "", label: "Año de expiración", disabled: true, selected: true },
                                  { value: "2022", label: "2022" },
                                  { value: "2023", label: "2023" },
                                  { value: "2024", label: "2024" },
                                  { value: "2025", label: "2025" },
                                  { value: "2026", label: "2026" },
                                  { value: "2027", label: "2027" },
                                  { value: "2028", label: "2028" },
                                  { value: "2029", label: "2029" },
                                  { value: "2030", label: "2030" },
                                  { value: "2031", label: "2031" },
                                  { value: "2032", label: "2032" },
                                  { value: "2033", label: "2033" },
                                  { value: "2034", label: "2034" },
                                  { value: "2035", label: "2035" },
                                  { value: "2036", label: "2036" },
                                  { value: "2037", label: "2037" },
                                  { value: "2038", label: "2038" },
                                  { value: "2039", label: "2039" },
                                  { value: "2040", label: "2040" }
                                ]}
                                required
                              />
                              <Input
                                label="CVC"
                                name="cvv"
                                type="text"
                                placeholder="CVC"
                                required
                              />
                              <Input
                                label="Nombre Completo"
                                name="holderName"
                                type="text"
                                placeholder="Nombre"
                                required
                              />
                              <Input
                                label="Correo"
                                name="email"
                                type="text"
                                placeholder="Correo electronico"
                                required
                              />
                            </>
                          )
                        }
                      </>
                    )}
                    {values.pspId === "86" && ( // Flow_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                        {
                          values.paymentMethod === "card" && (
                            <ConektaCheckout
                              setFieldValue={setFieldValue}
                            />
                          )
                        }
                      </>
                    )}
                    {values.pspId === "82" && ( // PayCash_ID
                      <>
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const { amount, currency } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                      </>
                    )}
                    {values.pspId === "95" && ( // DLocal_ID
                      <>
                        <Input
                          label="Documento de identidad"
                          name="userDocumentNumber"
                          type="text"
                          placeholder={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].document[user.country].placeHolder
                          }
                          minLength={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].document[user.country].minLength
                          }
                          maxLength={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].document[user.country].maxLength
                          }
                          required
                        />
                        <Select
                          name="currency"
                          options={
                            [
                              { value: "", label: "Selecciona moneda" },
                              ...configuration.filter(
                                (item) => item.pspId === parseInt(values.pspId, 10)
                              )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                            ]
                          }
                          onChange={
                            async (e) => {
                              const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                              setFieldValue("currency", newCurrency);
                              const {
                                amount,
                                currency
                              } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                              setFieldValue("exchangeAmount", amount);
                            }
                          }
                        />
                      </>
                    )}
                    {values.pspId === "96" && ( // Forest_ID
                      <>
                        <Input
                          label="direccion"
                          name="address"
                          type="text"
                          placeholder="Direccion (calle, numero)"
                        />
                        <Input
                          label="ciudad"
                          name="city"
                          type="text"
                          placeholder="Ciudad"
                        />
                        <Input
                          label="codigo postal"
                          name="zip"
                          type="text"
                          placeholder="Codigo postal"
                        />
                        <Select
                          name="currency"
                          options={
                              [
                                { value: "", label: "Selecciona moneda" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].currency[user.country].map((currency) => ({ value: currency, label: currency }))
                              ]
                            }
                          onChange={
                              async (e) => {
                                const newCurrency = e.target.value !== "" ? e.target.value : "USD";
                                setFieldValue("currency", newCurrency);
                                const {
                                  amount,
                                  currency
                                } = await exchangeAmount({ amount: values.amount, currency: newCurrency });
                                setFieldValue("exchangeAmount", amount);
                              }
                            }
                        />
                        <Select
                          name="paymentMethod"
                          options={
                            configuration.filter(
                              (item) => item.pspId === parseInt(values.pspId, 10)
                            )[0].method[user.country][values.currency]
                              ? [{ value: "", label: "Selecciona metodo de pago" },
                                ...configuration.filter(
                                  (item) => item.pspId === parseInt(values.pspId, 10)
                                )[0].method[user.country][values.currency]
                              ]
                              : [{ value: "", label: "No hay metodos de pago para esa moneda" }]
                          }
                        />
                        {values.paymentMethod === "card" && (
                          <>
                            <Input
                              label="numero de tarjeta"
                              name="cardNum"
                              type="text"
                              placeholder="Numero de tarjeta"
                            />
                            <div className="modal__form-selects">
                              <Select
                                name="expMont"
                                options={[
                                  { value: "", label: "Mes de expiración", disabled: true, selected: true },
                                  { value: "01", label: "01" },
                                  { value: "02", label: "02" },
                                  { value: "03", label: "03" },
                                  { value: "04", label: "04" },
                                  { value: "05", label: "05" },
                                  { value: "06", label: "06" },
                                  { value: "07", label: "07" },
                                  { value: "08", label: "08" },
                                  { value: "09", label: "09" },
                                  { value: "10", label: "10" },
                                  { value: "11", label: "11" },
                                  { value: "12", label: "12" }
                                ]}
                                required
                              />
                              <Select
                                name="expYear"
                                options={[
                                  { value: "", label: "Año de expiración", disabled: true, selected: true },
                                  { value: "2022", label: "2022" },
                                  { value: "2023", label: "2023" },
                                  { value: "2024", label: "2024" },
                                  { value: "2025", label: "2025" },
                                  { value: "2026", label: "2026" },
                                  { value: "2027", label: "2027" },
                                  { value: "2028", label: "2028" },
                                  { value: "2029", label: "2029" },
                                  { value: "2030", label: "2030" },
                                  { value: "2031", label: "2031" },
                                  { value: "2032", label: "2032" },
                                  { value: "2033", label: "2033" },
                                  { value: "2034", label: "2034" },
                                  { value: "2035", label: "2035" },
                                  { value: "2036", label: "2036" },
                                  { value: "2037", label: "2037" },
                                  { value: "2038", label: "2038" },
                                  { value: "2039", label: "2039" },
                                  { value: "2040", label: "2040" }
                                ]}
                                required
                              />
                            </div>
                            <Input
                              label="cvv"
                              name="cvv"
                              type="text"
                              placeholder="codigo de seguridad (cvv)"
                            />
                          </>
                        )}
                      </>
                    )}
                    <Input
                      label={t("descriptionPsp")}
                      name="descriptionPsp"
                      type="text"
                      placeholder={t("descriptionPsp")}
                      readOnly
                    />
                    <Input
                      label={t("amount")}
                      name="amount"
                      type="number"
                      placeholder={t("amount")}
                      readOnly
                    />
                  </div>
                  <div className="modal__form-side">
                    <article className="modal__form-side-card">
                      <p className="modal__form-card-title">
                        {values.descriptionPsp}
                      </p>
                      {values.pspId === "70" ? <img src={OpenpayLogo} alt="Openpay" className="payment__openpay-logo" /> : null}
                      <p className="modal__form-price">
                        <span className="modal__form-price-span">
                          {t("total")}
                        </span>
                        <span className="modal__form-price-span">
                          {`${values.exchangeAmount} ${values.currency === "" ? "USD" : values.currency}`}
                        </span>
                      </p>
                    </article>
                    {pspActive === "76" ? ( // Banwire_ID
                      <Checkbox
                        checked={values.terms}
                        name="terms"
                        label={t("terms-legend", { ns: "formik" })}
                        payment
                      >
                        <a
                          className="modal__form-link modal__form-link--terms"
                          href={`${config.api_local}?modal=terms `}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("terms-legend2", { ns: "formik" })}
                        </a>
                      </Checkbox>
                    ) : null}
                    {values.pspId === "70" ? ( // OpenPay_ID
                      <a
                        className="modal__form-link"
                        href={`${config.api_local}?modal=terms `}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("terms", { ns: "header" })}
                      </a>
                    ) : null}
                    {values.pspId === "70" ? ( // OpenPay_ID
                      <span className="payment__openpay-address">
                        Florencia 57, 5532082413, support@traderbotic.com
                      </span>
                    ) : null}
                  </div>
                </div>
                {(configuration.length > 0 && !(values.pspId === "64" && values.paymentMethod === "card")) ? (
                  <button
                    type="submit"
                    className="modal__form-submit"
                    disabled={isSubmitting || disabledPay}
                  >
                    <span>{t("psp-submit")}</span>
                    <img
                      src={IconArrow}
                      alt=""
                      className="modal__form-submit-icon"
                    />
                  </button>
                ) : null}
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
}
