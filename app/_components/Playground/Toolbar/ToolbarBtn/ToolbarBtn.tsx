"use client";

import { ReactNode, useRef } from "react";
import toast from "react-hot-toast";
import { useRipple } from "../../../../_hooks/useRipple";
import Tooltip from "../../../UI/Tooltip/Tooltip";
import styles from "./ToolbarBtn.module.scss";

interface Props {
   children: ReactNode;
   shortcut?: string;
   onClick?: () => void;
   type?: string;
   disabled?: boolean;
   inActive?: boolean;
   alert?: boolean;
   value?: string;
}

function ToolbarBtn({
   children,
   shortcut,
   onClick,
   disabled = false,
   inActive = false,
   alert = false,
   value = "",
   type,
}: Props) {
   const handleClick = () => {
      if (disabled && alert)
         return toast.error(`Select an item to ${value.toLowerCase()}`, {
            id: value,
         });
      onClick?.();
   };

   const ref = useRef<HTMLButtonElement>(null);

   useRipple<HTMLButtonElement>(ref);

   let className = styles.toolbar__btn;
   if (disabled) className += " " + styles.disabled;
   if (inActive) className += " " + styles.inactive;
   if (type === "delete" && !disabled) className += " " + styles.delete;

   const button = (
      <button
         type="button"
         className={className}
         onClick={handleClick}
         ref={ref}
         aria-label={value ? `${value}` : "Toolbar action"}
      >
         {children}
      </button>
   );

   if (value && !disabled) {
      return (
         <Tooltip
            label={
               <>
                  {value}{" "}
                  {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
               </>
            }
         >
            {button}
         </Tooltip>
      );
   }

   return button;
}

export default ToolbarBtn;
