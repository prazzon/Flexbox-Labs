import { ReactNode, useRef } from "react";
import Tooltip from "../UI/Tooltip/Tooltip";
import styles from "./ToolbarBtn.module.css";
import toast from "react-hot-toast";
import { useRipple } from "../../hooks/useRipple";

interface Props {
   children: ReactNode;
   onClick?: () => void;
   disabled?: boolean;
   alert?: boolean;
   value?: string;
   screen?: string;
}

function ToolbarBtn({
   children,
   onClick,
   disabled = false,
   alert = false,
   value = "",
   screen = "all",
}: Props) {
   const handleClick = () => {
      if (disabled && alert)
         return toast.error(`Select an item to ${value.toLowerCase()}`);
      onClick?.();
   };

   const ref = useRef<HTMLButtonElement>(null);

   useRipple<HTMLButtonElement>(ref);

   return (
      <button
         className={`${styles.toolbar__btn} ${
            disabled ? styles.disabled : ""
         } ${screen !== "all" ? styles[screen] : ""}`}
         onClick={handleClick}
         ref={ref}
      >
         {children}
         {value && <Tooltip>{value}</Tooltip>}
      </button>
   );
}

export default ToolbarBtn;
