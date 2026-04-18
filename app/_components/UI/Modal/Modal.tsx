"use client";

import { Dialog } from "@base-ui/react";
import { ReactElement, ReactNode } from "react";
import { FiMinimize2 } from "react-icons/fi";
import styles from "./Modal.module.scss";

function Modal({ children }: { children: ReactNode }) {
   return <Dialog.Root>{children}</Dialog.Root>;
}

export function OpenBtn({ children }: { children: ReactElement }) {
   return <Dialog.Trigger render={children} />;
}

export function Content({ children }: { children: ReactNode }) {
   return (
      <Dialog.Portal>
         <Dialog.Backdrop className={styles.overlay} />
         <div className={styles.container}>
            <Dialog.Popup className={styles.modal}>
               <Dialog.Title className={styles.srOnly}>Dialog</Dialog.Title>

               <Dialog.Close className={styles.close__btn} aria-label="Close dialog">
                  <FiMinimize2 />
               </Dialog.Close>

               {children}
            </Dialog.Popup>
         </div>
      </Dialog.Portal>
   );
}

export default Modal;
