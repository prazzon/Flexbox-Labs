import usePlayground from "../../../../hooks/usePlayground";
import styles from "./DisplayHtml.module.scss";

function DisplayHtml() {
   const { items } = usePlayground();

   return (
      <pre className={styles.html__code}>
         &lt;
         <span className={styles.tag}>div</span>
         <span className={styles.property}> class</span>=
         <span className={styles.value}>&quot;flex&quot;</span>
         &gt;
         {items?.map((item, index) => (
            <span key={index}>
               <br />
               {"   "}&lt;
               <span className={styles.tag}>div</span>
               <span className={styles.property}> class</span>=
               <span className={styles.value}>&quot;flex__item&quot;</span>
               &gt;
               {item.text}
               &lt;/<span className={styles.tag}>div</span>&gt;
            </span>
         ))}
         <br />
         &lt;/<span className={styles.tag}>div</span>&gt;
      </pre>
   );
}

export default DisplayHtml;
