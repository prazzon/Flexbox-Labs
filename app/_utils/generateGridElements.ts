import { CSSProperties } from "react";
import { GridContainer, GridItem } from "../_lib/types/grid";

interface GridSection {
   key: string;
   style: CSSProperties;
}

/**
 * Counts explicit grid tracks in a template string, respecting parentheses
 * (e.g. `repeat(3, 1fr)`) so `split(" ")` does not over-count.
 */
export function countGridTemplateTracks(template: string | undefined): number {
   const t = template?.toString().trim() ?? "";
   if (!t) return 0;

   const tokens: string[] = [];
   let depth = 0; // Track nesting depth for repeat()
   let current = "";

   for (const ch of t) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;

      if (/\s/.test(ch) && depth === 0) {
         if (current.trim()) tokens.push(current.trim());
         current = "";
      } else {
         current += ch;
      }
   }
   if (current.trim()) tokens.push(current.trim());

   let count = 0;
   for (const token of tokens) {
      // Extract multiplier from repeat(n, ...) syntax
      const repeatMatch = /^repeat\(\s*(\d+)\s*,/i.exec(token);
      if (repeatMatch) {
         count += Math.max(0, parseInt(repeatMatch[1], 10));
      } else {
         count += 1;
      }
   }

   return Math.max(count, 0);
}

export const generateGridElements = (
   container: GridContainer,
   items: GridItem[],
) => {
   if (container.display !== "grid") {
      return { gridSections: [], rowTracks: [], columnTracks: [] };
   }

   let columns = countGridTemplateTracks(
      container.gridTemplateColumns?.toString(),
   );
   let rows = countGridTemplateTracks(container.gridTemplateRows?.toString());

   // Default to 1 track if no template defined
   if (columns === 0) columns = 1;
   if (rows === 0) rows = 1;

   let maxColumn = columns;
   let maxRow = rows;

   items.forEach((item) => {
      const { gridColumn, gridRow } = item.styles;

      if (gridColumn) {
         const parts = gridColumn.toString().split("/");
         if (parts.length >= 2) {
            // Parse gridColumn: "start / end" format
            const colStartNum = parseInt(parts[0].trim(), 10);
            const colEndNum = parseInt(parts[1].trim(), 10);
            if (!Number.isNaN(colStartNum) && !Number.isNaN(colEndNum)) {
               maxColumn = Math.max(maxColumn, colEndNum - 1, colStartNum - 1);
            }
         }
      }

      if (gridRow) {
         const parts = gridRow.toString().split("/");
         if (parts.length >= 2) {
            // Parse gridRow: "start / end" format
            const rowStartNum = parseInt(parts[0].trim(), 10);
            const rowEndNum = parseInt(parts[1].trim(), 10);
            if (!Number.isNaN(rowStartNum) && !Number.isNaN(rowEndNum)) {
               maxRow = Math.max(maxRow, rowEndNum - 1, rowStartNum - 1);
            }
         }
      }
   });

   columns = Math.max(columns, maxColumn);
   rows = Math.max(rows, maxRow);

   const gridSections: GridSection[] = [];

   // Generate grid cells with explicit area notation
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

   const rowTracks = [];
   // Generate visual guides for each row (for UI line highlighting)
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

   const columnTracks = [];
   // Generate visual guides for each column (for UI line highlighting)
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
