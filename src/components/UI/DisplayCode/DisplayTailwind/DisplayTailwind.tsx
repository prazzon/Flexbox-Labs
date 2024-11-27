import { ItemStyle } from "../../../../context/PlaygroundContext";
import usePlayground from "../../../../hooks/usePlayground";
import { convertCssToTailwind } from "../../../../utils/cssTailwindConverter";
import styles from "./DisplayTailwind.module.scss";

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

function DisplayTailwind() {
   const { container, items } = usePlayground();

   return (
      <pre className={styles.tailwind__code}>
         &lt;
         <span className={styles.tag}>div</span>
         <span className={styles.property}> class</span>=
         <span className={styles.value}>
            &quot;{convertCssToTailwind(container)}&quot;
         </span>
         &gt;
         {items?.map((item, index) => {
            const notDefaultStyles = getNotDefaultStyles(item.styles);

            return (
               <span key={index}>
                  <br />
                  {"   "}&lt;
                  <span className={styles.tag}>div</span>
                  {notDefaultStyles ? (
                     <>
                        <span className={styles.property}> class</span>=
                        <span className={styles.value}>
                           &quot;{convertCssToTailwind(notDefaultStyles)}
                           &quot;
                        </span>
                     </>
                  ) : null}
                  &gt;
                  {item.text}
                  &lt;/<span className={styles.tag}>div</span>&gt;
               </span>
            );
         })}
         <br />
         &lt;/<span className={styles.tag}>div</span>&gt;
      </pre>
   );
}

export default DisplayTailwind;
