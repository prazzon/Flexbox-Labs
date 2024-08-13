import styles from "./Tooltip.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tooltipVariants = {
   hidden: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 0,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
   }),

   visible: (pos: string) => ({
      opacity: 1,
      y: pos === "top" ? -50 : pos === "bottom" ? 50 : 0,
      x: pos === "left" ? -65 : pos === "right" ? 65 : 0,
      transition: { delay: 0.5, ease: [0.165, 0.84, 0.44, 1] },
   }),

   exit: (pos: string) => ({
      opacity: 0,
      y: pos === "top" ? -30 : pos === "bottom" ? 30 : 0,
      x: pos === "left" ? -30 : pos === "right" ? 30 : 0,
      transition: { duration: 0.2 },
   }),
};

interface Props {
   children: ReactNode;
   position?: "top" | "bottom" | "left" | "right";
}

function Tooltip({ children, position = "top" }: Props) {
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
      <div ref={ref} className={styles.tooltip}>
         <AnimatePresence>
            {showTooltip && (
               <motion.div
                  className={styles.tooltip__content}
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={position}
               >
                  {children}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default Tooltip;
