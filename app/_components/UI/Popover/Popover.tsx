"use client";

import { Popover as BasePopover } from "@base-ui/react";
import { ReactNode } from "react";
import styles from "./Popover.module.scss";

interface Props {
   children: ReactNode;
   trigger: ReactNode;
   width?: number;
   position?: "top" | "bottom" | "left" | "right";
   background?: string;
}

function Popover({
   children,
   trigger,
   position = "top",
   background,
   width = 300,
}: Props) {
   return (
      <BasePopover.Root>
         <BasePopover.Trigger
            className={styles.trigger}
            onClick={(e) => e.stopPropagation()}
         >
            {trigger}
         </BasePopover.Trigger>
         <BasePopover.Portal>
            <BasePopover.Positioner
               side={position}
               sideOffset={10}
               style={{ zIndex: 999999 }}
            >
               <BasePopover.Popup
                  className={styles.popover__content}
                  style={{
                     maxWidth: `${width}px`,
                     backgroundColor: background,
                  }}
               >
                  {children}
               </BasePopover.Popup>
            </BasePopover.Positioner>
         </BasePopover.Portal>
      </BasePopover.Root>
   );
}

export default Popover;
