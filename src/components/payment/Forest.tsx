import { useCartContext } from "@context";
import { Method } from "@typing/enums";

import { AddressPayment, CardPayment } from "@components";

export default function Forest() {
  const { cart } = useCartContext();
  return (
    <>
      <AddressPayment />
      {cart.method === Method.CARD ? (
        <CardPayment />
      ) : null}
    </>
  );
}
