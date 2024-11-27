import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Copy from "../Copy/Copy";
import styles from "./DisplayCode.module.scss";
import DisplayCss from "./DisplayCss/DisplayCss";
import DisplayHtml from "./DisplayHtml/DisplayHtml";
import DisplayTailwind from "./DisplayTailwind/DisplayTailwind";

const tabs = [
   { title: "HTML", component: <DisplayHtml /> },
   { title: "CSS", component: <DisplayCss /> },
   { title: "Tailwind", component: <DisplayTailwind /> },
];

function DisplayCode() {
   const [switchState, setSwitchState] = useState(0);

   const codeRef = useRef<HTMLDivElement>(null);

   return (
      <>
         <div className={styles.container}>
            <div className={styles.code__container}>
               <motion.div className={styles.tab_switcher} layout>
                  {tabs.map((tab, index) => (
                     <button
                        key={index}
                        className={`${styles.switch} ${
                           index === switchState ? styles.active : ""
                        }`}
                        onClick={() => setSwitchState(index)}
                     >
                        {tab.title}
                        {index === switchState && (
                           <motion.span
                              className={styles.active}
                              transition={{ duration: 0.2 }}
                              layoutId="activeCode"
                           />
                        )}
                     </button>
                  ))}
               </motion.div>
               <motion.div
                  className={styles.code__container_text}
                  ref={codeRef}
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
                        {tabs[switchState].component}
                     </motion.div>
                  </AnimatePresence>
                  <Copy id="code" ref={codeRef} />
               </motion.div>
            </div>
         </div>
      </>
   );
}

export default DisplayCode;
