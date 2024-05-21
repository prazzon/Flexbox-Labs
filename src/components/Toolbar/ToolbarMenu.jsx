import styles from './ToolbarMenu.module.css'

function ToolbarMenu({ children }) {
   
   return (
      <div className={styles.toolbar__menu}>
         {children}
      </div>
   )
}

export default ToolbarMenu
