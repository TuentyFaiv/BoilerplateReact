import { css } from "styled-components";

import type { BackgroundImage, Content, Flex, ForSize, Grid, Text } from "@typing/styles";

import { medias } from "./Vars";

export const forsize = (size: ForSize, content: string) => (
  medias[size] ? css`
    @media screen and (${medias[size]}) {
      ${content}
    }
  ` : ""
);

export const flex = ({ justify, gap, align = "center" }: Flex) => {
  const justifyContent = justify ? `justify-content: ${justify};` : "";
  const gapContent = gap ? `gap: ${gap};` : "";
  const alignContent = align ? `align-items: ${align};` : "";

  return css`
    display: flex;
    ${justifyContent}
    ${gapContent}
    ${alignContent}
  `;
};

export const grid = ({ columns, gap }: Grid) => {
  const columnsContent = columns ? `grid-template-columns: ${columns};` : "";
  const gapContent = gap ? `gap: ${gap};` : "";

  return css`
    display: grid;
    ${columnsContent}
    ${gapContent}
  `;
};

export const text = ({ size, weight, line, align }: Text) => {
  const fontWeight = weight ? `font-weight: ${weight};` : "";
  const lineHeightContent = line ? `line-height: ${line}rem;` : "";
  const textAlign = align ? `text-align: ${align}rem;` : "";

  return css`
    font-style: normal;
    font-size: ${size};
    ${fontWeight}
    ${lineHeightContent}
    ${textAlign}
  `;
};

export const content = ({ width = "1500px", padding = "0 16px" }: Content) => {
  const maxWidth = width ? `max-width: ${width};` : "";
  const paddingContent = padding ? `padding: ${padding};` : "";

  return css`
    display: block;
    width: 100%;
    ${maxWidth}
    margin: 0 auto;
    ${paddingContent}
  `;
};

export const bgimage = ({ image, color, size = "cover" }: BackgroundImage) => {
  const background = color
    ? `background: url(${image}), ${color};`
    : `background-image: url(${image});`;

  return css`
    ${background}
    background-size: ${size};
    background-repeat: no-repeat;
    background-position: center;
  `;
};
