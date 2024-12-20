"use client";

import {  motion } from "framer-motion";
import { useState } from "react";
import { State } from "../../types";
import styles from "./SideBar.module.scss";
import SidebarContent from "./SidebarContent/SidebarContent";
import Tabs from "./SidebarTab/SidebarTab";

interface Tabs {
   name: string;
   component: JSX.Element;
   icon: JSX.Element;
}

interface Props {
   tabs: Tabs[];
   state: State;
}

function SideBar({ tabs, state }: Props) {
   const [switchState, setSwitchState] = useState(0);
   const [showPanel, setShowPanel] = useState(true);

   function handleSwitch(dataSwitch: number) {
      setSwitchState(dataSwitch);

      if (!showPanel) setShowPanel(true);

      document.querySelector("#side_panel")?.scrollTo(0, 0);
   }

   function handlePanelToggle() {
      setShowPanel((prev) => !prev);
   }

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
