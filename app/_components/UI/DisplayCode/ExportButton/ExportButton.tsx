"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { HiOutlineDownload } from "react-icons/hi";
import { useRipple } from "../../../../_hooks/useRipple";
import styles from "./ExportButton.module.scss";

type Props = {
   data: string;
   fileName: string;
   extension: string;
};

function ExportButton({ data, fileName, extension }: Props) {
   const btnRef = useRef<HTMLButtonElement>(null);

   useRipple<HTMLButtonElement>(btnRef, 20);

   function download() {
      try {
         const blob = new Blob([data], { type: "text/html" });
         const url = URL.createObjectURL(blob);

         const link = document.createElement("a");
         link.href = url;
         link.download = `${fileName}.${extension}`;

         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         URL.revokeObjectURL(url);
      } catch (err) {
         console.error("Export failed:", err);
         toast.error("Could not download file", { id: "export-html" });
      }
   }

   return (
      <motion.button
         type="button"
         className={styles.export__btn}
         onClick={download}
         ref={btnRef}
         aria-label={`Download ${fileName} as ${extension.toUpperCase()}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
      >
         <HiOutlineDownload />
      </motion.button>
   );
}

export default ExportButton;
