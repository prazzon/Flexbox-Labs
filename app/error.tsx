"use client";

import { useEffect } from "react";
import styles from "./error.module.scss";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className={styles.wrap} role="alert">
         <h1 className={styles.title}>Something went wrong</h1>
         <p className={styles.message}>
            {error.message || "An unexpected error occurred."}
         </p>
         <button type="button" className={styles.retry} onClick={reset}>
            Try again
         </button>
      </div>
   );
}
