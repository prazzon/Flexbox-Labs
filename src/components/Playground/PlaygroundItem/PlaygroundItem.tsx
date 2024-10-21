import { forwardRef, MutableRefObject } from "react";
import { useRipple } from "../../../hooks/useRipple";
import styles from "./PlaygroundItem.module.scss";
import { motion } from "framer-motion";
import { ItemStyle } from "../../../context/PlaygroundContext";
import usePlayground from "../../../hooks/usePlayground";
import { MdModeEditOutline } from "react-icons/md";

const popIn = {
   hidden: { opacity: 0, scale: 0.85 },
   visible: { opacity: 1, scale: 1 },
};

interface Props {
   item: {
      id: number;
      text: string;
      styles: ItemStyle;
   };
   isSelected: boolean;
   onClick: () => void;
}

const PlaygroundItem = forwardRef<HTMLDivElement, Props>(
   function PlaygroundItem({ item, isSelected, onClick }, ref) {
      const { editItemText } = usePlayground();

      const elRef = ref as MutableRefObject<HTMLDivElement>;

      useRipple<HTMLDivElement>(elRef, 100);

      function handleClick(e: React.MouseEvent) {
         const target = e.target as HTMLElement;
         if (target.classList.contains(styles.item)) {
            onClick();
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
   }
);

export default PlaygroundItem;
