"use client";

import { ItemConfig } from "@/app/_data/dataTypes";
import { ItemStyle } from "@/app/types";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import itemStyles from "../Item.module.scss";
import Item from "../Item/Item";
import ItemDropdown from "../Item/ItemDropdown";
import Empty from "./Empty/Empty";

interface Props {
   selectedItemStyles: ItemStyle | undefined;
   editItemStyle: (key: keyof ItemStyle, value: string) => void;
   itemsConfig: ItemConfig[];
}

function EditItems({ selectedItemStyles, editItemStyle, itemsConfig }: Props) {
   const isEmpty = Object.keys(selectedItemStyles || {}).length === 0 ? 1 : 0;

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
               {isEmpty ? (
                  <Empty />
               ) : (
                  <ItemsConfig
                     selectedItemStyles={selectedItemStyles}
                     editItemStyle={editItemStyle}
                     itemsConfig={itemsConfig}
                  />
               )}
            </motion.div>
         </AnimatePresence>
      </>
   );
}

function ItemsConfig({
   selectedItemStyles,
   editItemStyle,
   itemsConfig,
}: Props) {
   return (
      <>
         {itemsConfig?.map((item) => (
            <Fragment key={item.key}>
               {item.itemType === "dropdown" && (
                  <ItemDropdown
                     item={item}
                     value={
                        selectedItemStyles?.[
                           item.key as keyof ItemStyle
                        ]?.toString() || item.defaultValue
                     }
                     separator={item.dropDownSeparator || " "}
                     onChange={(key, value) =>
                        editItemStyle(key as keyof ItemStyle, value)
                     }
                  />
               )}

               {!item.itemType && (
                  <Item
                     item={item}
                     value={
                        selectedItemStyles?.[
                           item.key as keyof ItemStyle
                        ]?.toString() || item.defaultValue
                     }
                     onChange={(key, value) =>
                        editItemStyle(key as keyof ItemStyle, value)
                     }
                  />
               )}
            </Fragment>
         ))}
      </>
   );
}

export default EditItems;
