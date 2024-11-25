import styles from "./Copy.module.scss";
import toast from "react-hot-toast";
import { forwardRef, MutableRefObject, useRef } from "react";
import { useRipple } from "../../../hooks/useRipple";
import { TbClipboardText } from "react-icons/tb";

interface Props {
   id: string;
}

const Copy = forwardRef<HTMLElement, Props>(({ id }, ref) => {
   const elRef = ref as MutableRefObject<HTMLDivElement>;
   const btnRef = useRef<HTMLDivElement>(null);

   useRipple<HTMLDivElement>(btnRef, 20);

   function copy() {      
      navigator.clipboard.writeText(elRef.current.innerText).then(() => {
         toast.success("Copied to clipboard", { id, position: "top-center" });
      });
   }

   return (
      <>
         <div className={styles.copy} ref={btnRef} onClick={() => copy()}>
            <TbClipboardText />
         </div>
      </>
   );
});

Copy.displayName = "Copy";

export default Copy;
