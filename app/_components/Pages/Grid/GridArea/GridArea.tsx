"use client";

import { useGrid } from "@/app/_hooks/useGrid";
import { generateGridElements } from "@/app/_utils/generateGridElements";
import { AnimatePresence, motion } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";
import GridItem from "../GridItem/GridItem";
import styles from "./GridArea.module.scss";

function GridArea() {
   const { container, items, addItemStyle, gridLines } = useGrid();

   const { gridSections, rowTracks, columnTracks } = generateGridElements(
      container,
      items
   );

   return (
      <>
         {gridSections.map((item) => (
            <div
               key={item.key}
               className={styles.grid_section}
               style={item.style}
            >
               <button
                  type="button"
                  className={styles.add_btn}
                  onClick={() => addItemStyle(item.style)}
               >
                  <div className={styles.add_btn_content}>
                     <IoAddOutline />
                     {/* Add Item */}
                  </div>
               </button>
            </div>
         ))}
         <AnimatePresence mode="popLayout">
            {items.map((item) => (
               <GridItem item={item} key={item.id} />
            ))}
         </AnimatePresence>

         {gridLines &&
            rowTracks.map((track) => (
               <motion.div
                  layout
                  key={track.key}
                  className={styles.grid_track_row}
                  data-row={track.data}
                  style={track.style}
               />
            ))}
         
         {gridLines &&
            columnTracks.map((track) => (
               <motion.div
                  layout
                  key={track.key}
                  className={styles.grid_track_column}
                  data-column={track.data}
                  style={track.style}
               />
            ))}
      </>
   );
}

export default GridArea;
