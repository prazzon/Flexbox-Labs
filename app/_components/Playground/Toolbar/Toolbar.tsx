"use client";

import { motion } from "motion/react";
import styles from "./Toolbar.module.scss";

function Toolbar({ children }: { children: React.ReactNode }) {
   return (
      <motion.div layout className={styles.toolbar}>
         {children}
      </motion.div>
   );
}

export function ToolbarDivider() {
   return <hr className={styles.divider} />;
}

export default Toolbar;
