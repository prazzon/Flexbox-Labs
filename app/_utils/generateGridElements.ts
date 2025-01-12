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

   // Parse the defined grid-template-columns and grid-template-rows
   let columns = container.gridTemplateColumns?.toString().split(" ").length || 0;
   let rows = container.gridTemplateRows?.toString().split(" ").length || 0;

   // Track the maximum row and column spanned or placed by items
   let maxColumn = columns;
   let maxRow = rows;

   items.forEach((item) => {
      const { gridColumn, gridRow } = item.styles;

      // Parse the gridRow and gridColumn values
      if (gridColumn) {
         const [colStart, colEnd] = gridColumn.toString().split("/");
         const colEndNum = parseInt(colEnd.trim(), 10);
         const colStartNum = parseInt(colStart.trim(), 10);
         maxColumn = Math.max(maxColumn, colEndNum - 1, colStartNum - 1);
      }

      if (gridRow) {
         const [rowStart, rowEnd] = gridRow.toString().split("/");
         const rowEndNum = parseInt(rowEnd.trim(), 10);
         const rowStartNum = parseInt(rowStart.trim(), 10);
         maxRow = Math.max(maxRow, rowEndNum - 1, rowStartNum - 1);
      }
   });

   columns = Math.max(columns, maxColumn);
   rows = Math.max(rows, maxRow);

   const gridSections: GridSection[] = [];

   // Generate grid sections
   for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
         gridSections.push({
            key: `item-${row}-${col}`,
            style: {
               gridArea: `${row} / ${col} / ${row + 1} / ${col + 1}`,
            },
         });
      }
   }

   // Generate row tracks
   const rowTracks = [];
   for (let row = 1; row <= rows; row++) {
      const isFirst = row === 1;
      const isLast = row === rows;
      rowTracks.push({
         key: `row-track-${row}`,
         style: {
            gridArea: `${row} / 1 / ${row + 1} / ${columns + 1}`,
         },
         data: isFirst ? "first" : isLast ? "last" : undefined,
      });
   }

   // Generate column tracks
   const columnTracks = [];
   for (let col = 1; col <= columns; col++) {
      const isFirst = col === 1;
      const isLast = col === columns;
      columnTracks.push({
         key: `column-track-${col}`,
         style: {
            gridArea: `1 / ${col} / ${rows + 1} / ${col + 1}`,
         },
         data: isFirst ? "first" : isLast ? "last" : undefined,
      });
   }

   return { gridSections, rowTracks, columnTracks };
};
