import { ReactNode } from "react";
import styles from "./ToolbarMenu.module.css";
import { AnimatePresence, motion } from "framer-motion";

const container = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0 },
};

const menu = {
   hidden: { y: -10, opacity: 0 },
   visible: { y: 0, opacity: 1 },
   exit: { y: -10 },
};

interface Props {
   children: ReactNode;
   hide: () => void;
   show: boolean;
}

function ToolbarMenu({ children, hide, show }: Props) {
   return (
      <AnimatePresence>
         {show && (
            <motion.div
               className={styles.container}
               variants={container}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <motion.div className={styles.toolbar__menu} variants={menu}>
                  {children}
               </motion.div>
               <div className={styles.overlay} onClick={hide}></div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}

export default ToolbarMenu;
