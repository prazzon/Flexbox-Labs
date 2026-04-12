"use client";

import { AnimatePresence, motion } from "motion/react";
import {
   cloneElement,
   ReactElement,
   ReactNode,
   useCallback,
   useEffect,
   useId,
   useRef,
   useState,
} from "react";
import { createPortal } from "react-dom";
import { FiMinimize2 } from "react-icons/fi";
import styles from "./Modal.module.scss";
import { ModalContext } from "./ModalContext";
import { useModalContext } from "./useModalContext";

const container = {
   exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modal = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
   exit: { opacity: 0, y: 30 },
};

function Modal({ children }: { children: ReactNode }) {
   const [showModal, setShowModal] = useState(false);

   const openModal = useCallback(() => setShowModal(true), []);

   const closeModal = useCallback(() => setShowModal(false), []);

   return (
      <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
}

export function OpenBtn({
   children,
}: {
   children: ReactElement<{
      onClick?: () => void;
      "aria-expanded"?: boolean;
      "aria-haspopup"?: "dialog";
   }>;
}) {
   const context = useModalContext();
   const { openModal, showModal } = context;

   return cloneElement(children, {
      onClick: () => openModal(),
      "aria-expanded": showModal,
      "aria-haspopup": "dialog",
   });
}

export function Content({ children }: { children: ReactNode }) {
   const context = useModalContext();
   const { showModal, closeModal } = context;

   const [mounted, setMounted] = useState(false);
   const titleId = useId();
   const modalRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
   }, []);

   useEffect(() => {
      if (!showModal || !mounted) return;

      const modalEl = modalRef.current;
      if (!modalEl) return;

      const previouslyFocused = document.activeElement as HTMLElement | null;

      const list = Array.from(
         modalEl.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
         ),
      );
      (list[0] ?? modalEl).focus();

      function onKeyDown(e: KeyboardEvent) {
         if (!modalEl) return;

         if (e.key === "Escape") {
            e.preventDefault();
            closeModal();
            return;
         }

         if (e.key !== "Tab" || list.length === 0) return;

         const first = list[0];
         const last = list[list.length - 1];
         const active = document.activeElement as HTMLElement | null;

         if (e.shiftKey) {
            if (active === first || !modalEl.contains(active)) {
               e.preventDefault();
               last.focus();
            }
         } else if (active === last) {
            e.preventDefault();
            first.focus();
         }
      }

      document.addEventListener("keydown", onKeyDown);
      return () => {
         document.removeEventListener("keydown", onKeyDown);
         previouslyFocused?.focus?.();
      };
   }, [showModal, mounted, closeModal]);

   if (!mounted) return null;

   return createPortal(
      <AnimatePresence>
         {showModal && (
            <motion.div
               key="modal"
               className={styles.container}
               variants={container}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <motion.div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className={styles.modal}
                  variants={modal}
                  layout
                  transition={{ duration: 0.2 }}
               >
                  <span id={titleId} className={styles.srOnly}>
                     Dialog
                  </span>
                  <button
                     type="button"
                     className={styles.close__btn}
                     onClick={closeModal}
                     aria-label="Close dialog"
                  >
                     <FiMinimize2 />
                  </button>
                  {children}
               </motion.div>
               <motion.div
                  className={styles.overlay}
                  onClick={closeModal}
                  aria-hidden="true"
               />
            </motion.div>
         )}
      </AnimatePresence>,
      document.body,
   );
}

export default Modal;
