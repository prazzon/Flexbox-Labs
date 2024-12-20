import { CSSProperties } from "react";

export interface FlexboxContainer {
   display: CSSProperties["display"];
   gap: CSSProperties["gap"];
   flexDirection?: CSSProperties["flexDirection"];
   flexWrap?: CSSProperties["flexWrap"];
   justifyContent?: CSSProperties["justifyContent"];
   alignItems?: CSSProperties["alignItems"];
   alignContent?: CSSProperties["alignContent"];
}

export interface FlexboxItemStyle {
   order?: number;
   flexGrow?: number;
   flexShrink?: number;
   flexBasis?: string;
   alignSelf?: string;
   width?: string;
   height?: string;
}

export interface FlexboxItem {
   id: number;
   text: string;
   styles: FlexboxItemStyle;
}

export interface FlexboxState {
   items: FlexboxItem[];
   container: FlexboxContainer;
   selectedItems: number[];
}

export interface Flexbox {
   items: FlexboxItem[];
   container: FlexboxContainer;
}

