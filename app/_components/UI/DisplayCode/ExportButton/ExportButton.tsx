"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
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
      const blob = new Blob([data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${extension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
   }

   return (
      <motion.button
         className={styles.export__btn}
         onClick={download}
         ref={btnRef}
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
