"use client";

import { formatCSS, formatHTML, formatTailwind } from "@/app/_utils/formatters";
import { generateFullHTML } from "@/app/_utils/generateFullHtml";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Copy from "../Copy/Copy";
import CodeTabs from "./CodeTabs/CodeTabs";
import styles from "./DisplayCode.module.scss";
import ExportButton from "./ExportButton/ExportButton";
import { State } from "@/app/types";

const tabs = [{ title: "HTML" }, { title: "CSS" }, { title: "Tailwind" }];

function DisplayCode({ state }: { state: State }) {
   const [switchState, setSwitchState] = useState(0);

   const code =
      switchState === 0
         ? formatHTML(state)
         : switchState === 1
         ? formatCSS(state)
         : formatTailwind(state);

   return (
      <div className={styles.container}>
         <div className={styles.code__container}>
            <CodeTabs
               tabs={tabs}
               switchState={switchState}
               setSwitchState={setSwitchState}
            />
            <motion.div
               className={styles.code__container_text}
               layout
               transition={{ duration: 0.2 }}
            >
               <AnimatePresence mode="wait">
                  <motion.div
                     key={switchState}
                     layout
                     animate={{ opacity: 1, y: 0 }}
                     initial={{ opacity: 0, y: 10 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.15 }}
                  >
                     <SyntaxHighlighter
                        language={switchState === 1 ? "css" : "html"}
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
                  </motion.div>
               </AnimatePresence>
               <motion.div className={styles.btn__container} layout>
                  <AnimatePresence mode="wait" initial={false}>
                     {switchState !== 2 && (
                        <ExportButton
                           data={generateFullHTML(state)}
                           fileName="code"
                           extension="html"
                        />
                     )}
                  </AnimatePresence>
                  <Copy id="code" text={code} />
               </motion.div>
            </motion.div>
         </div>
      </div>
   );
}

export default DisplayCode;
