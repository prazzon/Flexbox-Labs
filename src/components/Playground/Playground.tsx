import { AnimatePresence } from "framer-motion";
import styles from "./Playground.module.scss";
import usePlayground from "../../hooks/usePlayground";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import PlaygroundItem from "./PlaygroundItem/PlaygroundItem";
import Toolbar from "./Toolbar/Toolbar";
import Snackbar from "./Snackbar/Snackbar";

import { motion } from "framer-motion";
import MainAxisPointer from "./MainAxisPointer/MainAxisPointer";

function Playground() {
   const {
      items,
      container,
      selectedItems,
      toggleSelected,
      toggleAllSelected,
      clearSelected,
   } = usePlayground();

   const ref = useInsideContainerClick(clearSelected);

   return (
      <motion.div
         className={styles.playground}
         ref={ref}
         layout
         layoutId="playground"
      >
         <Toolbar />
         <MainAxisPointer />
         <motion.div
            layout
            className={styles.playground_view}
            id="playground_view"
            style={container}
         >
            <AnimatePresence mode="popLayout">
               {items?.map((item) => (
                  <PlaygroundItem
                     key={item.id}
                     item={item}
                     onClick={() => toggleSelected(item.id)}
                     isSelected={selectedItems.includes(item.id)}
                  />
               ))}
            </AnimatePresence>
         </motion.div>
         <Snackbar
            selectedItems={selectedItems}
            clearSelected={clearSelected}
            toggleAllSelected={toggleAllSelected}
         />
      </motion.div>
   );
}

export default Playground;
