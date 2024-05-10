import { createContext, useContext, useState } from "react";
import style from "./Select.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutsideClick";

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
         <div className={style.select} ref={ref}>
            <button className={style.select__button} onClick={toggleOpen}>
               {active.length > 8 ? active.slice(0, 8) + "..." : active}
               <IoIosArrowDown />
            </button>
            {children}
         </div>
      </SelectContext.Provider>
   );
}

function Options({ children }) {
   const { open } = useContext(SelectContext);

   return (
      <div className={`${style.select__options} ${open ? style.active : ""}`}>
         {children}
      </div>
   );
}

function Option({ value }) {
   const { active, select } = useContext(SelectContext);

   return (
      <div
         className={`${style.select__option} ${
            active === value ? style.active : ""
         }`}
         onClick={() => select(value)}
      >
         {value}
      </div>
   );
}

Select.Options = Options;
Select.Option = Option;

export default Select;
