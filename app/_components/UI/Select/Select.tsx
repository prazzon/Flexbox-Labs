"use client";

import { AnimatePresence, motion } from "motion/react";
import {
   createContext,
   useContext,
   useId,
   useState,
   type KeyboardEvent,
} from "react";
import { FaCaretDown } from "react-icons/fa";
import { useOutsideClick } from "../../../_hooks/useOutsideClick";
import styles from "./Select.module.scss";

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

interface Context {
   open: boolean;
   toggleOpen: () => void;
   select: (value: string) => void;
   active: string;
   close: () => void;
   listboxId: string;
}

const SelectContext = createContext<Context | null>(null);

function Select({ children, active, onSelect }: SelectProps) {
   const [open, setOpen] = useState(false);
   const listboxId = useId();

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
         value={{
            open,
            toggleOpen,
            select,
            active,
            close,
            listboxId,
         }}
      >
         <div className={styles.select}>{children}</div>
      </SelectContext.Provider>
   );
}

function Toggle() {
   const { toggleOpen, active, open, listboxId } = useContext(
      SelectContext,
   ) as Context;

   return (
      <button
         type="button"
         className={styles.toggle}
         onClick={toggleOpen}
         aria-haspopup="listbox"
         aria-expanded={open}
         aria-controls={listboxId}
      >
         <div className={styles.toggle__text}>
            <p>{active}</p>
            <FaCaretDown aria-hidden />
         </div>
      </button>
   );
}

function Options({ children }: { children: React.ReactNode }) {
   const { open, close, listboxId } = useContext(SelectContext) as Context;

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
               role="listbox"
               id={listboxId}
               aria-label="Options"
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}

function Option({ value }: { value: string }) {
   const { active, select, open } = useContext(SelectContext) as Context;

   const selected = active === value;

   function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         select(value);
      }
   }

   return (
      <div
         role="option"
         aria-selected={selected}
         tabIndex={open ? 0 : -1}
         className={styles.option}
         data-active={selected}
         onClick={() => select(value)}
         onKeyDown={onKeyDown}
      >
         {value}
      </div>
   );
}

Select.Toggle = Toggle;
Select.Options = Options;
Select.Option = Option;

export default Select;
