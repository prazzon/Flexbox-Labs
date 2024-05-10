import style from "./Toolbar.module.css";
import { IoAddCircleOutline, IoDuplicateOutline } from "react-icons/io5";
import { BiSelectMultiple } from "react-icons/bi";
import { LuRedo, LuTrash2, LuUndo } from "react-icons/lu";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { RxReset } from "react-icons/rx";
import { usePlayground } from "../../context/PlaygroundContext";
import DisplayCode from "../UI/DisplayCode";
import Modal from "../UI/Modal";
import Tooltip from "../UI/Tooltip";

function Toolbar() {
   const {
      addItem,
      selectedItems,
      removeItem,
      duplicateItem,
      selectMultiple,
      setSelectMultiple,
      undo,
      redo,
      canUndo,
      canRedo,
      clear,
   } = usePlayground();

   return (
      <div className={style.toolbar}>
         <button onClick={addItem}>
            <IoAddCircleOutline />
            <Tooltip>Add</Tooltip>
         </button>

         <button
            onClick={() => duplicateItem()}
            className={!selectedItems.at(0)?.id ? style.disabled : ""}
         >
            <IoDuplicateOutline />
            <Tooltip>Clone</Tooltip>
         </button>

         <button
            onClick={() => removeItem()}
            className={!selectedItems.at(0)?.id ? style.disabled : ""}
         >
            <LuTrash2 />
            <Tooltip>Delete</Tooltip>
         </button>

         <Modal>
            <Modal.OpenBtn>
               <HiOutlineCodeBracket />
               <Tooltip>Code</Tooltip>
            </Modal.OpenBtn>
            <Modal.Content>
               <DisplayCode />
            </Modal.Content>
         </Modal>

         <button onClick={clear}>
            <RxReset />
            <Tooltip>Reset</Tooltip>
         </button>

         {/* <Modal>
            <Modal.OpenBtn>
               <IoSettingsOutline />
            </Modal.OpenBtn>
            <Modal.Content>Settings code</Modal.Content>
         </Modal> */}

         <button onClick={undo} className={!canUndo ? style.disabled : ""}>
            <LuUndo />
            <Tooltip>Undo</Tooltip>
         </button>

         <button onClick={redo} className={!canRedo ? style.disabled : ""}>
            <LuRedo />
            <Tooltip>Redo</Tooltip>
         </button>

         <label className={style.switch}>
            <BiSelectMultiple />
            <Tooltip>Select Multiple</Tooltip>
            <input
               type="checkbox"
               onChange={(e) => {
                  setSelectMultiple(e.target.checked);
               }}
               checked={selectMultiple}
            />
            <span className={style.slider}></span>
         </label>
      </div>
   );
}

export default Toolbar;
