import { HiOutlineDuplicate } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { LuRedo, LuTrash2, LuUndo } from "react-icons/lu";
import { VscDebugRestart } from "react-icons/vsc";
import { useFlexbox } from "../../../_hooks/useFlexbox";
import Toolbar, { ToolbarDivider } from "../../Playground/Toolbar/Toolbar";
import ToolbarBtn from "../../Playground/Toolbar/ToolbarBtn/ToolbarBtn";
import { getOS } from "@/app/_helpers/helpers";

export default function FlexboxToolbar() {
   const {
      addItem,
      duplicateItem,
      removeItem,
      resetContainer,
      selectedItems,
      undo,
      redo,
      canUndo,
      canRedo,
   } = useFlexbox();

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
            value="Duplicate"
            shortcut={OS === "Mac" ? "cmd + d" : "ctrl + d"}
            onClick={duplicateItem}
            disabled={emptySelected}
            alert={true}
         >
            <HiOutlineDuplicate />
         </ToolbarBtn>

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
