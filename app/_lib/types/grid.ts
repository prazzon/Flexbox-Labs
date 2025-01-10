import { CSSProperties } from "react";

export interface GridContainer {
   display: CSSProperties["display"];
   gridTemplateColumns?: CSSProperties["gridTemplateColumns"];
   gridTemplateRows?: CSSProperties["gridTemplateRows"];
   // gridTemplateAreas?: CSSProperties["gridTemplateAreas"];
   // columnGap: CSSProperties["columnGap"];
   // rowGap: CSSProperties["rowGap"];
   gap?: CSSProperties["gap"];
   gridAutoColumns?: CSSProperties["gridAutoColumns"];
   gridAutoRows?: CSSProperties["gridAutoRows"];
   gridAutoFlow?: CSSProperties["gridAutoFlow"];
   justifyContent?: CSSProperties["justifyContent"];
   justifyItems?: CSSProperties["justifyItems"];
   alignItems?: CSSProperties["alignItems"];
   alignContent?: CSSProperties["alignContent"];
}

export interface GridItemStyle {
   gridRowStart?: CSSProperties["gridRowStart"];
   gridRowEnd?: CSSProperties["gridRowEnd"];
   gridRow?: CSSProperties["gridRow"];
   gridColumn?: CSSProperties["gridColumn"];
   gridColumnStart?: CSSProperties["gridColumnStart"];
   gridColumnEnd?: CSSProperties["gridColumnEnd"];
   // gridArea?: CSSProperties["gridArea"];
   justifySelf?: CSSProperties["justifySelf"];
   alignSelf?: CSSProperties["alignSelf"];
   width?: CSSProperties["width"];
   height?: CSSProperties["height"];
}

export interface GridItem {
   id: number;
   text: string;
   styles: GridItemStyle;
}

export interface GridState {
   items: GridItem[];
   container: GridContainer;
   selectedItems: number[];
}

export interface Grid {
   items: GridItem[];
   container: GridContainer;
}
