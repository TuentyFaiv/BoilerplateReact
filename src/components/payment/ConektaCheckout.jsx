import { useEffect } from "react";
import swal from "sweetalert";

const ConektaCheckout = ({ setFieldValue }) => {

  const checkoutConekta = (requestId) => {
    window.ConektaCheckoutComponents.Card({
      targetIFrame: "#conektaIframeContainer",
      allowTokenization: true,
      checkoutRequestId: requestId, // Checkout request ID, es el mismo ID generado en el paso 1
      publicKey: "key_QQRBZ56yv84YZeKo1zNVq7Q",
      options: {
        styles: {
          inputType: "rounded",
          buttonType: "rounded",
          states: {
            empty: {
              borderColor: "FFAA00"
            },
            invalid: {
              borderColor: "#FF0000"
            },
            valid: {
              borderColor: "#00BB2D"
            }
          }
        },
        languaje: "es",
        button: {
          colorText: "#fff",
          backgroundColor: "#301007",
          text: "Agregar Tarjeta***"
        },
        iframe: {
          colorText: "#65A39B",
          backgroundColor: "#FFFFFF"
        }
      },
      onCreateTokenSucceeded(token) {
        setFieldValue("conektaCheckout", token.id);
        // console.log(token.id);
        document.querySelector("#btn-submit").click();
      },
      onCreateTokenError(error) {
        swal({
          title: "Error",
          text: error?.message_to_purchaser,
          icon: "error",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    })();
  };

  const conekta = async () => {
    /* checkout.min.js */
    const conektaCheckout = document.querySelector("script#conekta");
    if (!conektaCheckout) {
      const script = document.createElement("script");
      script.src = "https://pay.conekta.com/v1.0/js/conekta-checkout.min.js";
      script.id = "conekta";
      document.head.appendChild(script);
    }
  };

  const getToken = async () => {
    const request = await fetch("https://webservicesnt.org/phpPunkaso/Conekta/index.php", {
      method: "POST",
      body: JSON.stringify({
        brand: "Traderbotic",
        action: "token"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { result, data, error } = await request.json();
    if (result) {
      checkoutConekta(data);
    } else {
      swal({
        title: "Error",
        text: error,
        icon: "error",
        timer: 1500,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  };

  useEffect(() => {
    conekta();
    getToken();
  }, []);

  return (
    <>
      <button type="submit" style={{ visibility: "hidden" }} id="btn-submit">submit</button>
      <div
        name="tokenConekta"
        style={{ height: "550px" }}
        id="conektaIframeContainer"
      >
      </div>
    </>
  );
};

export default ConektaCheckout;
