export type Media = `${"max" | "min"}-width: ${number}px`;
type Spacing = `${`${number}${"px" | "%"}` | "0"}`;

export type ForSize = "phone"
| "phone-mid"
| "phone-big"
| "phone-xbig"
| "tablet-small"
| "tablet-portrait"
| "tablet-landscape"
| "desktop"
| "desktop-mid"
| "desktop-big"
| "desktop-xbig"
| "tv-small"
| "tv-4k";

export type Flex = {
  justify: "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "inherit"
  | "initial"
  | "left"
  | "normal"
  | "revert"
  | "right"
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "start"
  | "stretch"
  | "unset";
  gap?: Spacing | `${Spacing} ${Spacing}`;
  align?: "baseline"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "inherit"
  | "initial"
  | "normal"
  | "revert"
  | "self-end"
  | "self-start"
  | "start"
  | "stretch"
  | "unset";
};

export type Grid = {
  columns: string;
  gap?: Spacing | `${Spacing} ${Spacing}`;
};

export type Text = {
  size: number;
  weight?: 300 | 400 | 500 | 600 | 700 | 900 | "initital";
  line?: number;
  align?: "center"
  | "end"
  | "inherit"
  | "initial"
  | "justify"
  | "left"
  | "revert"
  | "right"
  | "start"
  | "unset"
  | "-webkit-auto"
  | "-webkit-center"
  | "-webkit-left"
  | "-webkit-match-parent"
  | "-webkit-right";
};

export type Content = {
  width?: `${number}${"px" | "vw" | "%"}`;
  padding?: Spacing
  | `${Spacing} ${Spacing}`
  | `${Spacing} ${Spacing} ${Spacing}`
  | `${Spacing} ${Spacing} ${Spacing} ${Spacing}`;
};

export type BackgroundImage = {
  image: string;
  color?: `#${string}` | `rgba(${string})`;
  size?: "contain" | "cover" | `${number}%`;
};

export interface ScrollLinkI {
  active?: boolean;
}
