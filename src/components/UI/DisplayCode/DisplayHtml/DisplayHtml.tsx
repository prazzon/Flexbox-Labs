import { useRef } from "react";
import usePlayground from "../../../../hooks/usePlayground";
import Copy from "../../Copy/Copy";
import styles from "./DisplayHtml.module.scss";

function DisplayHtml() {
   const { items } = usePlayground();
   const htmlRef = useRef<HTMLPreElement>(null);

   return (
      <>
         <pre className={styles.html__code} ref={htmlRef}>
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
         
         <Copy ref={htmlRef} id="html" />
      </>
   );
}

export default DisplayHtml;
