"use client";

import { Container } from "@/app/types";
import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";
import { useInsideContainerClick } from "../../_hooks/useInsideContainerClick";
import Resizable from "../UI/Resizable/Resizable";
import styles from "./Playground.module.scss";

interface Props {
   children: React.ReactNode;
   container: Container;
   playgroundTools?: { component: React.ReactNode; id: string }[];
   clearSelected?: () => void;
}

function Playground({
   children,
   playgroundTools,
   container,
   clearSelected,
}: Props) {
   const ref = useInsideContainerClick(clearSelected);

   return (
      <motion.div layout className={styles.playground_wrapper} ref={ref}>
         <Resizable className={styles.playground}>
            {playgroundTools?.map(
               (tool: { component: React.ReactNode; id: string }) => (
                  <Fragment key={tool.id}>{tool.component}</Fragment>
               ),
            )}

            <motion.div
               layout
               className={styles.playground_view}
               id="playground_view"
               style={container}
            >
               <AnimatePresence mode="popLayout">{children}</AnimatePresence>
            </motion.div>
         </Resizable>
      </motion.div>
   );
}

export default Playground;
