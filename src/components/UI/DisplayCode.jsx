import styles from "./DisplayCode.module.css";
import { usePlayground } from "../../context/PlaygroundContext";
import { camelToDash } from "../../helpers/helpers";
import Copy from "./Copy";
import { useRef } from "react";

function DisplayCode() {
   const { container, items, defaultItemStyle } = usePlayground();

   const cssRef = useRef();
   const htmlRef = useRef();

   return (
      <>
         <div className={styles.code__container}>
            <div className={styles.container}>
               <div className={styles.container__title}>CSS</div>
               <div className={styles.container__text}>
                  <pre className={styles.css__code} ref={cssRef}>
                     <span className={styles.selector}>.flex</span>
                     {" {"} <br />
                     {Object.keys(container).map((key, index) => (
                        <span key={index}>
                           <span className={styles.property}>
                              {"   "}
                              {camelToDash(key)}:
                           </span>
                           <span className={styles.value}>
                              {" "}
                              {container[key]};
                           </span>
                           <br />
                        </span>
                     ))}
                     {"}"}
                     {items?.map((item, index) => {
                        if (item.styles === defaultItemStyle) return null;

                        return (
                           <span key={index}>
                              <br /> <br />
                              <span className={styles.selector}>
                                 .flex__item:nth-child({index + 1})
                              </span>
                              {" {"} <br />
                              {Object.keys(item.styles).map((key, index) => {
                                 if (item.styles[key] !== defaultItemStyle[key])
                                    return (
                                       <span key={index}>
                                          <span className={styles.property}>
                                             {"   "}
                                             {camelToDash(key)}:
                                          </span>
                                          <span className={styles.value}>
                                             {" "}
                                             {item.styles[key]};
                                          </span>
                                          <br />
                                       </span>
                                    );
                              })}
                              {"}"}
                           </span>
                        );
                     })}
                  </pre>
                  <Copy ref={cssRef} />
               </div>
            </div>
            <div className={styles.container}>
               <div className={styles.container__title}>HTML</div>
               <div className={styles.container__text}>
                  <pre className={styles.html__code} ref={htmlRef}>
                     &lt;
                     <span className={styles.tag}>div</span>
                     <span className={styles.property}> class</span>=
                     <span className={styles.value}>&quot;flex&quot;</span>
                     &gt;
                     {items?.map((item, index) => (
                        <span key={index}>
                           <br />{"   "}&lt;
                           <span className={styles.tag}>div</span>
                           <span className={styles.property}> class</span>=
                           <span className={styles.value}>
                              &quot;flex__item&quot;
                           </span>
                           &gt;
                           {item.text}
                           &lt;/<span className={styles.tag}>div</span>&gt;
                        </span>
                     ))}
                     <br />
                     &lt;/<span className={styles.tag}>div</span>&gt;
                  </pre>
                  <Copy ref={htmlRef} />
               </div>
            </div>
         </div>
      </>
   );
}

export default DisplayCode;
