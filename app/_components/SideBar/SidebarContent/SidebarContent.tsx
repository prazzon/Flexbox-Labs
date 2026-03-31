import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import styles from "./SidebarContent.module.scss";

interface Props {
   showPanel: boolean;
   switchState: number;
   tabs: {
      name: string;
      component: React.ReactNode;
      icon: React.ReactNode;
   }[];
}

export default function SidebarContent({
   showPanel,
   switchState,
   tabs,
}: Props) {
   const sidePanelRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      sidePanelRef.current?.scrollTo(0, 0);
   }, [switchState]);

   return (
      <AnimatePresence mode="popLayout" initial={false}>
         {showPanel && (
            <motion.div
               className={styles.side_panel}
               id="side_panel"
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.95 }}
               transition={{ duration: 0.4 }}
               ref={sidePanelRef}
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
   );
}
