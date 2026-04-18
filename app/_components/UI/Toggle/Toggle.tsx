"use client";

import { Switch as BaseSwitch } from "@base-ui/react";
import styles from "./Toggle.module.scss";

interface Props {
   checked: boolean;
   onChange: (checked: boolean) => void;
}

function Toggle({ checked, onChange }: Props) {
   return (
      <BaseSwitch.Root
         checked={checked}
         onCheckedChange={onChange}
         className={styles.toggle}
      >
         <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
   );
}

export default Toggle;
