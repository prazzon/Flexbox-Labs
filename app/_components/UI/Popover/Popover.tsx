"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import styles from "./Popover.module.scss";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

const popoverVariants = {
   hidden: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 5,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
   }),

   visible: (pos: string) => ({
      opacity: 1,
      y: pos === "top" ? -55 : pos === "bottom" ? 50 : 5,
      x: pos === "left" ? -55 : pos === "right" ? 55 : 0,
      transition: { ease: [0.165, 0.84, 0.44, 1] },
   }),

   exit: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 5,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
   }),
};

interface Props {
   children: ReactNode;
   width?: number;
   position?: "top" | "bottom" | "left" | "right";
   background?: string;
}

function Popover({
   children,
   position = "top",
   background,
   width = 300,
}: Props) {
   const [showPopover, setShowPopover] = useState(false);

   const togglePopover = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowPopover((prev) => !prev);
   };

   const ref = useOutsideClick(() => setShowPopover(false));

   useEffect(() => {
      const parent = ref.current?.parentElement;

      if (!parent) return;

      parent.style.position = "relative";
   }, [ref]);

   return (
      <div
         ref={ref}
         className={`${styles.popover} ${styles[position]}`}
         onClick={togglePopover}
      >
         <AnimatePresence>
            {showPopover && (
               <motion.div
                  className={styles.popover__content}
                  variants={popoverVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={position}
                  style={{
                     maxWidth: `${width}px`,
                     backgroundColor: background,
                     zIndex: "9999",
                  }}
               >
                  {children}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default Popover;
