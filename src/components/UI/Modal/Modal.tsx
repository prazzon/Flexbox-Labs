import styles from "./Modal.module.scss";
import {
   cloneElement,
   createContext,
   ReactElement,
   ReactNode,
   useContext,
   useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMinimize2 } from "react-icons/fi";

const container = {
   exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modal = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
   exit: { opacity: 0, y: 30 },
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
               key="modal"
               className={styles.container}
               variants={container}
               initial="hidden"
               animate="visible"
               exit="exit"
            >
               <motion.div
                  className={styles.modal}
                  variants={modal}
                  layout
                  transition={{ duration: 0.2 }}
               >
                  <button className={styles.close__btn} onClick={closeModal}>
                     <FiMinimize2 />
                  </button>
                  {children}
               </motion.div>
               <motion.div
                  className={styles.overlay}
                  onClick={closeModal}
               ></motion.div>
            </motion.div>
         )}
      </AnimatePresence>,
      document.querySelector("#root") as HTMLElement
   );
}

Modal.OpenBtn = OpenBtn;
Modal.Content = Content;

export default Modal;
