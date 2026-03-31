"use client";

import { motion } from "motion/react";
import { State } from "../../types";
import styles from "./SideBar.module.scss";
import SidebarContent from "./SidebarContent/SidebarContent";
import Tabs from "./SidebarTab/SidebarTab";
import useSidebarState from "./useSidebarState";
interface Tabs {
   name: string;
   component: React.ReactNode;
   icon: React.ReactNode;
}

interface Props {
   tabs: Tabs[];
   state: State;
}

function SideBar({ tabs, state }: Props) {
   const { switchState, showPanel, handleSwitch, handlePanelToggle } =
      useSidebarState();

   return (
      <motion.div className={styles.sidebar} layoutScroll>
         <Tabs
            tabs={tabs}
            switchState={switchState}
            onSwitch={handleSwitch}
            panelState={showPanel}
            togglePanel={handlePanelToggle}
            state={state}
         />

         <SidebarContent
            showPanel={showPanel}
            switchState={switchState}
            tabs={tabs}
         />
      </motion.div>
   );
}

export default SideBar;
