import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartContext } from "@context";
import { Actions, PSP } from "@typing/enums";

import type { ChoosePspProps } from "@typing/proptypes";

import { Radio } from "@components";

export default function Choose({ configuration, pspActive, values }: ChoosePspProps) {
  const { cart, dispatch } = useCartContext();
  const { t } = useTranslation("payment", { useSuspense: false });
  const [pspSelected, setPspSelected] = useState(false);

  const handleChoosePsp = (id: PSP) => {
    setPspSelected(true);
    dispatch({ type: Actions.SET_PSP, payload: id });
  };

  const hanleChange = () => {
    dispatch({ type: Actions.SET_PSP, payload: NaN });
    setPspSelected(false);
  };

  useEffect(() => {
    setPspSelected(!(Number.isNaN(cart.idPsp)));
  }, [cart.idPsp]);

  return (
    <>
      {pspSelected ? (
        <button onClick={hanleChange} type="button" className="payment__change-psp">
          {t("change-psp")}
        </button>
      ) : null}
      {!pspSelected ? configuration.map((psp) => (
        <Radio
          key={psp.pspId}
          id={`${psp.pspId}`}
          name="psp"
          value={`${psp.pspId}`}
          label={psp.name}
          checked={values.psp === psp.pspId.toString()}
          onSelect={() => handleChoosePsp(psp.pspId)}
        />
      )) : (
        <Radio
          id={`${pspActive.id}`}
          name="psp"
          value={`${pspActive.id}`}
          label={pspActive.name}
          checked={values.psp === pspActive.id.toString()}
        />
      )}
    </>
  );
}
