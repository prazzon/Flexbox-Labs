import { motion } from "framer-motion";
import styles from "./CodeTabs.module.scss";

type Props = {
   tabs: { title: string }[];
   switchState: number;
   setSwitchState: (index: number) => void;
}

function CodeTabs({tabs, switchState, setSwitchState}: Props) {
   return (
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
   );
}

export default CodeTabs
