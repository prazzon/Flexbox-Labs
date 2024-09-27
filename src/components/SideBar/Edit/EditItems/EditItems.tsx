import itemStyles from "../Item.module.scss";
import emptyStyles from "../Empty.module.scss";
import usePlayground from "../../../../hooks/usePlayground";
import Select from "../../../UI/Select/Select";
import TextInput from "../../../UI/TextInput/TextInput";
import { motion } from "framer-motion";

import { FcInfo } from "react-icons/fc";
import {
   TbArrowAutofitHeight,
   TbArrowAutofitWidth,
   TbReorder,
} from "react-icons/tb";
import {
   LuAlignVerticalSpaceAround,
   LuExpand,
   LuScan,
   LuShrink,
} from "react-icons/lu";

function EditItems() {
   const { getItemStyle, selectedItems, editItemStyle } = usePlayground();

   if (!selectedItems.length)
      return (
         <motion.div
            className={emptyStyles.empty}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.1 }}
         >
            <div className={emptyStyles.empty__icon}>
               <FcInfo />
            </div>
            <h3 className={emptyStyles.empty__title}>Select an item</h3>
            <p className={emptyStyles.empty__text}>Select an item to edit</p>
         </motion.div>
      );

   const lastSelectedId = selectedItems[selectedItems.length - 1];

   return (
      <motion.div
         className={itemStyles.container}
         initial={{ scale: 0.99, opacity: 0.8 }}
         animate={{ scale: 1, opacity: 1 }}
         exit={{ scale: 0.99, opacity: 0.8 }}
         transition={{ duration: 0.1 }}
      >
         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <TbReorder />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Order</div>
               <div className={itemStyles.description}>
                  Controls position of a flex item
               </div>
            </div>

            <TextInput
               size="small"
               value={getItemStyle(lastSelectedId, "order")?.toString() || ""}
               type="number"
               onChange={(value) => editItemStyle("order", value)}
            />
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuExpand />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Flex Grow</div>
               <div className={itemStyles.description}>
                  Controls size of an item
               </div>
            </div>
            <TextInput
               size="small"
               value={
                  getItemStyle(lastSelectedId, "flexGrow")?.toString() || ""
               }
               type="number"
               onChange={(value) => editItemStyle("flexGrow", value)}
            />
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuShrink />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Flex Shrink</div>
               <div className={itemStyles.description}>
                  Controls maximum shrink
               </div>
            </div>
            <TextInput
               size="small"
               value={
                  getItemStyle(lastSelectedId, "flexShrink")?.toString() || "1"
               }
               type="number"
               onChange={(value) => editItemStyle("flexShrink", value)}
            />
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuScan />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Flex Basis</div>
               <div className={itemStyles.description}>
                  Sets initial size of an item
               </div>
            </div>
            <TextInput
               size="small"
               value={
                  getItemStyle(lastSelectedId, "flexBasis")?.toString() ||
                  "auto"
               }
               type="unit"
               unitOptions={["auto", "px", "%"]}
               onChange={(value) => editItemStyle("flexBasis", value)}
            />
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuAlignVerticalSpaceAround />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Align Self</div>
               <div className={itemStyles.description}>
                  Aligns item on cross axis
               </div>
            </div>
            <Select
               active={
                  getItemStyle(lastSelectedId, "alignSelf")?.toString() ||
                  "auto"
               }
               onSelect={(value) => editItemStyle("alignSelf", value)}
            >
               <Select.Toggle />
               <Select.Options>
                  <Select.Option value="auto" />
                  <Select.Option value="flex-start" />
                  <Select.Option value="flex-end" />
                  <Select.Option value="center" />
                  <Select.Option value="baseline" />
                  <Select.Option value="stretch" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <TbArrowAutofitWidth />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Width</div>
               <div className={itemStyles.description}>
                  Sets an element's width
               </div>
            </div>
            <TextInput
               size="small"
               value={
                  getItemStyle(lastSelectedId, "width")?.toString() || "auto"
               }
               type="unit"
               unitOptions={["auto", "px", "%"]}
               onChange={(value) => editItemStyle("width", value)}
            />
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <TbArrowAutofitHeight />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Height</div>
               <div className={itemStyles.description}>
                  Sets an element's height
               </div>
            </div>
            <TextInput
               size="small"
               value={
                  getItemStyle(lastSelectedId, "height")?.toString() || "auto"
               }
               type="unit"
               unitOptions={["auto", "px", "%"]}
               onChange={(value) => editItemStyle("height", value)}
            />
         </label>
      </motion.div>
   );
}

export default EditItems;
