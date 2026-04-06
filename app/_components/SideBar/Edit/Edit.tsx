"use client";

import { ContainerConfig, ItemConfig } from "@/app/_data/dataTypes";
import { Container, ItemStyle } from "@/app/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import EditContainer from "./EditContainer/EditContainer";
import EditItems from "./EditItems/EditItems";

interface Props {
   selectedItems: string[];
   editContainer: (key: keyof Container, value: string) => void;
   container: Container;
   containerConfig: ContainerConfig[];
   itemsConfig: ItemConfig[];
   selectedItemStyles: ItemStyle | undefined;
   editItemStyle: (key: keyof ItemStyle, value: string) => void;
}

function Edit({
   selectedItems,
   editContainer,
   container,
   containerConfig,
   itemsConfig,
   selectedItemStyles,
   editItemStyle,
}: Props) {
   const [switchState, setSwitchState] = useState(selectedItems.length ? 2 : 1);

   useEffect(() => {
      if (selectedItems.length) setSwitchState(2);
   }, [selectedItems]);

   return (
      <div className={styles.edit}>
         <div className={styles.tab_switcher}>
            <button
               className={styles.switch}
               data-active={switchState === 1}
               onClick={() => setSwitchState(1)}
            >
               Container
            </button>
            <button
               className={styles.switch}
               data-active={switchState === 2}
               onClick={() => setSwitchState(2)}
            >
               Items
            </button>
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
               {switchState === 1 && (
                  <EditContainer
                     editContainer={editContainer}
                     container={container}
                     containerConfig={containerConfig}
                  />
               )}
               {switchState === 2 && (
                  <EditItems
                     selectedItems={selectedItems}
                     selectedItemStyles={selectedItemStyles}
                     editItemStyle={editItemStyle}
                     itemsConfig={itemsConfig}
                  />
               )}
            </motion.div>
         </AnimatePresence>
      </div>
   );
}

export default Edit;
