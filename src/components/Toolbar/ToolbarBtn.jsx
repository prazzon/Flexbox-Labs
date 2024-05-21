import Tooltip from "../UI/Tooltip";
import styles from "./ToolbarBtn.module.css";

function ToolbarBtn({
   children,
   onClick,
   disabled = false,
   value = "",
   screen = "all",
}) {
   return (
      <button
         className={`${styles.toolbar__btn} ${
            disabled ? styles.disabled : ""
         } ${screen !== "all" ? styles[screen] : ""}`}
         onClick={onClick}
      >
         {children}
         <Tooltip>{value}</Tooltip>
      </button>
   );
}

export default ToolbarBtn;
