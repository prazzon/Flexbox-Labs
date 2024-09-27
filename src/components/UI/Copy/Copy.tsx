import styles from "./Copy.module.scss";
import toast from "react-hot-toast";
import { forwardRef, MutableRefObject } from "react";
import { FaRegCopy } from "react-icons/fa6";

const Copy = forwardRef<HTMLElement>((_, ref) => {
   const elRef = ref as MutableRefObject<HTMLElement>;

   function copy() {
      navigator.clipboard.writeText(elRef.current.innerText).then(() => {
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
