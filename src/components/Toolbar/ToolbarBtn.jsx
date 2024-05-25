import { useState } from "react";
import Alert from "../UI/Alert";
import Tooltip from "../UI/Tooltip";
import styles from "./ToolbarBtn.module.css";

function ToolbarBtn({
   children,
   onClick,
   disabled = false,
   value = "",
   screen = "all",
}) {
   const [showAlert, setShowAlert] = useState(false);

   const handleClick = () => {
      if (disabled) return setShowAlert(true);
      onClick();
   };

   return (
      <button
         className={`${styles.toolbar__btn} ${
            disabled ? styles.disabled : ""
         } ${screen !== "all" ? styles[screen] : ""}`}
         onClick={handleClick}
      >
         {children}
         {value && <Tooltip>{value}</Tooltip>}
         {showAlert && value !== "Undo" && value !== "Redo" && (
            <Alert
               text={`Select an item to ${value.toLowerCase()}`}
               position="bottom"
               handler={() => setShowAlert(false)}
            />
         )}
      </button>
   );
}

export default ToolbarBtn;
