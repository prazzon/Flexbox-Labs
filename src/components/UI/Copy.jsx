import { FaRegCopy } from "react-icons/fa6";
import styles from "./Copy.module.css";
import { forwardRef, useState } from "react";
import Alert from "./Alert";

const duration = 3000;

const Copy = forwardRef((props, ref) => {
   const [copied, setCopied] = useState(false);

   function copy() {
      setCopied(false);
      navigator.clipboard.writeText(ref.current.innerText).then(() => {
         setCopied(true);
      });
   }

   return (
      <>
         <div className={styles.copy} onClick={() => copy()}>
            <FaRegCopy />
         </div>
         {copied && <Alert text="Copied!" duration={duration} />}
      </>
   );
});

Copy.displayName = "Copy";

export default Copy;
