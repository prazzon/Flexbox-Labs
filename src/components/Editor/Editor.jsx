import { IoMdQrScanner } from "react-icons/io";
import style from "./Editor.module.css";
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

   const lastSelectedId = selectedItems.at(-1)?.id;

   return (
      <div className={style.editor}>
         <div className={style.tabs}>
            <div
               className={`${style.tab} ${!lastSelectedId ? style.active : ""}`}
            >
               <GoContainer /> Container
            </div>
            <div
               className={`${style.tab} ${lastSelectedId ? style.active : ""}`}
            >
               <IoMdQrScanner />
               {selectedItems.length > 1
                  ? `Item(${selectedItems.length})`
                  : "Item"}
            </div>
         </div>

         <div className={style.container}>
            <AnimatePresence mode="wait">
               {!lastSelectedId && (
                  <motion.div
                     key="container"
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                  >
                     <div className={style.block}>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Display</div>
                           <Select
                              active={container?.display || "flex"}
                              onSelect={(value) =>
                                 editContainer("display", value)
                              }
                           >
                              <Select.Options>
                                 <Select.Option value="flex" />
                                 <Select.Option value="inline-flex" />
                              </Select.Options>
                           </Select>
                        </div>
                     </div>
                     <div className={style.block}>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>
                              Flex Direction
                           </div>
                           <Select
                              active={container?.flexDirection || "row"}
                              onSelect={(value) =>
                                 editContainer("flexDirection", value)
                              }
                           >
                              <Select.Options>
                                 <Select.Option value="row" />
                                 <Select.Option value="row-reverse" />
                                 <Select.Option value="column" />
                                 <Select.Option value="column-reverse" />
                              </Select.Options>
                           </Select>
                        </div>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Flex Wrap</div>
                           <Select
                              active={container?.flexWrap || "nowrap"}
                              onSelect={(value) =>
                                 editContainer("flexWrap", value)
                              }
                           >
                              <Select.Options>
                                 <Select.Option value="nowrap" />
                                 <Select.Option value="wrap" />
                                 <Select.Option value="wrap-reverse" />
                              </Select.Options>
                           </Select>
                        </div>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>
                              Justify Content
                           </div>
                           <Select
                              active={container?.justifyContent || "start"}
                              onSelect={(value) =>
                                 editContainer("justifyContent", value)
                              }
                           >
                              <Select.Options>
                                 <Select.Option value="start" />
                                 <Select.Option value="center" />
                                 <Select.Option value="end" />
                                 <Select.Option value="space-between" />
                                 <Select.Option value="space-around" />
                              </Select.Options>
                           </Select>
                        </div>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>
                              Align Items
                           </div>
                           <Select
                              active={container?.alignItems || "stretch"}
                              onSelect={(value) =>
                                 editContainer("alignItems", value)
                              }
                           >
                              <Select.Options>
                                 <Select.Option value="stretch" />
                                 <Select.Option value="start" />
                                 <Select.Option value="center" />
                                 <Select.Option value="end" />
                                 <Select.Option value="baseline" />
                              </Select.Options>
                           </Select>
                        </div>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>
                              Align Content
                           </div>
                           <Select
                              active={container?.alignContent || "stretch"}
                              onSelect={(value) =>
                                 editContainer("alignContent", value)
                              }
                           >
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
                     </div>
                     <div className={style.block}>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Gap</div>
                           <Select
                              active={container?.gap || "20px"}
                              onSelect={(value) => editContainer("gap", value)}
                           >
                              <Select.Options>
                                 <Select.Option value="10px" />
                                 <Select.Option value="15px" />
                                 <Select.Option value="20px" />
                                 <Select.Option value="25px" />
                              </Select.Options>
                           </Select>
                        </div>
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
                     <div className={style.block}>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Order</div>
                           <div className={style.editor__options}>
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
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Flex</div>
                           <div className={style.editor__options}>
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
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Align Self</div>
                           <div className={style.editor__options}>
                              <Select
                                 active={getItemStyle(
                                    lastSelectedId,
                                    "alignSelf"
                                 )}
                                 onSelect={(value) =>
                                    editItemStyle("alignSelf", value)
                                 }
                              >
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
                        </div>
                     </div>
                     <div className={style.block}>
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Text</div>
                           <div className={style.editor__options}>
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
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Font-size</div>
                           <div className={style.editor__options}>
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
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Width</div>
                           <div className={style.editor__options}>
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
                        <div className={style.editor__item}>
                           <div className={style.editor__title}>Height</div>
                           <div className={style.editor__options}>
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
