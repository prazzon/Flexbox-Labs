"use client";

import { Input as BaseInput } from "@base-ui/react";
import { useState } from "react";
import Select from "../Select/Select";
import styles from "./TextInput.module.scss";

interface Props {
   size: "small" | "medium" | "large";
   type: "unit" | "number";
   value: string;
   onChange: (value: string) => void;
   unitOptions?: string[];
   step?: number;
}

function extractUnit(
   value: string,
   units: string[] | undefined,
   defaultUnit = "px"
): string {
   if (!units) return defaultUnit;

   for (const unit of units) {
      if (value.endsWith(unit)) {
         return unit;
      }
   }

   return defaultUnit;
}

function TextInput({ size, value, type, onChange, unitOptions, step }: Props) {
   const [unit, setUnit] = useState(extractUnit(value, unitOptions, "px"));
   const [lastValue, setLastValue] = useState(value);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/^0+(\d+)/, "$1");

      if (type === "number") {
         onChange(val);
         setLastValue(val);
      } else {
         onChange(`${val}${unit}`);
         setLastValue(`${val}${unit}`);
      }
   };

   const handleUnitChange = (val: string) => {
      setUnit(val);

      if (val === "auto") {
         onChange("auto");
      } else {
         onChange(`${parseInt(lastValue) || 0}${val}`);
      }
   };

   return (
      <div className={styles.container}>
         {value !== "auto" && (
            <BaseInput
               type={type === "unit" ? "number" : type}
               value={parseInt(value) || 0}
               className={`${styles.input} ${styles[size]}`}
               onChange={handleChange}
               step={step || 1}
               onClick={(e) => (e.target as HTMLInputElement).select()}
            />
         )}

         {type === "unit" && (
            <Select
               active={value.replace(/\d/g, "")}
               onSelect={(val) => handleUnitChange(val)}
            >
               <Select.Toggle />
               <Select.Options>
                  {unitOptions?.map((option) => (
                     <Select.Option key={option} value={option} />
                  ))}
               </Select.Options>
            </Select>
         )}
      </div>
   );
}

export default TextInput;
