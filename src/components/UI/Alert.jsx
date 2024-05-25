import { useEffect, useState } from "react";
import styles from "./Alert.module.css";
import { createPortal } from "react-dom";

function Alert({ text, duration = 3000, position = "top", handler }) {
   const [showAlert, setShowAlert] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setShowAlert(false);
         handler && handler();
      }, duration);
   });

   if (!showAlert) return null;

   return createPortal(
      <div className={`${styles.container} ${styles[position]}`}>
         <div className={styles.alert}>{text}</div>
      </div>,
      document.body
   );
}

export default Alert;
