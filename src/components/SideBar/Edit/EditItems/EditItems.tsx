import { motion } from "framer-motion";
import usePlayground from "../../../../hooks/usePlayground";
import Select from "../../../UI/Select/Select";
import TextInput from "../../../UI/TextInput/TextInput";
import emptyStyles from "../Empty.module.scss";
import itemStyles from "../Item.module.scss";

import { FcInfo } from "react-icons/fc";
import { itemsConfig } from "./itemsConfig";

function EditItems() {
   const { getItemStyle, selectedItems, editItemStyle } = usePlayground();

   if (!selectedItems.length) {
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
   }

   const lastSelectedId = selectedItems[selectedItems.length - 1];

   return (
      <motion.div
         className={itemStyles.container}
         initial={{ scale: 0.99, opacity: 0.8 }}
         animate={{ scale: 1, opacity: 1 }}
         exit={{ scale: 0.99, opacity: 0.8 }}
         transition={{ duration: 0.1 }}
      >
         {itemsConfig.map((item) => (
            <label className={itemStyles.item} key={item.key}>
               <div className={itemStyles.icon}>
                  <item.icon />
               </div>
               <div className={itemStyles.text}>
                  <div className={itemStyles.title}>{item.title}</div>
                  <div className={itemStyles.description}>
                     {item.description}
                  </div>
               </div>
               {item.type === "select" ? (
                  <Select
                     active={
                        getItemStyle(lastSelectedId, item.key)?.toString() ||
                        item.defaultValue
                     }
                     onSelect={(value) => editItemStyle(item.key, value)}
                  >
                     <Select.Toggle />
                     <Select.Options>
                        {item.options.map((option) => (
                           <Select.Option value={option} key={option} />
                        ))}
                     </Select.Options>
                  </Select>
               ) : null}

               {item.type === "input" && item.inputType === "unit" ? (
                  <TextInput
                     size="small"
                     value={
                        getItemStyle(lastSelectedId, item.key)?.toString() ||
                        item.defaultValue
                     }
                     type={item.inputType}
                     unitOptions={item.unitOptions}
                     onChange={(value) => editItemStyle(item.key, value)}
                  />
               ) : null}

               {item.type === "input" && item.inputType === "number" ? (
                  <TextInput
                     size="small"
                     value={
                        getItemStyle(lastSelectedId, item.key)?.toString() ||
                        item.defaultValue
                     }
                     type={item.inputType}
                     step={item.step}
                     onChange={(value) => editItemStyle(item.key, value)}
                  />
               ) : null}
            </label>
         ))}
      </motion.div>
   );
}

export default EditItems;
