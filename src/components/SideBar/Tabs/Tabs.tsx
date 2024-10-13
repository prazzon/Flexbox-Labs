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

const tabs = [
   { name: "Edit", icon: <MdOutlineEdit /> },
   { name: "Save", icon: <FaFloppyDisk /> },
   { name: "Layout", icon: <TbLayoutGrid /> },
   { name: "Settings", icon: <LuSettings2 /> },
];

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

         {tabs.map((tab, index) => (
            <button
               key={index}
               className={styles.btn__switch}
               data-switch={index + 1}
               onClick={() => onSwitch(index + 1)}
            >
               {tab.icon}

               <Tooltip position="right">{tab.name}</Tooltip>
               
               {switchState === index + 1 && panelState === true && (
                  <motion.span
                     className={styles.active}
                     transition={{ duration: 0.2 }}
                     layoutId="activeTab"
                  ></motion.span>
               )}
            </button>
         ))}

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
                  <Tooltip position="right">About</Tooltip>
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
            <Tooltip position="right">GitHub</Tooltip>
         </a>
      </motion.div>
   );
}

export default Tabs;
