import { IoAddOutline } from "react-icons/io5";
import { LuRedo, LuTrash2, LuUndo } from "react-icons/lu";
import { VscDebugRestart } from "react-icons/vsc";
import Toolbar, { ToolbarDivider } from "../../../Playground/Toolbar/Toolbar";
import ToolbarBtn from "../../../Playground/Toolbar/ToolbarBtn/ToolbarBtn";
import { getOS } from "@/app/_helpers/helpers";
import { useGrid } from "@/app/_hooks/useGrid";

export default function FlexboxToolbar() {
   const {
      addItem,
      removeItem,
      resetContainer,
      selectedItems,
      undo,
      redo,
      canUndo,
      canRedo,
   } = useGrid();

   const emptySelected = selectedItems.length === 0;
   const OS = getOS();

   return (
      <Toolbar>
         <ToolbarBtn
            value="Add"
            shortcut={OS === "Mac" ? "cmd + a" : "ctrl + a"}
            onClick={addItem}
         >
            <IoAddOutline />
         </ToolbarBtn>

         <ToolbarDivider />

         <ToolbarBtn
            value="Delete"
            shortcut={OS === "Mac" ? "cmd + x" : "ctrl + x"}
            onClick={removeItem}
            disabled={emptySelected}
            alert={true}
            type="delete"
         >
            <LuTrash2 />
         </ToolbarBtn>

         <ToolbarBtn
            value="Reset"
            shortcut={OS === "Mac" ? "cmd + shift + r" : "ctrl + shift + r"}
            onClick={resetContainer}
         >
            <VscDebugRestart />
         </ToolbarBtn>

         <ToolbarDivider />

         <ToolbarBtn
            value="Undo"
            shortcut={OS === "Mac" ? "cmd + z" : "ctrl + z"}
            onClick={undo}
            disabled={!canUndo}
         >
            <LuUndo />
         </ToolbarBtn>

         <ToolbarBtn
            value="Redo"
            shortcut={OS === "Mac" ? "cmd + y" : "ctrl + y"}
            onClick={redo}
            disabled={!canRedo}
         >
            <LuRedo />
         </ToolbarBtn>
      </Toolbar>
   );
}
