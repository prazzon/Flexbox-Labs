import { createContext, useContext, useState } from "react";
import styles from "./Select.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";

const selectVariant = {
   hidden: { y: -10 },
   visible: { y: 0, transition: { duration: 0.1 } },
   exit: { y: -10, opacity: 0 },
};

interface SelectProps {
   children: React.ReactNode;
   active: string;
   onSelect: (value: string) => void;
}

interface ToggleProps {
   title: string;
   maxLength?: number;
}

interface Context {
   open: boolean;
   toggleOpen: () => void;
   select: (value: string) => void;
   active: string;
}

const SelectContext = createContext<Context | null>(null);

function Select({ children, active, onSelect }: SelectProps) {
   const [open, setOpen] = useState(false);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   const select = (value: string) => {
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

function Toggle({ maxLength = 20, title }: ToggleProps) {
   const { toggleOpen, active } = useContext(SelectContext) as Context;

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

function Options({ children }: { children: React.ReactNode }) {
   const { open } = useContext(SelectContext) as Context;

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

function Option({ value }: { value: string }) {
   const { active, select } = useContext(SelectContext) as Context;

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
