import { useRef } from "react";
import { ItemStyle } from "../../../../context/PlaygroundContext";
import usePlayground from "../../../../hooks/usePlayground";
import Copy from "../../Copy/Copy";
import styles from "./DisplayCss.module.scss";
import { camelToDash, getKeys } from "../../../../helpers/helpers";

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

function DisplayCss() {
   const { container, items } = usePlayground();

   const cssRef = useRef<HTMLPreElement>(null);

   return (
      <>
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
         
         <Copy ref={cssRef} id="css" />
      </>
   );
}

export default DisplayCss;
