"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { TbClipboardText } from "react-icons/tb";
import { useRipple } from "../../../_hooks/useRipple";
import styles from "./Copy.module.scss";

interface Props {
   id: string;
   text: string;
}

function Copy({ id, text }: Props) {
   const btnRef = useRef<HTMLButtonElement>(null);

   useRipple<HTMLButtonElement>(btnRef, 20);

   function copy() {
      navigator.clipboard
         .writeText(text)
         .then(() => {
            toast.success("Copied to clipboard", {
               id,
               position: "top-center",
            });
         })
         .catch((err) => {
            toast.error("Failed to copy to clipboard", {
               id,
               position: "top-center",
            });
            console.error("Clipboard access denied or failed:", err);
         });
   }

   return (
      <button
         type="button"
         className={styles.copy}
         ref={btnRef}
         onClick={() => copy()}
         aria-label="Copy code to clipboard"
      >
         <TbClipboardText />
      </button>
   );
}

export default Copy;
