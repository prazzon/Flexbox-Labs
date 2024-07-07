import { usePlayground } from "../../context/PlaygroundContext";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import { AnimatePresence } from "framer-motion";
import styles from "./Playground.module.css";
import PlaygroundItem from "./PlaygroundItem";

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
               <PlaygroundItem
                  key={item.id}
                  item={item}
                  onClick={() => toggleSelectedItems(item.id)}
                  isSelected={
                     selectedItems.filter((x) => x.id === item.id)[0]?.id
                     // selectedItems.includes(item)
                  }
               />
            ))}
         </AnimatePresence>
      </div>
   );
}

export default Playground;
