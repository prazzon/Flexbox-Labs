import { usePlayground } from "../../context/PlaygroundContext";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import styles from "./Playground.module.css";

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
         {items?.map((item) => (
            <div
               className={`${styles.item} ${
                  selectedItems.filter((x) => x.id === item.id)[0]?.id
                     ? styles.selected
                     : ""
               }`}
               key={item.id}
               onClick={() => toggleSelectedItems(item.id)}
               style={item.styles}
            >
               <div className={styles.item__text}>{item.text}</div>
            </div>
         ))}
      </div>
   );
}

export default Playground;
