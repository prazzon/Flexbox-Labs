import { useEffect, useRef } from "react";
import styles from "./Tooltip.module.css";

function Tooltip({ children, position="top" }) {
   const ref = useRef();

   function handleHover() {
      ref.current.classList.add(styles.show);
   }

   function handleLeave() {
      ref.current.classList.remove(styles.show);
   }
   
   useEffect(() => {
      const parent = ref.current.parentElement;
      parent.style.position = "relative";

      parent.addEventListener("mouseenter", handleHover);

      parent.addEventListener("mouseleave", handleLeave);

      return () => {
         parent.removeEventListener("mouseenter", handleHover);

         parent.removeEventListener("mouseleave", handleLeave);
      }
   })
   
   return (
      <div ref={ref} className={`${styles.tooltip} ${styles[position]}`}>
         {children}
      </div>
   )
}

export default Tooltip
