"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbCopyCheck } from "react-icons/tb";
import Tooltip from "../../UI/Tooltip/Tooltip";
import styles from "./Snackbar.module.scss";

interface SnackbarProps {
   selectedItems: number[];
   toggleAllSelected: () => void;
   clearSelected: () => void;
}

function Snackbar({
   selectedItems,
   toggleAllSelected,
   clearSelected,
}: SnackbarProps) {
   return (
      <AnimatePresence>
         {selectedItems.length > 0 && (
            <motion.div
               layout
               className={styles.snackbar}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               transition={{ duration: 0.2, layout: { duration: 0.3 } }}
            >
               <p className={styles.count}>
                  <FaCheckCircle />
                  {selectedItems.length} item
                  {selectedItems.length > 1 && "s"} selected
               </p>
               <button
                  className={styles.btn}
                  onClick={() => toggleAllSelected()}
               >
                  <TbCopyCheck />
                  <Tooltip position="top">Select All</Tooltip>
               </button>

               <hr className={styles.divider} />

               <button className={styles.btn} onClick={clearSelected}>
                  <IoClose />
                  <Tooltip position="top">Close</Tooltip>
               </button>
            </motion.div>
         )}
      </AnimatePresence>
   );
}

export default Snackbar;
