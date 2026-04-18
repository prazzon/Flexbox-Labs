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
         <button
            type="button"
            className={styles.btn__toggle}
            onClick={togglePanel}
            aria-label={panelState ? "Collapse sidebar panel" : "Expand sidebar panel"}
            aria-expanded={panelState}
         >
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
                  <Tooltip key={tab.name} label={tab.name} position="right">
                     <button
                        type="button"
                        className={`${styles.btn__switch} ${isActive ? styles.active : ""}`}
                        data-switch={index}
                        onClick={() => onSwitch(index)}
                        aria-label={tab.name}
                        aria-pressed={isActive}
                     >
                        {tab.icon}

                        {switchState === index && panelState === true && (
                           <motion.span
                              className={styles.active}
                              transition={{ duration: 0.2 }}
                              layoutId="activeTab"
                           ></motion.span>
                        )}
                     </button>
                  </Tooltip>
            );
         })}

         <hr className={styles.hr} />

         <Modal>
            <OpenBtn>
               <Tooltip label="Code" position="right">
                  <button className={styles.btn}>
                     <FaCode />
                  </button>
               </Tooltip>
            </OpenBtn>
            <Content>
               <DisplayCode state={state} />
            </Content>
         </Modal>

         <hr className={styles.hr} />

         <Modal>
            <OpenBtn>
               <Tooltip label="About" position="right">
                  <button
                     type="button"
                     className={`${styles.btn} ${styles.btn__about}`}
                     aria-label="About Flexbox Labs"
                  >
                     <FaRegQuestionCircle />
                  </button>
               </Tooltip>
            </OpenBtn>
            <Content>
               <About />
            </Content>
         </Modal>

         <Tooltip label="GitHub" position="right">
            <a
               href="https://github.com/prazzon/flexbox-labs"
               target="_blank"
               rel="noopener noreferrer"
               className={`${styles.btn} ${styles.btn__github}`}
               aria-label="Flexbox Labs on GitHub (opens in new tab)"
            >
               <FaGithub />
            </a>
         </Tooltip>
      </motion.div>
   );
}

export default SidebarTab;
