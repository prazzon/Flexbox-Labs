import { AnimatePresence } from "framer-motion";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import usePlayground from "../../hooks/usePlayground";
import styles from "./Playground.module.scss";
import PlaygroundItem from "./PlaygroundItem/PlaygroundItem";
import Snackbar from "./Snackbar/Snackbar";
import Toolbar from "./Toolbar/Toolbar";

import { motion } from "framer-motion";
import Resizable from "../UI/Resizable/Resizable";
import MainAxisPointer from "./MainAxisPointer/MainAxisPointer";

function Playground() {
   const { items, container, clearSelected } = usePlayground();

   const ref = useInsideContainerClick(clearSelected);

   return (
      <motion.div layout className={styles.playground_wrapper} ref={ref}>
         <Resizable className={styles.playground}>
            <Toolbar />
            <MainAxisPointer />
            <motion.div
               layout
               className={styles.playground_view}
               id="playground_view"
               style={container}
            >
               <AnimatePresence mode="popLayout">
                  {items?.map((item) => (
                     <PlaygroundItem key={item.id} item={item} />
                  ))}
               </AnimatePresence>
            </motion.div>
            <Snackbar />
         </Resizable>
      </motion.div>
   );
}

export default Playground;
