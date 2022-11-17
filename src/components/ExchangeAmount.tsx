import { useEffect, useState } from "react";
import { useExchangeService } from "@services";

import type { ExchangeAmountProps } from "@typing/proptypes";

const ExchangeAmount = ({ amount, currency }: ExchangeAmountProps) => {
  const [exchage, setExchange] = useState(0);
  const { changeAmount } = useExchangeService();

  useEffect(() => {
    (async () => {
      const service = await changeAmount({ amount, currency });
      setExchange(service.amount);
    })();
  }, [changeAmount, amount, currency]);

  return (
    <>
      {`$ ${exchage} ${currency}`}
      <br />
      <span>{`$ ${amount} USD`}</span>
    </>
  );
};

export default ExchangeAmount;
