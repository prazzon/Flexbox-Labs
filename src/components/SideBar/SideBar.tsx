import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";
import Edit from "./Edit/Edit";
import Layout from "./Layout/Layout";
import Save from "./Save/Save";
import Settings from "./Settings/Settings";
import styles from "./SideBar.module.scss";
import Tabs from "./Tabs/Tabs";

const tabs = [
   { name: "Edit", component: <Edit />, icon: <MdOutlineEdit /> },
   { name: "Save", component: <Save />, icon: <FaFloppyDisk /> },
   { name: "Layout", component: <Layout />, icon: <TbLayoutGrid /> },
   { name: "Settings", component: <Settings />, icon: <LuSettings2 /> },
];

function SidePanel() {
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
                  <motion.div
                     key={switchState}
                     className={styles.side_panel__content}
                     animate={{ y: 0, opacity: 1 }}
                     initial={{ y: 10, opacity: 0.5 }}
                     exit={{ y: -10, opacity: 0.5 }}
                     transition={{ duration: 0.2 }}
                  >
                     {tabs[switchState].component}
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}

export default SidePanel;
