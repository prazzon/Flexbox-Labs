import styles from "./Loader.module.scss";

export default function Loader() {
   return (
      <div
         className={styles.loader_container}
         role="status"
         aria-live="polite"
         aria-busy="true"
      >
         <span className={styles.visuallyHidden}>Loading…</span>
         <div className={styles.loader_box} aria-hidden>
            <div className={styles.loader} />
         </div>
      </div>
   );
}