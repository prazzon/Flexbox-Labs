import styles from "./Toolbar.module.scss";
import usePlayground from "../../../hooks/usePlayground";
import ToolbarBtn from "./ToolbarBtn/ToolbarBtn";
import { LuRedo, LuTrash2, LuUndo } from "react-icons/lu";
import { HiOutlineDuplicate } from "react-icons/hi";
import { VscDebugRestart } from "react-icons/vsc";
import { motion } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";
import { useKeyPress } from "../../../hooks/useKeyPress";

function Toolbar() {
   const {
      addItem,
      selectedItems,
      removeItem,
      duplicateItem,
      undoAction: undo,
      redoAction: redo,
      canUndo,
      canRedo,
      resetContainer,
   } = usePlayground();

   const emptySelected = selectedItems.length === 0;

   useKeyPress("ctrlKey + a", addItem);
   useKeyPress("ctrlKey + z", undo, { condition: canUndo });
   useKeyPress("ctrlKey + y", redo, { condition: canRedo });
   useKeyPress("ctrlKey + d", duplicateItem, { condition: !emptySelected });
   useKeyPress("ctrlKey + x", removeItem, { condition: !emptySelected });
   useKeyPress("ctrlKey + shiftKey + r", resetContainer);

   return (
      <motion.div layout className={styles.toolbar}>
         <ToolbarBtn value="Add" onClick={addItem}>
            <IoAddOutline />
         </ToolbarBtn>

         <hr className={styles.divider} />

         <ToolbarBtn
            value="Duplicate"
            onClick={duplicateItem}
            disabled={emptySelected}
            alert={true}
         >
            <HiOutlineDuplicate />
         </ToolbarBtn>

         <ToolbarBtn
            value="Delete"
            onClick={removeItem}
            disabled={emptySelected}
            alert={true}
            type="delete"
         >
            <LuTrash2 />
         </ToolbarBtn>

         <ToolbarBtn value="Reset" onClick={resetContainer}>
            <VscDebugRestart />
         </ToolbarBtn>

         <hr className={styles.divider} />

         <ToolbarBtn value="Undo" onClick={undo} disabled={!canUndo}>
            <LuUndo />
         </ToolbarBtn>

         <ToolbarBtn value="Redo" onClick={redo} disabled={!canRedo}>
            <LuRedo />
         </ToolbarBtn>
      </motion.div>
   );
}

export default Toolbar;
