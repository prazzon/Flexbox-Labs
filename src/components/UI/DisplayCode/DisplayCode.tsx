import styles from "./DisplayCode.module.scss";
import DisplayCss from "./DisplayCss/DisplayCss";
import DisplayHtml from "./DisplayHtml/DisplayHtml";

function DisplayCode() {
   return (
      <>
         <div className={styles.container}>
            <div className={styles.code__container}>
               <h3 className={styles.code__container_title}>CSS</h3>
               <div className={styles.code__container_text}>
                  <DisplayCss />
               </div>
            </div>
            <div className={styles.code__container}>
               <h3 className={styles.code__container_title}>HTML</h3>
               <div className={styles.code__container_text}>
                  <DisplayHtml />
               </div>
            </div>
         </div>
      </>
   );
}

export default DisplayCode;
