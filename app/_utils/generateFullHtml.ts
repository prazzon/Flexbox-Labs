"use client";

import { State } from "@/app/types";
import { formatCSS, formatHTML } from "./formatters";

function indentContent(content: string, level: number): string {
   const lines = content.split("\n");
   const indentedLines = lines.map((line) => "\t".repeat(level) + line);
   return indentedLines.join("\n");
}

const defaultStyle = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body,
.container {
   height: 100%;
   width: 100%;
}

body {
  display: flex;
  padding: 10px;
}

.item {
  background-color: #24292d;
  color: #fff;
  border-radius: 10px;
  padding: 10px 15px;
}
`;

export const generateFullHTML = (data: State): string => {
   const htmlContent = formatHTML(data);
   const cssContent = formatCSS(data);

   return `<!DOCTYPE html>
<html lang="en">
\t<head>
\t\t<meta charset="UTF-8" />
\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />
\t\t<title>Exported Layout</title>
\t\t<style>
${indentContent(defaultStyle, 3)}
${indentContent(cssContent, 3)}
\t\t</style>
\t</head>
\t<body>
${indentContent(htmlContent, 2)}
\t</body>
</html>`;
};