"use client";

import { Select as BaseSelect } from "@base-ui/react";
import { FaCaretDown } from "react-icons/fa";
import styles from "./Select.module.scss";

interface SelectProps {
   children: React.ReactNode;
   active: string;
   onSelect: (value: string) => void;
}

function Select({ children, active, onSelect }: SelectProps) {
   return (
      <div className={styles.select}>
         <BaseSelect.Root
            value={active}
            onValueChange={(val) => onSelect(val as string)}
         >
            {children}
         </BaseSelect.Root>
      </div>
   );
}

function Toggle() {
   return (
      <BaseSelect.Trigger className={styles.toggle}>
         <div className={styles.toggle__text}>
            <BaseSelect.Value />
            <FaCaretDown aria-hidden />
         </div>
      </BaseSelect.Trigger>
   );
}

function Options({ children }: { children: React.ReactNode }) {
   return (
      <BaseSelect.Portal>
         <BaseSelect.Positioner side="bottom" align="end" sideOffset={5} alignOffset={-10}>
            <BaseSelect.Popup className={styles.options}>
               {children}
            </BaseSelect.Popup>
         </BaseSelect.Positioner>
      </BaseSelect.Portal>
   );
}

function Option({ value }: { value: string }) {
   return (
      <BaseSelect.Item value={value} className={styles.option}>
         <BaseSelect.ItemText>{value}</BaseSelect.ItemText>
      </BaseSelect.Item>
   );
}

Select.Toggle = Toggle;
Select.Options = Options;
Select.Option = Option;

export default Select;
