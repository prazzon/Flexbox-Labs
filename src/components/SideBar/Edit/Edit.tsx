import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import EditContainer from "./EditContainer/EditContainer";
import EditItems from "./EditItems/EditItems";
import usePlayground from "../../../hooks/usePlayground";
import { AnimatePresence, motion } from "framer-motion";

function Edit() {
   const [switchState, setSwitchState] = useState(1);
   const { selectedItems } = usePlayground();

   useEffect(() => {
      if (selectedItems.length) setSwitchState(2);
   }, [selectedItems]);

   return (
      <motion.div
         className={styles.edit}
         initial={{ y: 10, opacity: 0.5 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.2 }}
         exit={{ y: -10, opacity: 0.5 }}
      >
         <div className={styles.tab_switcher}>
            <div
               className={styles.switch}
               data-active={switchState === 1}
               onClick={() => setSwitchState(1)}
            >
               Container
            </div>
            <div
               className={styles.switch}
               data-active={switchState === 2}
               onClick={() => setSwitchState(2)}
            >
               Items
            </div>
         </div>

         <AnimatePresence mode="wait" initial={false}>
            {switchState === 1 && <EditContainer key={"container"} />}
            {switchState === 2 && <EditItems key={"items"} />}
         </AnimatePresence>
      </motion.div>
   );
}

export default Edit;
