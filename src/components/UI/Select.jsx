import { createContext, useContext, useState } from "react";
import styles from "./Select.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";

const selectVariant = {
   hidden: { y: -10 },
   visible: { y: 0, transition: { duration: 0.1 } },
   exit: { y: -10, opacity: 0 },
};

const SelectContext = createContext();

function Select({ children, active, onSelect }) {
   const [open, setOpen] = useState(false);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   const select = (value) => {
      onSelect(value);
      setOpen(false);
   };

   const ref = useOutsideClick(() => setOpen(false));

   return (
      <SelectContext.Provider value={{ open, toggleOpen, select, active }}>
         <div className={styles.select} ref={ref}>
            {children}
         </div>
      </SelectContext.Provider>
   );
}

function Toggle({ maxLength, title }) {
   const { toggleOpen, active } = useContext(SelectContext);

   return (
      <button className={styles.select__toggle} onClick={toggleOpen}>
         <div className={styles.select__title}>{title}</div>
         <div className={styles.select__toggle_text}>
            {active.length > maxLength
               ? active.slice(0, maxLength) + "..."
               : active}
            <IoIosArrowDown />
         </div>
      </button>
   );
}

function Options({ children }) {
   const { open } = useContext(SelectContext);

   return (
      <AnimatePresence>
         {open && (
            <motion.div
               className={`${styles.select__options}`}
               variants={selectVariant}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}

function Option({ value }) {
   const { active, select } = useContext(SelectContext);

   return (
      <div
         className={`${styles.select__option} ${
            active === value ? styles.active : ""
         }`}
         onClick={() => select(value)}
      >
         {value}
      </div>
   );
}

Select.Toggle = Toggle;
Select.Options = Options;
Select.Option = Option;

export default Select;
