import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { ObjStrCustom, Review } from "@typing/types";

import PhotoPeopleOne from "@images/photo-people-1.png";
import PhotoPeopleTwo from "@images/photo-people-3.png";
import PhotoPeopleThree from "@images/photo-people-2.png";

import { ContactForm } from "@containers";

export default function Contact() {
  const { t } = useTranslation("translation", { useSuspense: false });
  const [activeReview, setActiveReview] = useState("reviewTwo");

  const reviews: ObjStrCustom<Review> = {
    reviewOne: {
      text: t("review-one"),
      name: t("review-one-name"),
      profession: t("review-one-profession")
    },
    reviewTwo: {
      text: t("review-two"),
      name: t("review-two-name"),
      profession: t("review-two-profession")
    },
    reviewThree: {
      text: t("review-three"),
      name: t("review-three-name"),
      profession: t("review-three-profession")
    }
  };

  return (
    <ContactForm>
      <div className="contact__reviews">
        <article className="contact__review" data-active={activeReview}>
          <p className="contact__review-text">
            {reviews[activeReview].text}
          </p>
          <p className="contact__review-text contact__review-text--bold">
            {reviews[activeReview].name}
          </p>
          <p className="contact__review-text">
            {reviews[activeReview].profession}
          </p>
        </article>
        <div className="contact__reviews-people">
          <img
            src={PhotoPeopleOne}
            alt=""
            className="contact__people"
            data-active={activeReview === "reviewOne"}
            onClick={() => setActiveReview("reviewOne")}
          />
          <img
            src={PhotoPeopleTwo}
            alt=""
            className="contact__people"
            data-active={activeReview === "reviewTwo"}
            onClick={() => setActiveReview("reviewTwo")}
          />
          <img
            src={PhotoPeopleThree}
            alt=""
            className="contact__people"
            data-active={activeReview === "reviewThree"}
            onClick={() => setActiveReview("reviewThree")}
          />
        </div>
      </div>
    </ContactForm>
  );
}
