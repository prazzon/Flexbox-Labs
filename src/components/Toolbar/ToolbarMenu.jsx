import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "./ToolbarMenu.module.css";

function ToolbarMenu({ children, hide }) {
   const ref = useOutsideClick(() => hide());

   return (
      <>
         <div className={styles.toolbar__menu} ref={ref}>
            {children}
         </div>
         <div className={styles.overlay} onClick={() => hide()}></div>
      </>
   );
}

export default ToolbarMenu;
