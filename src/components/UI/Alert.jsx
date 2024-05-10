import { useEffect, useState } from "react";
import styles from "./Alert.module.css";
import { createPortal } from "react-dom";

function Alert({ text, duration = 3000, position = "top" }) {
   const [showAlert, setShowAlert] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setShowAlert(false);
      }, duration);
   });

   if (!showAlert) return null;

   return createPortal(
      <div className={`${styles.alert} ${styles[position]}`}>{text}</div>,
      document.body
   );
}

export default Alert;
