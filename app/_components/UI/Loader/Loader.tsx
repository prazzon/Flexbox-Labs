import styles from "./Loader.module.scss"

export default function Loader() {
   return (
      <div className={styles.loader_container}>
         <div className={styles.loader_box}>
            <div className={styles.loader} />
         </div>
      </div>
   );
}