import usePlayground from "../../hooks/usePlayground";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import { AnimatePresence } from "framer-motion";
import styles from "./Playground.module.css";
import PlaygroundItem from "./PlaygroundItem";

function Playground() {
   const { items, container, selectedItems, toggleSelected, clearSelected } = usePlayground();

   const ref = useInsideContainerClick(() => clearSelected());

   return (
      <div className={styles.playground} style={container} ref={ref}>
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
      </div>
   );
}

export default Playground;
