import { AnimatePresence, motion } from "framer-motion";
import styles from "./Snackbar.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { TbCopyCheck } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import Tooltip from "../../UI/Tooltip/Tooltip";

type Props = {
   clearSelected: () => void;
   toggleAllSelected: () => void;
   selectedItems: number[];
};

function Snackbar({ selectedItems, clearSelected, toggleAllSelected }: Props) {
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
