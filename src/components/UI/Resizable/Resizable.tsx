import { ReactNode, useRef } from "react";
import { useResize } from "../../../hooks/useResize";
import styles from "./Resizable.module.scss";

interface Props {
   children: ReactNode;
   className?: string;
}

export function Resizable({ children, className = "" }: Props) {
   const wrapperRef = useRef<HTMLDivElement>(null);
   const { dimensions, startResize, reset } = useResize({ ref: wrapperRef });

   return (
      <div
         ref={wrapperRef}
         className={`${styles.wrapper} ${className}`}
         style={{
            width: dimensions.width,
            height: dimensions.height,
         }}
      >
         {children}

         <div
            onMouseDown={(e) => startResize(e, "horizontal")}
            onDoubleClick={() => reset("horizontal")}
            className={styles.rightHandle}
         >
            <div className={`${styles.handle} ${styles.horizontal}`}>
               <div className={styles.indicator} />
            </div>
         </div>

         <div
            onMouseDown={(e) => startResize(e, "vertical")}
            onDoubleClick={() => reset("vertical")}
            className={styles.bottomHandle}
         >
            <div className={`${styles.handle} ${styles.vertical}`}>
               <div className={styles.indicator} />
            </div>
         </div>
      </div>
   );
}

export default Resizable;
