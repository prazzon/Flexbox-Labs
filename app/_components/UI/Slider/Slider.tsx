"use client";

import { Slider as BaseSlider } from "@base-ui/react";
import styles from "./Slider.module.scss";

interface Props {
   value: number;
   min?: number;
   max?: number;
   step?: number;
   onChange: (value: number) => void;
   className?: string;
}

export default function Slider({
   value,
   min = 0,
   max = 100,
   step = 1,
   onChange,
   className,
}: Props) {
   return (
      <BaseSlider.Root
         value={value}
         min={min}
         max={max}
         step={step}
         onValueChange={(val) => onChange(val as number)}
         className={`${styles.root} ${className}`}
      >
         <BaseSlider.Control className={styles.control}>
            <BaseSlider.Track className={styles.track}>
               <BaseSlider.Indicator className={styles.indicator} />
               <BaseSlider.Thumb className={styles.thumb} />
            </BaseSlider.Track>
         </BaseSlider.Control>
      </BaseSlider.Root>
   );
}
