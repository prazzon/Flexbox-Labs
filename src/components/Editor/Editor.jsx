import { IoMdQrScanner } from "react-icons/io";
import styles from "./Editor.module.css";
import { GoContainer } from "react-icons/go";
import Select from "../UI/Select";
import { usePlayground } from "../../context/PlaygroundContext";
import TextInput from "../UI/TextInput";
import { AnimatePresence, motion } from "framer-motion";

const containerVariants = {
   hidden: { scale: 0.99 },
   visible: { scale: 1, transition: { duration: 0.1 } },
};

function Editor() {
   const {
      getItem,
      getItemStyle,
      editContainer,
      selectedItems,
      editItem,
      editItemStyle,
      container,
   } = usePlayground();

   const lastSelectedId = selectedItems?.at(-1);

   return (
      <div className={styles.editor}>
         <div className={styles.tabs}>
            <div
               className={`${styles.tab} ${!lastSelectedId ? styles.active : ""}`}
            >
               <GoContainer /> Container
            </div>
            <div
               className={`${styles.tab} ${lastSelectedId ? styles.active : ""}`}
            >
               <IoMdQrScanner />
               {selectedItems.length > 1
                  ? `Item(${selectedItems.length})`
                  : "Item"}
            </div>
         </div>

         <div className={styles.container}>
            <AnimatePresence mode="wait">
               {!lastSelectedId && (
                  <motion.div
                     key="container"
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                  >
                     <div className={styles.block}>
                        <Select
                           active={container?.display || "flex"}
                           onSelect={(value) => editContainer("display", value)}
                        >
                           <Select.Toggle maxLength={8} title="Display" />
                           <Select.Options>
                              <Select.Option value="flex" />
                              <Select.Option value="inline-flex" />
                           </Select.Options>
                        </Select>
                     </div>
                     <div className={styles.block}>

                        <Select
                           active={container?.flexDirection || "row"}
                           onSelect={(value) =>
                              editContainer("flexDirection", value)
                           }
                        >
                           <Select.Toggle title="Flex Direction" maxLength={10} />
                           <Select.Options>
                              <Select.Option value="row" />
                              <Select.Option value="row-reverse" />
                              <Select.Option value="column" />
                              <Select.Option value="column-reverse" />
                           </Select.Options>
                        </Select>

                        <Select
                           active={container?.flexWrap || "nowrap"}
                           onSelect={(value) =>
                              editContainer("flexWrap", value)
                           }
                        >
                           <Select.Toggle title="Flex Wrap" />
                           <Select.Options>
                              <Select.Option value="nowrap" />
                              <Select.Option value="wrap" />
                              <Select.Option value="wrap-reverse" />
                           </Select.Options>
                        </Select>

                        <Select
                           active={container?.justifyContent || "start"}
                           onSelect={(value) =>
                              editContainer("justifyContent", value)
                           }
                        >
                           <Select.Toggle title="Justify Content" maxLength={8} />
                           <Select.Options>
                              <Select.Option value="start" />
                              <Select.Option value="center" />
                              <Select.Option value="end" />
                              <Select.Option value="space-between" />
                              <Select.Option value="space-around" />
                           </Select.Options>
                        </Select>

                        <Select
                           active={container?.alignItems || "stretch"}
                           onSelect={(value) =>
                              editContainer("alignItems", value)
                           }
                        >
                           <Select.Toggle title="Align Items" />
                           <Select.Options>
                              <Select.Option value="stretch" />
                              <Select.Option value="start" />
                              <Select.Option value="center" />
                              <Select.Option value="end" />
                              <Select.Option value="baseline" />
                           </Select.Options>
                        </Select>

                        <Select
                           active={container?.alignContent || "stretch"}
                           onSelect={(value) =>
                              editContainer("alignContent", value)
                           }
                        >
                           <Select.Toggle title="Align Content" maxLength={9} />
                           <Select.Options>
                              <Select.Option value="stretch" />
                              <Select.Option value="start" />
                              <Select.Option value="center" />
                              <Select.Option value="end" />
                              <Select.Option value="space-between" />
                              <Select.Option value="space-around" />
                           </Select.Options>
                        </Select>
                     </div>
                     <div className={styles.block}>

                        <Select
                           active={container?.gap || "20px"}
                           onSelect={(value) => editContainer("gap", value)}
                        >
                           <Select.Toggle title="Gap" />
                           <Select.Options>
                              <Select.Option value="10px" />
                              <Select.Option value="15px" />
                              <Select.Option value="20px" />
                              <Select.Option value="25px" />
                           </Select.Options>
                        </Select>
                     </div>
                  </motion.div>
               )}

               {lastSelectedId && (
                  <motion.div
                     key="editor"
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     exit="exit"
                  >
                     <div className={styles.block}>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Order</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="small"
                                 value={getItemStyle(lastSelectedId, "order")}
                                 type="number"
                                 onChange={(e) =>
                                    editItemStyle("order", e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Flex</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="small"
                                 value={getItemStyle(
                                    lastSelectedId,
                                    "flexGrow"
                                 )}
                                 type="number"
                                 onChange={(e) =>
                                    editItemStyle("flexGrow", e.target.value)
                                 }
                              />
                              <TextInput
                                 size="small"
                                 value={getItemStyle(
                                    lastSelectedId,
                                    "flexShrink"
                                 )}
                                 type="number"
                                 onChange={(e) =>
                                    editItemStyle("flexShrink", e.target.value)
                                 }
                              />
                              <TextInput
                                 size="medium"
                                 value={getItemStyle(
                                    lastSelectedId,
                                    "flexBasis"
                                 )}
                                 type="text"
                                 onChange={(e) =>
                                    editItemStyle("flexBasis", e.target.value)
                                 }
                              />
                           </div>
                        </div>

                        <Select
                           active={getItemStyle(lastSelectedId, "alignSelf")}
                           onSelect={(value) =>
                              editItemStyle("alignSelf", value)
                           }
                        >
                           <Select.Toggle title="Align Self" />
                           <Select.Options>
                              <Select.Option value="auto" />
                              <Select.Option value="start" />
                              <Select.Option value="center" />
                              <Select.Option value="end" />
                              <Select.Option value="baseline" />
                              <Select.Option value="stretch" />
                           </Select.Options>
                        </Select>
                     </div>
                     <div className={styles.block}>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Text</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="large"
                                 value={getItem(lastSelectedId, "text")}
                                 type="text"
                                 onChange={(e) =>
                                    editItem("text", e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Font-size</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="medium"
                                 value={getItemStyle(
                                    lastSelectedId,
                                    "fontSize"
                                 )}
                                 type="text"
                                 onChange={(e) =>
                                    editItemStyle("fontSize", e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Width</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="medium"
                                 value={getItemStyle(lastSelectedId, "width")}
                                 type="text"
                                 onChange={(e) =>
                                    editItemStyle("width", e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <div className={styles.editor__item}>
                           <div className={styles.editor__title}>Height</div>
                           <div className={styles.editor__options}>
                              <TextInput
                                 size="medium"
                                 value={getItemStyle(lastSelectedId, "height")}
                                 type="text"
                                 onChange={(e) =>
                                    editItemStyle("height", e.target.value)
                                 }
                              />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}

export default Editor;
