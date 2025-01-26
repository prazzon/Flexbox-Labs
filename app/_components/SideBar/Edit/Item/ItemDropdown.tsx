"use client";

import Popover from "@/app/_components/UI/Popover/Popover";
import TextInput from "@/app/_components/UI/TextInput/TextInput";
import { ContainerConfig, ItemConfig } from "@/app/_data/dataTypes";
import { Container, ItemStyle } from "@/app/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import styles from "../Item.module.scss";

interface Props {
   item: ContainerConfig | ItemConfig;
   value: string;
   separator: string;
   onChange: (key: keyof Container | keyof ItemStyle, value: string) => void;
}

const Item = ({ item, value, separator, onChange }: Props) => {
   const [currValue, setCurrValue] = useState(value);
   const [open, setOpen] = useState(false);

   const key = item.key as keyof Container;
   const valueItems = currValue.split(separator);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   function addValue(value: string) {
      onChange(key, currValue + separator + value);
   }

   function setValue(position: number, value: string) {
      const values = currValue.split(separator);
      values[position] = value;
      onChange(key, values.join(separator));
   }

   function deleteValue(position: number) {
      const values = currValue.split(separator);
      values.splice(position, 1);
      onChange(key, values.join(separator));
   }

   useEffect(() => {
      setCurrValue(value);
   }, [value]);

   if (item.itemType !== "dropdown") {
      return;
   }

   return (
      <>
         <motion.label
            className={styles.item}
            key={item.key}
            layout
            onClick={toggleOpen}
         >
            <div className={styles.icon}>
               <item.icon />
            </div>
            <div className={styles.text}>
               <div className={styles.title}>{item.title}</div>

               <div className={styles.value}>
                  <p>{currValue}</p>
                  <FaCaretDown />
               </div>
            </div>
            <span className={styles.info}>
               <FaInfo />
               <Popover position="bottom">{item.description}</Popover>
            </span>
         </motion.label>

         <AnimatePresence mode="popLayout">
            {open && (
               <motion.div
                  className={styles.dropdown}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
               >
                  <AnimatePresence mode="popLayout" initial={false}>
                     {item.dropDownType === "iteration" &&
                        valueItems.map((value, i) => (
                           <motion.label
                              className={styles.dropdown_item}
                              key={i}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.3 }}
                              layout
                           >
                              <div className={styles.dropdown_title}>
                                 {item.placeholder} {i + 1}
                              </div>
                              {item.type === "input" &&
                                 item.inputType === "unit" && (
                                    <TextInput
                                       size="small"
                                       value={value}
                                       type={item.inputType}
                                       unitOptions={item.unitOptions}
                                       onChange={(value) => setValue(i, value)}
                                    />
                                 )}
                              <button
                                 className={styles.delete_btn}
                                 onClick={() => deleteValue(i)}
                                 disabled={valueItems.length <= 1}
                              >
                                 <TiDelete />
                              </button>
                           </motion.label>
                        ))}

                     {item.dropDownType === "combine" &&
                        item.combineData.map((value, i) => (
                           <motion.label
                              className={styles.dropdown_item}
                              key={i}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.3 }}
                              layout
                           >
                              <div className={styles.dropdown_title}>
                                 {value.title}
                              </div>
                              {item.type === "input" &&
                                 item.inputType === "unit" && (
                                    <TextInput
                                       size="small"
                                       value={valueItems[i]}
                                       type={item.inputType}
                                       unitOptions={item.unitOptions}
                                       onChange={(value) => setValue(i, value)}
                                    />
                                 )}

                              {item.type === "input" &&
                                 item.inputType === "number" && (
                                    <TextInput
                                       size="small"
                                       value={valueItems[i]}
                                       type={item.inputType}
                                       step={item.step}
                                       onChange={(value) => setValue(i, value)}
                                    />
                                 )}
                           </motion.label>
                        ))}
                  </AnimatePresence>
                  {item.dropDownType === "iteration" && (
                     <button
                        className={styles.add_btn}
                        onClick={() => addValue("1fr")}
                     >
                        <MdAddCircleOutline />
                        Add
                     </button>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
};

export default Item;
