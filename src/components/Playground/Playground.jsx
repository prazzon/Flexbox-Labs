import { usePlayground } from "../../context/PlaygroundContext";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Playground.module.css";

const itemVariants = {
   hidden: { opacity: 0, scale: 0.95 },
   visible: { opacity: 1, scale: 1 },
};

function Playground() {
   const {
      items,
      container,
      selectedItems,
      toggleSelectedItems,
      clearSelectedItems,
   } = usePlayground();

   const ref = useInsideContainerClick(() => clearSelectedItems());

   return (
      <div className={styles.playground} style={container} ref={ref}>
         <AnimatePresence mode="popLayout">
            {items?.map((item) => (
               <motion.div
                  // className={`${styles.item} ${
                  //    selectedItems.includes(item) ? styles.selected : ""
                  // }`}
                  className={`${styles.item} ${
                     selectedItems.filter((x) => x.id === item.id)[0]?.id
                        ? styles.selected
                        : ""
                  }`}
                  key={item.id}
                  onClick={() => toggleSelectedItems(item.id)}
                  style={item.styles}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
               >
                  <div className={styles.item__text}>{item.text}</div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
}

export default Playground;
