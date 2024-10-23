import styles from "./Copy.module.scss";
import toast from "react-hot-toast";
import { forwardRef, MutableRefObject } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { useRipple } from "../../../hooks/useRipple";

const Copy = forwardRef<HTMLElement>((_, ref) => {
   const elRef = ref as MutableRefObject<HTMLDivElement>;
   const btnRef = ref as MutableRefObject<HTMLDivElement>;

   useRipple<HTMLDivElement>(btnRef, 20);

   function copy() {
      navigator.clipboard.writeText(elRef.current.innerText).then(() => {
         toast.success("Copied to clipboard", { position: "top-center" });
      });
   }

   return (
      <>
         <div className={styles.copy} ref={btnRef} onClick={() => copy()}>
            <FaRegCopy />
         </div>
      </>
   );
});

Copy.displayName = "Copy";

export default Copy;
