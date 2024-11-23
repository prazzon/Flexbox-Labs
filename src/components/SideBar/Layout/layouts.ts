import alignCenter from "../../../assets/img/alignCenter.svg?react";
import alternatingGrid from "../../../assets/img/alternatingGrid.svg?react";
import fillRemainingSpace from "../../../assets/img/fillRemainingSpace.svg?react";
import fillRemainingSpace2 from "../../../assets/img/fillRemainingSpace2.svg?react";
import fillSpace from "../../../assets/img/fillSpace.svg?react";
import grid3x3 from "../../../assets/img/grid3x3.svg?react";
import grid4x4 from "../../../assets/img/grid4x4.svg?react";
import horizontalBars from "../../../assets/img/horizontalBars.svg?react";
import html5 from "../../../assets/img/html5.svg?react";
import masonryRow from "../../../assets/img/masonryRow.svg?react";
import masonryColumn from "../../../assets/img/masonryColumn.svg?react";
import rowWrap from "../../../assets/img/rowWrap.svg?react";
import stretchMiddle from "../../../assets/img/stretchMiddle.svg?react";
import verticalBars from "../../../assets/img/verticalBars.svg?react";
import verticalStack from "../../../assets/img/verticalStack.svg?react";
import { Container, Item } from "../../../context/PlaygroundContext";

interface layout {
   name: string;
   img: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
   layout: {
      items: Item[];
      container: Container;
   };
}

export const layouts: layout[] = [
   {
      name: "Fill Space",
      img: fillSpace,
      layout: {
         items: [
            { id: 1, text: "1", styles: { flexGrow: 1 } },
            { id: 2, text: "2", styles: { flexGrow: 1 } },
            { id: 3, text: "3", styles: { flexGrow: 1 } },
         ],
         container: { display: "flex", gap: "20px" },
      },
   },
   {
      name: "Stretch Middle",
      img: stretchMiddle,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "150px" } },
            { id: 2, text: "2", styles: { flexGrow: 1 } },
            { id: 3, text: "3", styles: { width: "150px" } },
         ],
         container: { display: "flex", gap: "20px" },
      },
   },
   {
      name: "HTML5",
      img: html5,
      layout: {
         items: [
            { id: 1, text: "Header", styles: { width: "100%", height: "5%" } },
            { id: 2, text: "Sidebar", styles: { width: "25%", height: "75%" } },
            { id: 3, text: "Content", styles: { flexGrow: 1, height: "75%" } },
            { id: 4, text: "Footer", styles: { width: "100%", height: "5%" } },
         ],
         container: {
            display: "flex",
            gap: "2%",
            flexWrap: "wrap",
            alignContent: "start",
         },
      },
   },
   {
      name: "Alternating Grid",
      img: alternatingGrid,
      layout: {
         items: [
            { id: 1, text: "1", styles: { flexGrow: 1 } },
            { id: 2, text: "2", styles: { flexGrow: 1 } },
            { id: 3, text: "3", styles: { width: "100%" } },
            { id: 4, text: "4", styles: { flexGrow: 1 } },
            { id: 5, text: "5", styles: { flexGrow: 1 } },
         ],
         container: { display: "flex", gap: "20px", flexWrap: "wrap" },
      },
   },
   {
      name: "Masonry Row",
      img: masonryRow,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "32%", height: "40%" } },
            { id: 2, text: "2", styles: { width: "32%", height: "30%" } },
            { id: 3, text: "3", styles: { width: "32%", flexGrow: 1 } },
            { id: 4, text: "4", styles: { width: "32%", height: "25%" } },
            { id: 5, text: "5", styles: { width: "32%", height: "40%" } },
            { id: 6, text: "6", styles: { width: "32%", flexGrow: 1 } },
            { id: 7, text: "7", styles: { width: "32%", height: "40%" } },
            { id: 8, text: "8", styles: { width: "32%", height: "30%" } },
            { id: 9, text: "9", styles: { width: "32%", flexGrow: 1 } },
         ],
         container: {
            display: "flex",
            flexDirection: "column",
            gap: "2%",
            flexWrap: "wrap",
         },
      },
   },
   {
      name: "Masonry Column",
      img: masonryColumn,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "32%", width: "40%" } },
            { id: 2, text: "2", styles: { height: "32%", width: "30%" } },
            { id: 3, text: "3", styles: { height: "32%", flexGrow: 1 } },
            { id: 4, text: "4", styles: { height: "32%", width: "25%" } },
            { id: 5, text: "5", styles: { height: "32%", width: "40%" } },
            { id: 6, text: "6", styles: { height: "32%", flexGrow: 1 } },
            { id: 7, text: "7", styles: { height: "32%", width: "40%" } },
            { id: 8, text: "8", styles: { height: "32%", width: "30%" } },
            { id: 9, text: "9", styles: { height: "32%", flexGrow: 1 } },
         ],
         container: {
            display: "flex",
            flexDirection: "row",
            gap: "2%",
            flexWrap: "wrap",
         },
      },
   },
   {
      name: "3x3 Grid",
      img: grid3x3,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "32%", height: "32%" } },
            { id: 2, text: "2", styles: { width: "32%", height: "32%" } },
            { id: 3, text: "3", styles: { width: "32%", height: "32%" } },
            { id: 4, text: "4", styles: { width: "32%", height: "32%" } },
            { id: 5, text: "5", styles: { width: "32%", height: "32%" } },
            { id: 6, text: "6", styles: { width: "32%", height: "32%" } },
            { id: 7, text: "7", styles: { width: "32%", height: "32%" } },
            { id: 8, text: "8", styles: { width: "32%", height: "32%" } },
            { id: 9, text: "9", styles: { width: "32%", height: "32%" } },
         ],
         container: { display: "flex", gap: "2%", flexWrap: "wrap" },
      },
   },
   {
      name: "4x4 Grid",
      img: grid4x4,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "23.5%", height: "23.5%" } },
            { id: 2, text: "2", styles: { width: "23.5%", height: "23.5%" } },
            { id: 3, text: "3", styles: { width: "23.5%", height: "23.5%" } },
            { id: 4, text: "4", styles: { width: "23.5%", height: "23.5%" } },
            { id: 5, text: "5", styles: { width: "23.5%", height: "23.5%" } },
            { id: 6, text: "6", styles: { width: "23.5%", height: "23.5%" } },
            { id: 7, text: "7", styles: { width: "23.5%", height: "23.5%" } },
            { id: 8, text: "8", styles: { width: "23.5%", height: "23.5%" } },
            { id: 9, text: "9", styles: { width: "23.5%", height: "23.5%" } },
            { id: 10, text: "10", styles: { width: "23.5%", height: "23.5%" } },
            { id: 11, text: "11", styles: { width: "23.5%", height: "23.5%" } },
            { id: 12, text: "12", styles: { width: "23.5%", height: "23.5%" } },
            { id: 13, text: "13", styles: { width: "23.5%", height: "23.5%" } },
            { id: 14, text: "14", styles: { width: "23.5%", height: "23.5%" } },
            { id: 15, text: "15", styles: { width: "23.5%", height: "23.5%" } },
            { id: 16, text: "16", styles: { width: "23.5%", height: "23.5%" } },
         ],
         container: { display: "flex", gap: "2%", flexWrap: "wrap" },
      },
   },
   {
      name: "Align Center",
      img: alignCenter,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "25%", height: "150px" } },
            { id: 2, text: "2", styles: { width: "25%", height: "150px" } },
            { id: 3, text: "3", styles: { width: "25%", height: "150px" } },
            { id: 4, text: "4", styles: { width: "25%", height: "150px" } },
            { id: 5, text: "5", styles: { width: "25%", height: "150px" } },
            { id: 6, text: "6", styles: { width: "25%", height: "150px" } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
         },
      },
   },
   {
      name: "Fill Right",
      img: fillRemainingSpace,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "150px" } },
            { id: 2, text: "2", styles: { height: "150px" } },
            { id: 3, text: "3", styles: { height: "150px", flexGrow: 1 } },
         ],
         container: { display: "flex", gap: "20px", flexWrap: "wrap" },
      },
   },
   {
      name: "Fill Center",
      img: fillRemainingSpace2,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "150px" } },
            { id: 2, text: "2", styles: { height: "150px", flexGrow: 1 } },
            { id: 3, text: "3", styles: { height: "150px" } },
         ],
         container: { display: "flex", gap: "20px", flexWrap: "wrap" },
      },
   },
   {
      name: "Horizontal Bars",
      img: horizontalBars,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "40%" } },
            { id: 2, text: "2", styles: { width: "80%" } },
            { id: 3, text: "3", styles: { width: "100%" } },
            { id: 4, text: "4", styles: { width: "25%" } },
            { id: 5, text: "5", styles: { width: "35%" } },
         ],
         container: { display: "flex", gap: "20px", flexDirection: "column" },
      },
   },
   {
      name: "Vertical Bars",
      img: verticalBars,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "40%" } },
            { id: 2, text: "2", styles: { height: "80%" } },
            { id: 3, text: "3", styles: { height: "100%" } },
            { id: 4, text: "4", styles: { height: "25%" } },
            { id: 5, text: "5", styles: { height: "35%" } },
         ],
         container: { display: "flex", gap: "20px", alignItems: "end" },
      },
   },
   {
      name: "Row Wrap",
      img: rowWrap,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "150px", width: "23.5%" } },
            { id: 2, text: "2", styles: { height: "150px", width: "23.5%" } },
            { id: 3, text: "3", styles: { height: "150px", width: "23.5%" } },
            { id: 4, text: "4", styles: { height: "150px", width: "23.5%" } },
            { id: 5, text: "5", styles: { height: "150px", width: "23.5%" } },
            { id: 6, text: "6", styles: { height: "150px", width: "23.5%" } },
            { id: 7, text: "7", styles: { height: "150px", width: "23.5%" } },
            { id: 8, text: "8", styles: { height: "150px", width: "23.5%" } },
            { id: 9, text: "9", styles: { height: "150px", width: "23.5%" } },
            { id: 10, text: "10", styles: { height: "150px", width: "23.5%" } },
            { id: 11, text: "11", styles: { height: "150px", width: "23.5%" } },
            { id: 12, text: "12", styles: { height: "150px", width: "23.5%" } },
            { id: 13, text: "13", styles: { height: "150px", width: "23.5%" } },
            { id: 14, text: "14", styles: { height: "150px", width: "23.5%" } },
         ],
         container: {
            display: "flex",
            gap: "2%",
            flexWrap: "wrap",
            alignContent: "start",
         },
      },
   },
   {
      name: "Vertical Stack",
      img: verticalStack,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "250px", flexGrow: 1 } },
            { id: 2, text: "2", styles: { width: "250px", flexGrow: 1 } },
            { id: 3, text: "3", styles: { width: "250px", flexGrow: 1 } },
            { id: 4, text: "4", styles: { width: "250px", flexGrow: 1 } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            alignItems: "center",
         },
      },
   },
];
