"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
   code: string;
   language: "css" | "html";
};

export default function CodeHighlighter({ code, language }: Props) {
   return (
      <SyntaxHighlighter
         language={language}
         style={materialDark}
         showLineNumbers
         customStyle={{
            backgroundColor: "transparent",
            margin: "0",
         }}
         codeTagProps={{}}
      >
         {code}
      </SyntaxHighlighter>
   );
}
