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
   alert?: boolean;
   value?: string;
}

function ToolbarBtn({
   children,
   shortcut,
   onClick,
   disabled = false,
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
   if (type === "delete" && !disabled) className += " " + styles.delete;

   return (
      <button className={className} onClick={handleClick} ref={ref}>
         {children}
         {value && !disabled && (
            <Tooltip>
               {value}{" "}
               {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
            </Tooltip>
         )}
      </button>
   );
}

export default ToolbarBtn;
