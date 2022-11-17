import { useTranslation } from "react-i18next";
import { withAuth } from "@hoc";
import { useAppContext, useCartContext } from "@context";
import { useAuthentication } from "@hooks";
import { Actions } from "@typing/enums";

import type { CardProductProps } from "@typing/proptypes";

import { ButtonGreen, ExchangeAmount } from "@components";

function Product({ title, cover, price, ...props }: CardProductProps) {
  const { dispatch } = useCartContext();
  const { global: { user } } = useAppContext();
  const { t } = useTranslation("translation", { useSuspense: false });
  const { redirect } = useAuthentication(props.auth);

  const handleAddToCart = () => {
    const payload = {
      amount: price,
      description: title
    };

    dispatch({ type: Actions.ADD_TO_CART, payload });
    redirect(`/payment/${user.tpId}`);
  };

  return (
    <article className="meta__item">
      <h4 className="meta__item-title">{title}</h4>
      <img
        src={cover}
        alt={title}
        className="meta__item-image"
      />
      {props.list.map((item, index) => (
        <span key={`${index + 0}`} className="meta__item-wrapper">
          <p className="meta__item-text">
            {t(item.bold)}
            {item.light && (
              <span className="meta__item-text meta__item-text--light">
                {item.pairs ? `${item.pairs} ` : null}
                {t(item.light)}
              </span>
            )}
          </p>
        </span>
      ))}
      <h5 className="meta__item-price">
        {props.country === "MX" ? <ExchangeAmount amount={price} currency="MXN" /> : `$${price} USD`}
      </h5>
      <ButtonGreen
        onClick={handleAddToCart}
        text={t("button-buy")}
      />
    </article>
  );
}

Product.displayName = "CardProduct";

export default withAuth(Product, "component");
