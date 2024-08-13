import { forwardRef, MutableRefObject } from "react";
import { useRipple } from "../../hooks/useRipple";
import styles from "./PlaygroundItem.module.css";
import { motion } from "framer-motion";
import { ItemStyle } from "../../context/PlaygroundContext";

const itemVariants = {
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
      const elRef = ref as MutableRefObject<HTMLDivElement>;
      
      useRipple<HTMLDivElement>(elRef, 100);

      return (
         <motion.div
            layout
            className={`${styles.item} ${isSelected ? styles.selected : ""}`}
            onClick={onClick}
            style={item.styles}
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileTap={{ scale: 0.99 }}
         >
            <div className={styles.item__text}>{item.text}</div>
         </motion.div>
      );
   }
);

export default PlaygroundItem;
