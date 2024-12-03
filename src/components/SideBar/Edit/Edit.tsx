import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import usePlayground from "../../../hooks/usePlayground";
import styles from "./Edit.module.scss";
import EditContainer from "./EditContainer/EditContainer";
import EditItems from "./EditItems/EditItems";

function Edit() {
   const [switchState, setSwitchState] = useState(1);
   const { selectedItems } = usePlayground();

   useEffect(() => {
      if (selectedItems.length) setSwitchState(2);
   }, [selectedItems]);

   return (
      <div className={styles.edit}>
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
            <motion.div
               key={switchState}
               className={styles.container}
               animate={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 5 }}
               exit={{ opacity: 0, y: -5 }}
               transition={{ duration: 0.15 }}
            >
               {switchState === 1 && <EditContainer />}
               {switchState === 2 && <EditItems />}
            </motion.div>
         </AnimatePresence>
      </div>
   );
}

export default Edit;
