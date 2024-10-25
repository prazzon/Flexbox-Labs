import styles from "./Layout.module.scss";
import usePlayground from "../../../hooks/usePlayground";
import { layouts } from "./layouts";
import { motion } from "framer-motion";
import { State } from "../../../context/PlaygroundContext";

function Layout() {
   const { set, clearSelected } = usePlayground();

   function handleClick(layout: State) {
      set(layout);
      clearSelected();
   }

   return (
      <motion.div
         className={styles.container}
         initial={{ y: 10, opacity: 0.5 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.2 }}
         exit={{ y: -10, opacity: 0.5 }}
      >
         <h2 className="title">Layouts</h2>
         <div className={styles.layout_container}>
            {layouts.map((layout, index) => (
               <div
                  key={index}
                  className={styles.layout}
                  onClick={() => handleClick(layout.layout)}
               >
                  {layout.img && <layout.img />}
                  <h4 className={styles.layout__title}>{layout.name}</h4>
               </div>
            ))}
         </div>
      </motion.div>
   );
}

export default Layout;
