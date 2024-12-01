import { AnimatePresence } from "framer-motion";
import { useInsideContainerClick } from "../../hooks/useInsideContainerClick";
import usePlayground from "../../hooks/usePlayground";
import styles from "./Playground.module.scss";
import PlaygroundItem from "./PlaygroundItem/PlaygroundItem";
import Snackbar from "./Snackbar/Snackbar";
import Toolbar from "./Toolbar/Toolbar";

import { motion } from "framer-motion";
import MainAxisPointer from "./MainAxisPointer/MainAxisPointer";

function Playground() {
   const { items, container, clearSelected } = usePlayground();

   const ref = useInsideContainerClick(clearSelected);

   return (
      <motion.div
         className={styles.playground}
         ref={ref}
         layout
         layoutId="playground"
      >
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
      </motion.div>
   );
}

export default Playground;
