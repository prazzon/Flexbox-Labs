"use client";

import { useGrid } from "@/app/_hooks/useGrid";
import { useRipple } from "@/app/_hooks/useRipple";
import { type GridItem } from "@/app/_lib/types/grid";
import { motion } from "framer-motion";
import { forwardRef, MutableRefObject } from "react";
import { MdModeEditOutline } from "react-icons/md";
import styles from "./GridItem.module.scss";

interface GridItemProps {
   item: GridItem;
}

const popIn = {
   hidden: { opacity: 0, scale: 0.85 },
   visible: { opacity: 1, scale: 1 },
};

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
   { item },
   ref
) {
   const { selectedItems, toggleSelected, editItemText } = useGrid();

   const elRef = ref as MutableRefObject<HTMLDivElement>;

   const isSelected = selectedItems.includes(item.id);

   useRipple<HTMLDivElement>(elRef, 100);

   function handleClick(e: React.MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.item)) {
         toggleSelected(item.id);
      }
   }

   return (
      <motion.div
         layout
         variants={popIn}
         initial="hidden"
         animate="visible"
         exit="hidden"
         ref={ref}
         whileTap={{ scale: 0.99 }}
         onClick={handleClick}
         className={`${styles.item} ${isSelected ? styles.selected : ""}`}
         style={item.styles}
      >
         <motion.label
            layout
            transition={{ duration: 0.1 }}
            className={styles.text_container}
         >
            <span className={styles.edit_icon}>
               <MdModeEditOutline />
            </span>
            <div className={styles.text}>{item.text}</div>
            <textarea
               className={styles.input}
               onChange={(e) => editItemText(item.id, e.target.value)}
               onClick={(e) => (e.target as HTMLInputElement).select()}
               value={item.text}
               maxLength={50}
               spellCheck={false}
            />
         </motion.label>
      </motion.div>
   );
});

export default GridItem;
