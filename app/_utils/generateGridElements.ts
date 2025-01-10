import { CSSProperties } from "react";
import { GridContainer, GridItem } from "../_lib/types/grid";

interface GridSection {
   key: string;
   style: CSSProperties;
}

export const generateGridElements = (
   container: GridContainer,
   items: GridItem[]
) => {
   if (container.display !== "grid") {
      return { gridSections: [], rowTracks: [], columnTracks: [] };
   }

   let columns = (container?.gridTemplateColumns as string).split(" ").length;
   let rows = (container?.gridTemplateRows as string).split(" ").length;

   const gridArea = columns * rows;

   if (items.length > gridArea) {
      const gridAutoFlow = container.gridAutoFlow;

      if (!gridAutoFlow || gridAutoFlow === "row" || gridAutoFlow === "row dense") {
         const extraRows = Math.ceil((items.length - gridArea) / columns);
         rows += extraRows;
      } else {
         const extraColumns = Math.ceil((items.length - gridArea) / rows);
         columns += extraColumns;
      }
   }

   const gridSections: GridSection[] = [];
   for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
         gridSections.push({
            key: `item-${row}-${col}`,
            style: { gridArea: `${row} / ${col} / ${row + 1} / ${col + 1}` },
         });
      }
   }

   const rowTracks = [];
   for (let row = 1; row <= rows; row++) {
      const isFirst = row === 1;
      const isLast = row === rows;
      rowTracks.push({
         key: `row-track-${row}`,
         style: { gridArea: `${row} / 1 / ${row + 1} / ${columns + 1}` },
         data: isFirst ? "first" : isLast ? "last" : undefined,
      });
   }

   const columnTracks = [];
   for (let col = 1; col <= columns; col++) {
      const isFirst = col === 1;
      const isLast = col === columns;
      columnTracks.push({
         key: `column-track-${col}`,
         style: { gridArea: `1 / ${col} / ${rows + 1} / ${col + 1}` },
         data: isFirst ? "first" : isLast ? "last" : undefined,
      });
   }

   return { gridSections, rowTracks, columnTracks };
};
