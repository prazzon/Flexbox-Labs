import styles from "./DisplayCode.module.scss";
import { useRef } from "react";
import Copy from "../Copy/Copy";
import usePlayground from "../../../hooks/usePlayground";
import { camelToDash, getKeys } from "../../../helpers/helpers";
import { ItemStyle } from "../../../context/PlaygroundContext";

const defaultItemStyle: ItemStyle = {
   order: 0,
   flexGrow: 0,
   flexShrink: 1,
   flexBasis: "auto",
   alignSelf: "auto",
   width: "150px",
   height: "150px",
};

function isDefaultItemStyle(styles: ItemStyle) {
   for (const key in styles) {
      if (
         defaultItemStyle[key as keyof ItemStyle]?.toString() !==
         styles[key as keyof ItemStyle]
      ) {
         return false;
      }
   }

   return true;
}

function DisplayCode() {
   const { container, items } = usePlayground();

   const cssRef = useRef<HTMLPreElement>(null);
   const htmlRef = useRef<HTMLPreElement>(null);

   return (
      <>
         <div className={styles.container}>
            <div className={styles.code__container}>
               <h3 className={styles.code__container_title}>CSS</h3>
               <div className={styles.code__container_text}>
                  <pre className={styles.css__code} ref={cssRef}>
                     <span className={styles.selector}>.flex</span>
                     {" {"} <br />
                     {getKeys(container).map((key, index) => (
                        <span key={index}>
                           <span className={styles.property}>
                              {"   "}
                              {camelToDash(key)}:
                           </span>
                           <span className={styles.value}>
                              {" "}
                              {container[key]}
                              {";"}
                           </span>
                           <br />
                        </span>
                     ))}
                     {"}"}
                     {items?.map((item, index) => {
                        if (isDefaultItemStyle(item.styles)) return null;

                        return (
                           <span key={index}>
                              <br /> <br />
                              <span className={styles.selector}>
                                 .flex__item:nth-child({index + 1})
                              </span>
                              {" {"} <br />
                              {getKeys(item.styles).map((key, index) => {
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
            <div className={styles.code__container}>
               <h3 className={styles.code__container_title}>HTML</h3>
               <div className={styles.code__container_text}>
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
