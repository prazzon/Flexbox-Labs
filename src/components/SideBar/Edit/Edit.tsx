import { AnimatePresence } from "framer-motion";
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
            {switchState === 1 && <EditContainer key={"container"} />}
            {switchState === 2 && <EditItems key={"items"} />}
         </AnimatePresence>
      </div>
   );
}

export default Edit;
