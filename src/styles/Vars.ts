import type { Media } from "@typing/styles";
import type { ObjStrCustom } from "@typing/types";

export const medias: ObjStrCustom<Media> = {
  phone: "max-width: 320px",
  "phone-mid": "max-width: 375px",
  "phone-big": "max-width: 425px",
  "phone-xbig": "max-width: 535px",
  "tablet-small": "max-width: 635px",
  "tablet-portrait": "max-width: 768px",
  "tablet-landscape": "max-width: 900px",
  desktop: "max-width: 1024px",
  "desktop-mid": "max-width: 1200px",
  "desktop-big": "max-width: 1440px",
  "desktop-xbig": "max-width: 1920px",
  "tv-small": "max-width: 2100px",
  "tv-4k": "max-width: 2560px"
};

export const other = {};
