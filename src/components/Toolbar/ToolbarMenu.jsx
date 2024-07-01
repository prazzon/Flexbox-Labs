import styles from "./ToolbarMenu.module.css";
import { AnimatePresence, motion } from "framer-motion";

const container = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
};

const menu = {
   hidden: { y: -30, opacity: 0 },
   visible: { y: 0, opacity: 1 },
};

function ToolbarMenu({ children, hide }) {
   return (
      <AnimatePresence>
         <motion.div
            className={styles.container}
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
         >
            <motion.div className={styles.toolbar__menu} variants={menu}>
               {children}
            </motion.div>
            <div className={styles.overlay} onClick={hide}></div>
         </motion.div>
      </AnimatePresence>
   );
}

export default ToolbarMenu;
