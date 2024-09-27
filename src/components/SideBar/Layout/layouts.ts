import { Container, Item } from "../../../context/PlaygroundContext";
import fillSpace from "../../../assets/img/fillSpace.svg?react";
import stretchMiddle from "../../../assets/img/stretchMiddle.svg?react";
import grid3x3 from "../../../assets/img/grid3x3.svg?react";
import alternatingGrid from "../../../assets/img/alternatingGrid.svg?react";
import fillRemainingSpace from "../../../assets/img/fillRemainingSpace.svg?react";
import fillRemainingSpace2 from "../../../assets/img/fillRemainingSpace2.svg?react";
import rowWrap from "../../../assets/img/rowWrap.svg?react";
import horizontalBars from "../../../assets/img/horizontalBars.svg?react";
import verticalBars from "../../../assets/img/verticalBars.svg?react";
import verticalStack from "../../../assets/img/verticalStack.svg?react";

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
            {
               id: 1,
               text: "1",
               styles: { width: "auto", height: "auto", flexGrow: 1 },
            },
            {
               id: 2,
               text: "2",
               styles: { width: "auto", height: "auto", flexGrow: 1 },
            },
            {
               id: 3,
               text: "3",
               styles: { width: "auto", height: "auto", flexGrow: 1 },
            },
         ],
         container: {
            display: "flex",
            gap: "20px",
         },
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
         container: {
            display: "flex",
            gap: "20px",
         },
      },
   },
   {
      name: "3x3 Grid",
      img: grid3x3,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "32%" } },
            { id: 2, text: "2", styles: { width: "32%" } },
            { id: 3, text: "3", styles: { width: "32%" } },
            { id: 4, text: "4", styles: { width: "32%" } },
            { id: 5, text: "5", styles: { width: "32%" } },
            { id: 6, text: "6", styles: { width: "32%" } },
            { id: 7, text: "7", styles: { width: "32%" } },
            { id: 8, text: "8", styles: { width: "32%" } },
            { id: 9, text: "9", styles: { width: "32%" } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
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
         container: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
         },
      },
   },
   {
      name: "Fill Right Space",
      img: fillRemainingSpace,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "150px", width: "150px" } },
            { id: 2, text: "2", styles: { height: "150px", width: "150px" } },
            {
               id: 3,
               text: "3",
               styles: { height: "150px", width: "150px", flexGrow: 1 },
            },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
         },
      },
   },
   {
      name: "Fill Center Space",
      img: fillRemainingSpace2,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "150px", width: "150px" } },
            {
               id: 2,
               text: "2",
               styles: { height: "150px", width: "150px", flexGrow: 1 },
            },
            { id: 3, text: "3", styles: { height: "150px", width: "150px" } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
         },
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
            gap: "20px",
            flexWrap: "wrap",
            alignContent: "start",
         },
      },
   },
   {
      name: "Horizontal Bars",
      img: horizontalBars,
      layout: {
         items: [
            { id: 1, text: "1", styles: { width: "300px" } },
            { id: 2, text: "2", styles: { width: "450px" } },
            { id: 3, text: "3", styles: { width: "600px" } },
            { id: 4, text: "4", styles: { width: "150px" } },
            { id: 5, text: "5", styles: { width: "250px" } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            flexDirection: "column",
         },
      },
   },
   {
      name: "Vertical Bars",
      img: verticalBars,
      layout: {
         items: [
            { id: 1, text: "1", styles: { height: "300px" } },
            { id: 2, text: "2", styles: { height: "450px" } },
            { id: 3, text: "3", styles: { height: "600px" } },
            { id: 4, text: "4", styles: { height: "150px" } },
            { id: 5, text: "5", styles: { height: "250px" } },
         ],
         container: {
            display: "flex",
            gap: "20px",
            alignItems: "end",
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
            { id: 5, text: "5", styles: { width: "250px", flexGrow: 1 } },
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
