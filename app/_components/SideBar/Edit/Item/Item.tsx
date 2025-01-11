import Select from "@/app/_components/UI/Select/Select";
import TextInput from "@/app/_components/UI/TextInput/TextInput";
import { ContainerConfig, ItemConfig } from "@/app/_data/dataTypes";
import { Container, ItemStyle } from "@/app/types";
import styles from "../Item.module.scss";
import { motion } from "framer-motion";

interface Props {
   item: ContainerConfig | ItemConfig;
   value: string;
   onChange: (key: keyof Container | keyof ItemStyle, value: string) => void;
}

const Item = ({ item, value, onChange }: Props) => {
   const key = item.key as keyof Container;

   return (
      // <motion.label className={styles.item} key={item.key} layout>
      <motion.label className={styles.item} key={item.key}>
         <div className={styles.icon}>
            <item.icon />
         </div>
         <div className={styles.text}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
         </div>

         {item.type === "select" ? (
            <Select
               active={value || item.defaultValue}
               onSelect={(value) => onChange(key, value)}
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
               value={value || item.defaultValue}
               type={item.inputType}
               unitOptions={item.unitOptions}
               onChange={(value) => onChange(key, value)}
            />
         ) : null}

         {item.type === "input" && item.inputType === "number" ? (
            <TextInput
               size="small"
               value={value || item.defaultValue}
               type={item.inputType}
               step={item.step}
               onChange={(value) => onChange(key, value)}
            />
         ) : null}
      </motion.label>
   );
};

export default Item;
