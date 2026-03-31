"use client";

import { State } from "@/app/types";
import { motion } from "motion/react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaCode, FaGithub } from "react-icons/fa6";
import { LuPanelRightOpen } from "react-icons/lu";
import DisplayCode from "../../UI/DisplayCode/DisplayCode";
import Modal, { Content, OpenBtn } from "../../UI/Modal/Modal";
import Tooltip from "../../UI/Tooltip/Tooltip";
import About from "../About/About";
import styles from "./SidebarTab.module.scss";

interface Props {
   tabs: { name: string; component: React.ReactNode; icon: React.ReactNode }[];
   switchState: number;
   onSwitch: (switchState: number) => void;
   panelState: boolean;
   togglePanel: () => void;
   state: State;
}

function SidebarTab({
   tabs,
   switchState,
   onSwitch,
   panelState,
   togglePanel,
   state,
}: Props) {
   return (
      <motion.div className={styles.tabs} layout>
         <button className={styles.btn__toggle} onClick={togglePanel}>
            <motion.span
               animate={{ rotate: panelState ? 0 : 180 }}
               transition={{ duration: 0.3 }}
            >
               <LuPanelRightOpen />
            </motion.span>
         </button>

         <hr className={styles.hr} />

         {tabs.map((tab, index) => {
            const isActive = switchState === index && panelState;
            return (
               <button
                  key={index}
                  className={`${styles.btn__switch} ${isActive ? styles.active : ""}`}
                  data-switch={index}
                  onClick={() => onSwitch(index)}
               >
                  {tab.icon}

                  <Tooltip position="right">{tab.name}</Tooltip>

                  {switchState === index && panelState === true && (
                     <motion.span
                        className={styles.active}
                        transition={{ duration: 0.2 }}
                        layoutId="activeTab"
                     ></motion.span>
                  )}
               </button>
            );
         })}

         <hr className={styles.hr} />

         <Modal>
            <OpenBtn>
               <button className={styles.btn}>
                  <FaCode />
                  <Tooltip position="right">Code</Tooltip>
               </button>
            </OpenBtn>
            <Content>
               <DisplayCode state={state} />
            </Content>
         </Modal>

         <hr className={styles.hr} />

         <Modal>
            <OpenBtn>
               <a className={`${styles.btn} ${styles.btn__about}`}>
                  <FaRegQuestionCircle />
                  <Tooltip position="right">About</Tooltip>
               </a>
            </OpenBtn>
            <Content>
               <About />
            </Content>
         </Modal>

         <a
            href="https://github.com/prazzon/flexbox-labs"
            target="_blank"
            className={`${styles.btn} ${styles.btn__github}`}
         >
            <FaGithub />
            <Tooltip position="right">GitHub</Tooltip>
         </a>
      </motion.div>
   );
}

export default SidebarTab;
