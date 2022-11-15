import styled, { css } from "styled-components";

import type { MultipleRemoveI, SelectOptionI, SelectValueI } from "@typing/styles";

export const Select = styled.div``;

const valueAndOption = css``;

export const Value = styled.div<SelectValueI>`
  ${valueAndOption}
`;
export const Options = styled.div``;
export const Option = styled.span<SelectOptionI>`
  ${valueAndOption}
`;

export const Multiple = styled.div``;
export const MultipleOption = styled.p``;
export const MultipleValue = styled.span``;
export const MultipleRemove = styled.button<MultipleRemoveI>``;
