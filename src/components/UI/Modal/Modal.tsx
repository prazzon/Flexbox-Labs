import styles from "./Modal.module.css";
import { cloneElement, createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const container = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modal = {
   hidden: { y: -30, opacity: 0 },
   visible: { y: 0, opacity: 1 },
   exit: { y: -30 },
};

interface Context {
   showModal: boolean;
   openModal: () => void;
   closeModal: () => void;
}

const ModalContext = createContext<Context | null>(null);

function Modal({ children }: { children: ReactNode }) {
   const [showModal, setShowModal] = useState(false);

   const openModal = () => setShowModal(true);

   const closeModal = () => setShowModal(false);

   return (
      <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
}

function OpenBtn({ children }: { children: ReactElement }) {
   const { openModal } = useContext(ModalContext) as Context;

   return cloneElement(children, { onClick: () => openModal() });
}

function Content({ children }: { children: ReactNode }) {
   const { showModal, closeModal } = useContext(ModalContext) as Context;

   return createPortal(
      <AnimatePresence>
         {showModal && (
            <motion.div
               className={styles.container}
               variants={container}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <motion.div className={styles.modal} variants={modal}>
                  <button className={styles.close__btn} onClick={closeModal}>
                     <IoCloseOutline />
                  </button>
                  {children}
               </motion.div>
               <div className={styles.overlay} onClick={closeModal}></div>
            </motion.div>
         )}
      </AnimatePresence>,
      document.querySelector("#root") as HTMLElement
   );
}

Modal.OpenBtn = OpenBtn;
Modal.Content = Content;

export default Modal;
