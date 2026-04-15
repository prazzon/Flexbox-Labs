"use client";

import { useRipple } from "@/app/_hooks/useRipple";
import useSettings from "@/app/_hooks/useSettings";
import {
   editItemText,
   selectSelectedItems,
   toggleSelected,
} from "@/app/_lib/features/flexbox/flexboxSlice";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { type FlexboxItem } from "@/app/_lib/types/flexbox";
import { createSelector } from "@reduxjs/toolkit";
import { motion } from "motion/react";
import { forwardRef, MutableRefObject, useCallback, useMemo } from "react";
import { MdModeEditOutline } from "react-icons/md";
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
   ref,
) {
   const dispatch = useAppDispatch();
   const { selectMultiple } = useSettings();

   // Create a memoized selector for this specific item's selection status
   // This prevents re-renders when other items change
   const selectIsItemSelected = useMemo(
      () =>
         createSelector([selectSelectedItems], (selectedItems) =>
            selectedItems.includes(item.id),
         ),
      [item.id],
   );
   const isSelected = useAppSelector(selectIsItemSelected);

   const elRef = ref as MutableRefObject<HTMLDivElement>;

   useRipple<HTMLDivElement>(elRef, 100);

   const handleEditText = useCallback(
      (value: string) => {
         dispatch(editItemText({ id: item.id, value }));
      },
      [dispatch, item.id],
   );

   const handleToggle = useCallback(() => {
      dispatch(toggleSelected({ id: item.id, selectMultiple }));
   }, [dispatch, item.id, selectMultiple]);

   function handleClick(e: React.MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.item)) {
         handleToggle();
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
         <label className={styles.checkbox} aria-label="Select item checkbox">
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
               onChange={(e) => handleEditText(e.target.value)}
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
