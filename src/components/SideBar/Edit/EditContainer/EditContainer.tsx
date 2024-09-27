import itemStyles from "../Item.module.scss";
import Select from "../../../UI/Select/Select";
import usePlayground from "../../../../hooks/usePlayground";
import { motion } from "framer-motion";
import {
   LuAlignHorizontalJustifyStart,
   LuAlignVerticalDistributeEnd,
   LuAlignVerticalJustifyEnd,
   LuWrapText,
} from "react-icons/lu";
import { RxSpaceEvenlyHorizontally } from "react-icons/rx";
import { TbArrowsRightDown } from "react-icons/tb";
import TextInput from "../../../UI/TextInput/TextInput";
import { DiGhostSmall } from "react-icons/di";

function EditContainer() {
   const { editContainer, container } = usePlayground();

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
               <DiGhostSmall />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Display</div>
               <div className={itemStyles.description}>
                  Sets the display type
               </div>
            </div>
            <Select
               active={container?.display || "flex"}
               onSelect={(value) => editContainer("display", value)}
            >
               <Select.Toggle />
               <Select.Options>
                  <Select.Option value="flex" />
                  <Select.Option value="block" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <TbArrowsRightDown />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Flex Direction</div>
               <div className={itemStyles.description}>
                  Sets main axis direction
               </div>
            </div>
            <Select
               active={container?.flexDirection || "row"}
               onSelect={(value) => editContainer("flexDirection", value)}
            >
               <Select.Toggle maxLength={8} />
               <Select.Options>
                  <Select.Option value="row" />
                  <Select.Option value="row-reverse" />
                  <Select.Option value="column" />
                  <Select.Option value="column-reverse" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuWrapText />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Flex Wrap</div>
               <div className={itemStyles.description}>
                  Controls items wrapping
               </div>
            </div>
            <Select
               active={container?.flexWrap || "nowrap"}
               onSelect={(value) => editContainer("flexWrap", value)}
            >
               <Select.Toggle maxLength={6} />
               <Select.Options>
                  <Select.Option value="nowrap" />
                  <Select.Option value="wrap" />
                  <Select.Option value="wrap-reverse" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuAlignHorizontalJustifyStart />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Justify Content</div>
               <div className={itemStyles.description}>
                  Aligns items on main axis
               </div>
            </div>
            <Select
               active={container?.justifyContent || "start"}
               onSelect={(value) => editContainer("justifyContent", value)}
            >
               <Select.Toggle maxLength={7} />
               <Select.Options>
                  <Select.Option value="start" />
                  <Select.Option value="center" />
                  <Select.Option value="end" />
                  <Select.Option value="space-between" />
                  <Select.Option value="space-around" />
                  <Select.Option value="space-evenly" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuAlignVerticalJustifyEnd />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Align Items</div>
               <div className={itemStyles.description}>
                  Aligns items on cross axis
               </div>
            </div>
            <Select
               active={container?.alignItems || "stretch"}
               onSelect={(value) => editContainer("alignItems", value)}
            >
               <Select.Toggle />
               <Select.Options>
                  <Select.Option value="stretch" />
                  <Select.Option value="start" />
                  <Select.Option value="center" />
                  <Select.Option value="end" />
                  <Select.Option value="baseline" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <LuAlignVerticalDistributeEnd />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Align Content</div>
               <div className={itemStyles.description}>
                  Controls flex line spacing
               </div>
            </div>
            <Select
               active={container?.alignContent || "stretch"}
               onSelect={(value) => editContainer("alignContent", value)}
            >
               <Select.Toggle maxLength={7} />
               <Select.Options>
                  <Select.Option value="stretch" />
                  <Select.Option value="start" />
                  <Select.Option value="center" />
                  <Select.Option value="end" />
                  <Select.Option value="space-between" />
                  <Select.Option value="space-around" />
               </Select.Options>
            </Select>
         </label>

         <label className={itemStyles.item}>
            <div className={itemStyles.icon}>
               <RxSpaceEvenlyHorizontally />
            </div>
            <div className={itemStyles.text}>
               <div className={itemStyles.title}>Gap</div>
               <div className={itemStyles.description}>
                  Sets gap between items
               </div>
            </div>
            <TextInput
               size="small"
               value={container?.gap?.toString() || "20px"}
               type="unit"
               unitOptions={["px", "%"]}
               onChange={(value) => editContainer("gap", value)}
            />
         </label>
      </motion.div>
   );
}

export default EditContainer;
