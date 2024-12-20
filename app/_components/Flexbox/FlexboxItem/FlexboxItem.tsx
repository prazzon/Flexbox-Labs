"use client";

import { motion } from "framer-motion";
import { forwardRef, MutableRefObject } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useFlexbox } from "@/app/_hooks/useFlexbox";
import { useRipple } from "../../../_hooks/useRipple";
import { type FlexboxItem } from "../../../_lib/types/flexbox";
import styles from "./FlexboxItem.module.scss";

const popIn = {
   hidden: { opacity: 0, scale: 0.85 },
   visible: { opacity: 1, scale: 1 },
};

interface Props {
   item: FlexboxItem;
}

const FlexboxItem = forwardRef<HTMLDivElement, Props>(function FlexboxItem(
   { item },
   ref
) {
   const { selectedItems, toggleSelected, editItemText } = useFlexbox();

   const isSelected = selectedItems.includes(item.id);

   const elRef = ref as MutableRefObject<HTMLDivElement>;

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
         className={styles.item}
         onClick={handleClick}
         style={item.styles}
         ref={ref}
         variants={popIn}
         initial="hidden"
         animate="visible"
         exit="hidden"
         whileTap={{ scale: 0.99 }}
      >
         <label className={styles.checkbox}>
            <input checked={isSelected} type="checkbox" readOnly />
            <div className={styles.checkmark}></div>
         </label>
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

export default FlexboxItem;
