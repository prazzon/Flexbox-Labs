"use client";

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

   // checks if the value ends with any of the units
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
      // remove leading zeros
      const value = e.target.value.replace(/^0+(\d+)/, "$1");

      if (type === "number") {
         onChange(value);
         setLastValue(value);
      } else {
         onChange(`${value}${unit}`);
         setLastValue(`${value}${unit}`);
      }
   };

   const handleUnitChange = (value: string) => {
      setUnit(value);

      if (value === "auto") {
         onChange("auto");
      } else {
         onChange(`${parseInt(lastValue) || 0}${value}`);
      }
   };

   return (
      <>
         {value !== "auto" && (
            <input
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
               onSelect={(value) => handleUnitChange(value)}
            >
               <Select.Toggle />
               <Select.Options>
                  {unitOptions?.map((option) => (
                     <Select.Option key={option} value={option} />
                  ))}
               </Select.Options>
            </Select>
         )}
      </>
   );
}

export default TextInput;
