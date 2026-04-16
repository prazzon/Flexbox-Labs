"use client";

import { State } from "@/app/types";
import DOMPurify from "dompurify";
import { formatCSS, formatHTML } from "./formatters";

/** Indentation level constants for HTML structure */
const INDENT_LEVELS = {
   htmlDeclaration: 0,
   headBody: 1,
   styleContent: 3,
   bodyContent: 2,
} as const;

/** Default visual style constants */
const DEFAULT_STYLES = {
   reset: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
   },
   fullSize: {
      height: "100%",
      width: "100%",
   },
   body: {
      display: "flex",
      padding: "10px",
   },
   item: {
      backgroundColor: "#24292d",
      color: "#fff",
      borderRadius: "10px",
      padding: "10px 15px",
   },
} as const;

/** Generates default CSS with named constants for maintainability */
function generateDefaultStyle(): string {
   return `* {
    margin: ${DEFAULT_STYLES.reset.margin}px;
    padding: ${DEFAULT_STYLES.reset.padding}px;
    box-sizing: ${DEFAULT_STYLES.reset.boxSizing};
}

html,
body,
.container {
   height: ${DEFAULT_STYLES.fullSize.height};
   width: ${DEFAULT_STYLES.fullSize.width};
}

body {
  display: ${DEFAULT_STYLES.body.display};
  padding: ${DEFAULT_STYLES.body.padding};
}

.item {
  background-color: ${DEFAULT_STYLES.item.backgroundColor};
  color: ${DEFAULT_STYLES.item.color};
  border-radius: ${DEFAULT_STYLES.item.borderRadius};
  padding: ${DEFAULT_STYLES.item.padding};
}
`;
}

function indentContent(content: string, level: number): string {
   const lines = content.split("\n");
   const indentedLines = lines.map((line) => "\t".repeat(level) + line);
   return indentedLines.join("\n");
}

export const generateFullHTML = (data: State): string => {
   const htmlContent = formatHTML(data);
   const cssContent = formatCSS(data);

   // Sanitize user-generated content to prevent XSS attacks
   const sanitizedHtml = DOMPurify.sanitize(htmlContent);

   const defaultStyle = generateDefaultStyle();

   return `<!DOCTYPE html>
<html lang="en">
${"\t".repeat(INDENT_LEVELS.headBody)}<head>
${"\t".repeat(INDENT_LEVELS.headBody + 1)}<meta charset="UTF-8" />
${"\t".repeat(INDENT_LEVELS.headBody + 1)}<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${"\t".repeat(INDENT_LEVELS.headBody + 1)}<title>Exported Layout</title>
${"\t".repeat(INDENT_LEVELS.headBody + 1)}<style>
${indentContent(defaultStyle, INDENT_LEVELS.styleContent)}
${indentContent(cssContent, INDENT_LEVELS.styleContent)}
${"\t".repeat(INDENT_LEVELS.headBody + 1)}</style>
${"\t".repeat(INDENT_LEVELS.headBody)}</head>
${"\t".repeat(INDENT_LEVELS.headBody)}<body>
${indentContent(sanitizedHtml, INDENT_LEVELS.bodyContent)}
${"\t".repeat(INDENT_LEVELS.headBody)}</body>
</html>`;
};
