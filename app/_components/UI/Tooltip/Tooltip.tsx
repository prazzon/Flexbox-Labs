"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react";
import { ReactElement, ReactNode } from "react";
import styles from "./Tooltip.module.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
   children: ReactElement;
   label: ReactNode;
   position?: "top" | "bottom" | "left" | "right";
   background?: string;
   delay?: number;
   closeDelay?: number;
}

function Tooltip({
   children,
   label,
   position = "top",
   background,
   delay = 300,
   closeDelay = 100,
   ...props
}: Props) {
   return (
      <BaseTooltip.Root>
         <BaseTooltip.Trigger
            {...props}
            render={children}
            delay={delay}
            closeDelay={closeDelay}
         />
         <BaseTooltip.Portal>
            <BaseTooltip.Positioner
               side={position}
               sideOffset={10}
               style={{ zIndex: 999999 }}
            >
               <BaseTooltip.Popup
                  className={styles.tooltip__content}
                  style={{ backgroundColor: background }}
               >
                  {label}
               </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
         </BaseTooltip.Portal>
      </BaseTooltip.Root>
   );
}

// function Tooltip({
//    children,
//    label,
//    position = "top",
//    background,
//    ...props
// }: Props) {
//    return (
//       <BaseTooltip.Root>
//          <BaseTooltip.Trigger {...props} render={children} />
//          <BaseTooltip.Portal>
//             <BaseTooltip.Positioner
//                side={position}
//                sideOffset={10}
//                style={{ zIndex: 999999 }}
//             >
//                <BaseTooltip.Popup
//                   className={styles.tooltip__content}
//                   style={{ backgroundColor: background }}
//                >
//                   {label}
//                </BaseTooltip.Popup>
//             </BaseTooltip.Positioner>
//          </BaseTooltip.Portal>
//       </BaseTooltip.Root>
//    );
// }

export default Tooltip;
