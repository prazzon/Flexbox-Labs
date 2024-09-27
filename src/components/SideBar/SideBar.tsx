import { useState } from "react";
import Edit from "./Edit/Edit";
import styles from "./SideBar.module.scss";
import Tabs from "./Tabs/Tabs";
import Save from "./Save/Save";
import Layout from "./Layout/Layout";
import Settings from "./Settings/Settings";
import { AnimatePresence, motion } from "framer-motion";

function SidePanel() {
   const [switchState, setSwitchState] = useState(1);
   const [showPanel, setShowPanel] = useState(true);

   function handleSwitch(dataSwitch: number) {
      setSwitchState(dataSwitch || 0);

      if (!showPanel) setShowPanel(true);

      document.querySelector("#side_panel")?.scrollTo(0, 0);
   }

   function handlePanelToggle() {
      setShowPanel((prev) => !prev);
   }

   return (
      <motion.div className={styles.sidebar} layoutScroll>
         <Tabs
            switchState={switchState}
            onSwitch={handleSwitch}
            panelState={showPanel}
            togglePanel={handlePanelToggle}
         />

         <AnimatePresence mode="popLayout" initial={false}>
            {showPanel && (
               <motion.div
                  className={styles.side_panel}
                  id="side_panel"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ duration: 0.4 }}
               >
                  <AnimatePresence mode="wait" initial={false}>
                     {switchState === 1 && <Edit />}
                     {switchState === 2 && <Save />}
                     {switchState === 3 && <Layout />}
                     {switchState === 4 && <Settings />}
                  </AnimatePresence>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}

export default SidePanel;
