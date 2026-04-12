"use client";

import { useRipple } from "@/app/_hooks/useRipple";
import useSettings from "@/app/_hooks/useSettings";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { motion } from "motion/react";
import {
   CSSProperties,
   forwardRef,
   MutableRefObject,
   useCallback,
} from "react";
import { MdModeEditOutline } from "react-icons/md";
import styles from "./PlaygroundItem.module.scss";

interface PlaygroundItemBase {
   id: string;
   text: string;
   styles: CSSProperties;
}

export interface PlaygroundItemProps<T extends PlaygroundItemBase> {
   item: T;
   itemStyles: string;
   selectedItemsSelector: (state: unknown) => string[];
   editItemTextAction: ActionCreatorWithPayload<{ id: string; value: string }>;
   toggleSelectedAction: ActionCreatorWithPayload<{
      id: string;
      selectMultiple: boolean;
   }>;
}

const popIn = {
   hidden: { opacity: 0, scale: 0.85 },
   visible: { opacity: 1, scale: 1 },
};

function PlaygroundItemFactory<T extends PlaygroundItemBase>() {
   return forwardRef<HTMLDivElement, PlaygroundItemProps<T>>(
      function PlaygroundItem(
         {
            item,
            itemStyles,
            selectedItemsSelector,
            editItemTextAction,
            toggleSelectedAction,
         },
         ref,
      ) {
         const dispatch = useAppDispatch();
         const { selectMultiple } = useSettings();
         const isSelected = useAppSelector((state) => {
            const items = selectedItemsSelector(state);
            return items.includes(item.id);
         });

         const elRef = ref as MutableRefObject<HTMLDivElement>;

         useRipple<HTMLDivElement>(elRef, 100);

         const handleEditText = useCallback(
            (value: string) => {
               dispatch(editItemTextAction({ id: item.id, value }));
            },
            [dispatch, item.id, editItemTextAction],
         );

         const handleToggle = useCallback(() => {
            dispatch(toggleSelectedAction({ id: item.id, selectMultiple }));
         }, [dispatch, item.id, selectMultiple, toggleSelectedAction]);

         function handleClick(e: React.MouseEvent) {
            const target = e.target as HTMLElement;
            if (target.classList.contains(itemStyles)) {
               handleToggle();
            }
         }

         return (
            <motion.div
               layout
               className={`${itemStyles} ${isSelected ? styles.selected : ""}`}
               onClick={handleClick}
               style={item.styles}
               ref={ref}
               variants={popIn}
               initial="hidden"
               animate="visible"
               exit="hidden"
               whileTap={{ scale: 0.99 }}
            >
               <label
                  className={styles.checkbox}
                  aria-label="Select item checkbox"
               >
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
      },
   );
}

export default PlaygroundItemFactory;
