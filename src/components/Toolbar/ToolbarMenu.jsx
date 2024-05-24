import styles from "./ToolbarMenu.module.css";

function ToolbarMenu({ children, hide }) {

   return (
      <>
         <div className={styles.toolbar__menu}>
            {children}
         </div>
         <div className={styles.overlay} onClick={hide}></div>
      </>
   );
}

export default ToolbarMenu;
