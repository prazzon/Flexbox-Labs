import { createContext, useContext, useState } from "react";
import styles from "./Select.module.scss";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { FaCaretDown } from "react-icons/fa";

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
   maxLength?: number;
}

interface Context {
   open: boolean;
   toggleOpen: () => void;
   select: (value: string) => void;
   active: string;
   close: () => void;
}

const SelectContext = createContext<Context | null>(null);

function Select({ children, active, onSelect }: SelectProps) {
   const [open, setOpen] = useState(false);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   const close = () => setOpen(false);

   const select = (value: string) => {
      onSelect(value);
      setOpen(false);
   };

   return (
      <SelectContext.Provider
         value={{ open, toggleOpen, select, active, close }}
      >
         <div className={styles.select}>{children}</div>
      </SelectContext.Provider>
   );
}

function Toggle({ maxLength = 20 }: ToggleProps) {
   const { toggleOpen, active } = useContext(SelectContext) as Context;

   return (
      <>
         <button className={styles.toggle} onClick={toggleOpen}>
            <div className={styles.toggle__text}>
               {active.length > maxLength ? active.slice(0, maxLength) : active}
               <FaCaretDown />
            </div>
         </button>
      </>
   );
}

function Options({ children }: { children: React.ReactNode }) {
   const { open, close } = useContext(SelectContext) as Context;

   const ref = useOutsideClick(() => close());

   return (
      <AnimatePresence>
         {open && (
            <motion.div
               className={`${styles.options}`}
               variants={selectVariant}
               initial="hidden"
               animate="visible"
               exit="exit"
               ref={ref}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}

function Option({ value }: { value: string }) {
   const { active, select, close } = useContext(SelectContext) as Context;

   return (
      <div
         className={styles.option}
         data-active={active === value}
         onClick={() => {
            select(value);
            close();
         }}
      >
         {value}
      </div>
   );
}

Select.Toggle = Toggle;
Select.Options = Options;
Select.Option = Option;

export default Select;
