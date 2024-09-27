import styles from "./Tabs.module.scss";
import { useEffect, useRef } from "react";
import Modal from "../../UI/Modal/Modal";
import DisplayCode from "../../UI/DisplayCode/DisplayCode";
import About from "../About/About";
import { LuPanelRightOpen, LuSettings2 } from "react-icons/lu";
import { TbLayoutGrid } from "react-icons/tb";
import { FaCode, FaFloppyDisk, FaGithub } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import Tooltip from "../../UI/Tooltip/Tooltip";
import { motion } from "framer-motion";

interface Props {
   switchState: number;
   onSwitch: (switchState: number) => void;
   panelState: boolean;
   togglePanel: () => void;
}

function Tabs({ switchState, onSwitch, panelState, togglePanel }: Props) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const buttons = [...document.querySelectorAll(`.${styles.btn__switch}`)];

      buttons.forEach((btn) => {
         const button = btn as HTMLButtonElement;

         button.classList.remove(styles.active);

         if (panelState === false) return;

         if (Number(button.dataset.switch) === switchState) {
            button.classList.add(styles.active);
         }
      });
   }, [switchState, panelState]);

   return (
      <motion.div className={styles.tabs} ref={ref} layout>
         <button className={styles.btn__toggle} onClick={togglePanel}>
            <motion.span
               animate={{ rotate: panelState ? 0 : 180 }}
               transition={{ duration: 0.3 }}
            >
               <LuPanelRightOpen />
            </motion.span>
         </button>

         <hr className={styles.hr} />

         <button
            className={styles.btn__switch}
            data-switch={1}
            onClick={() => onSwitch(1)}
         >
            <MdOutlineEdit />
            <Tooltip position="right">Edit</Tooltip>
         </button>
         <button
            className={styles.btn__switch}
            data-switch={2}
            onClick={() => onSwitch(2)}
         >
            <FaFloppyDisk />
            <Tooltip position="right">Save</Tooltip>
         </button>
         <button
            className={styles.btn__switch}
            data-switch={3}
            onClick={() => onSwitch(3)}
         >
            <TbLayoutGrid />
            <Tooltip position="right">Layout</Tooltip>
         </button>
         <button
            className={styles.btn__switch}
            data-switch={4}
            onClick={() => onSwitch(4)}
         >
            <LuSettings2 />
            <Tooltip position="right">Settings</Tooltip>
         </button>

         <hr className={styles.hr} />

         <Modal>
            <Modal.OpenBtn>
               <button className={styles.btn}>
                  <FaCode />
                  <Tooltip position="right">Code</Tooltip>
               </button>
            </Modal.OpenBtn>
            <Modal.Content>
               <DisplayCode />
            </Modal.Content>
         </Modal>

         <hr className={styles.hr} />

         <Modal>
            <Modal.OpenBtn>
               <a className={`${styles.btn} ${styles.btn__about}`}>
                  <FaRegQuestionCircle />
                  {/* <Tooltip position="right">About</Tooltip> */}
               </a>
            </Modal.OpenBtn>
            <Modal.Content>
               <About />
            </Modal.Content>
         </Modal>

         <a
            href="https://github.com/prazzon/flexlab"
            target="_blank"
            className={`${styles.btn} ${styles.btn__github}`}
         >
            <FaGithub />
            {/* <Tooltip position="right">GitHub</Tooltip> */}
         </a>
      </motion.div>
   );
}

export default Tabs;
