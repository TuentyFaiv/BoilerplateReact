import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { nextDay } from "date-fns";

import type { ClockState } from "@typing/types";

import "@stylesComponents/Clock.scss";

export default function Clock() {
  const { t } = useTranslation("clock", { useSuspense: false });
  const [offer, setOffer] = useState<ClockState>({
    future: nextDay(new Date(), 1).getTime(),
    now: new Date().getTime(),
    timeleft() {
      const currentState = this as ClockState;
      return currentState.future - currentState.now;
    },
    day() {
      const currentState = this as ClockState;
      return Math.floor(currentState.timeleft() / (1000 * 60 * 60 * 24));
    },
    hours() {
      const currentState = this as ClockState;
      return Math.floor((currentState.timeleft() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    },
    minutes() {
      const currentState = this as ClockState;
      return Math.floor((currentState.timeleft() % (1000 * 60 * 60)) / (1000 * 60));
    },
    seconds() {
      const currentState = this as ClockState;
      return Math.floor((currentState.timeleft() % (1000 * 60)) / 1000);
    }
  });

  useEffect(() => {
    const calculateDate = () => {
      setOffer((prevOffer) => ({
        ...prevOffer,
        now: new Date().getTime()
      }));
    };
    const interval = setInterval(calculateDate, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="clock">
      <div className="clock__content">
        <h2 className="clock__title">{t("clock-title")}</h2>
        <p className="clock__subtitle">{t("clock-subtitle")}</p>
        <div className="clock__counter">
          <article className="clock__item">
            <p className="clock__item-number">{offer.day()}</p>
            <p className="clock__item-title">{t("days")}</p>
          </article>
          <article className="clock__item">
            <p className="clock__item-number">{offer.hours()}</p>
            <p className="clock__item-title">{t("hours")}</p>
          </article>
          <article className="clock__item">
            <p className="clock__item-number">{offer.minutes()}</p>
            <p className="clock__item-title">{t("minutes")}</p>
          </article>
          <article className="clock__item">
            <p className="clock__item-number">{offer.seconds()}</p>
            <p className="clock__item-title">{t("seconds")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
