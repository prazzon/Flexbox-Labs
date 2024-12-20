import { FcInfo } from "react-icons/fc";
import styles from "./Empty.module.scss";

function Empty() {
   return (
      <div className={styles.empty}>
         <div className={styles.empty__icon}>
            <FcInfo />
         </div>
         <h3 className={styles.empty__title}>Select an item</h3>
         <p className={styles.empty__text}>Select an item to edit</p>
      </div>
   );
}

export default Empty;
