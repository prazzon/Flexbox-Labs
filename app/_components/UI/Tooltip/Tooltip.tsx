"use client";

import styles from "./Tooltip.module.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tooltipVariants = {
   hidden: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 5,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
   }),

   visible: (pos: string) => ({
      opacity: 1,
      y: pos === "top" ? -55 : pos === "bottom" ? 50 : 5,
      x: pos === "left" ? -55 : pos === "right" ? 55 : 0,
      transition: { delay: 0.5, ease: [0.165, 0.84, 0.44, 1] },
   }),

   exit: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 5,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
   }),
};

interface Props {
   children: ReactNode;
   position?: "top" | "bottom" | "left" | "right";
   background?: string;
}

function Tooltip({ children, position = "top", background }: Props) {
   const [showTooltip, setShowTooltip] = useState(false);

   const ref = useRef<HTMLDivElement | null>(null);

   const handleHover = () => setShowTooltip(true);
   const handleLeave = () => setShowTooltip(false);

   useEffect(() => {
      const parent = ref.current?.parentElement;

      if (!parent) return;

      parent.style.position = "relative";

      parent.addEventListener("mouseenter", handleHover);
      parent.addEventListener("mouseleave", handleLeave);

      return () => {
         parent.removeEventListener("mouseenter", handleHover);
         parent.removeEventListener("mouseleave", handleLeave);
      };
   }, []);

   return (
      <div ref={ref} className={`${styles.tooltip} ${styles[position]}`}>
         <AnimatePresence>
            {showTooltip && (
               <motion.div
                  className={styles.tooltip__content}
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={position}
                  style={{ backgroundColor: background }}
               >
                  {children}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default Tooltip;
