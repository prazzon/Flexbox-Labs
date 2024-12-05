import { useRef } from "react";
import toast from "react-hot-toast";
import { TbClipboardText } from "react-icons/tb";
import { useRipple } from "../../../hooks/useRipple";
import styles from "./Copy.module.scss";

interface Props {
   id: string;
   text: string;
}

function Copy({ id, text }: Props) {
   const btnRef = useRef<HTMLDivElement>(null);

   useRipple<HTMLDivElement>(btnRef, 20);

   function copy() {
      navigator.clipboard.writeText(text).then(() => {
         toast.success("Copied to clipboard", { id, position: "top-center" });
      });
   }

   return (
      <div className={styles.copy} ref={btnRef} onClick={() => copy()}>
         <TbClipboardText />
      </div>
   );
}

Copy.displayName = "Copy";

export default Copy;
