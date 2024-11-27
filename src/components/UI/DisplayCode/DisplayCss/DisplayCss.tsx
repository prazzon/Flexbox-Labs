import { ItemStyle } from "../../../../context/PlaygroundContext";
import { camelToDash, getKeys } from "../../../../helpers/helpers";
import usePlayground from "../../../../hooks/usePlayground";
import styles from "./DisplayCss.module.scss";

const defaultItemStyle: ItemStyle = {
   order: 0,
   flexGrow: 0,
   flexShrink: 1,
   flexBasis: "auto",
   alignSelf: "auto",
   width: "150px",
   height: "150px",
};

function getNotDefaultStyles(styles: ItemStyle): ItemStyle | false {
   const notDefaultStyles = Object.fromEntries(
      Object.entries(styles).filter(
         ([key, value]) =>
            defaultItemStyle[key as keyof ItemStyle]?.toString() !== value
      )
   );
   return Object.keys(notDefaultStyles).length > 0 ? notDefaultStyles : false;
}

function DisplayCss() {
   const { container, items } = usePlayground();

   return (
      <pre className={styles.css__code}>
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
            const notDefaultStyles = getNotDefaultStyles(item.styles);

            if (!notDefaultStyles) return null;

            return (
               <span key={index}>
                  <br /> <br />
                  <span className={styles.selector}>
                     .flex__item:nth-child({index + 1})
                  </span>
                  {" {"} <br />
                  {getKeys(notDefaultStyles).map((key, index) => {
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
   );
}

export default DisplayCss;
