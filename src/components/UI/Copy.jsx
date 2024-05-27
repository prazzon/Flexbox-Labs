import { FaRegCopy } from "react-icons/fa6";
import styles from "./Copy.module.css";
import { forwardRef } from "react";
import toast from "react-hot-toast";

const Copy = forwardRef((props, ref) => {
   function copy() {
      navigator.clipboard.writeText(ref.current.innerText).then(() => {
         toast.success("Copied to clipboard", { position: "top-center" });
      });
   }

   return (
      <>
         <div className={styles.copy} onClick={() => copy()}>
            <FaRegCopy />
         </div>
      </>
   );
});

Copy.displayName = "Copy";

export default Copy;
