import { AnimatePresence, motion } from "framer-motion";
import usePlayground from "../../../../hooks/usePlayground";
import Select from "../../../UI/Select/Select";
import TextInput from "../../../UI/TextInput/TextInput";
import itemStyles from "../Item.module.scss";
import Empty from "./Empty/Empty";
import { itemsConfig } from "./itemsConfig";

function EditItems() {
   const { selectedItems } = usePlayground();
   const isEmpty = selectedItems.length === 0 ? 1 : 0;

   return (
      <>
         <AnimatePresence mode="wait">
            <motion.div
               key={isEmpty}
               className={itemStyles.wrapper}
               animate={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 5 }}
               exit={{ opacity: 0, y: -5 }}
               transition={{ duration: 0.15 }}
            >
               {isEmpty ? <Empty /> : <ItemsConfig />}
            </motion.div>
         </AnimatePresence>
      </>
   );
}

function ItemsConfig() {
   const { getItemStyle, selectedItems, editItemStyle } = usePlayground();
   const lastSelectedId = selectedItems[selectedItems.length - 1];

   return (
      <>
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
      </>
   );
}

export default EditItems;
