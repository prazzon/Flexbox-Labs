import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./MainAxisPointer.module.scss";
import usePlayground from "../../../hooks/usePlayground";
import Tooltip from "../../UI/Tooltip/Tooltip";

function MainAxisPointer() {
   const { editContainer, container } = usePlayground();
   const [direction, setDirection] = useState(0);

   function handleClick() {
      switch (container.flexDirection) {
         case "column":
            editContainer("flexDirection", "row-reverse");
            break;
         case "row-reverse":
            editContainer("flexDirection", "column-reverse");
            break;
         case "column-reverse":
            editContainer("flexDirection", "row");
            break;
         default:
            editContainer("flexDirection", "column");
      }
   }

   useEffect(() => {
      switch (container.flexDirection) {
         case "column":
            setDirection(90);
            break;
         case "row-reverse":
            setDirection(180);
            break;
         case "column-reverse":
            setDirection(270);
            break;
         default:
            setDirection(0);
      }
   }, [container.flexDirection]);

   return (
      <motion.div layout className={styles.pointer} onClick={handleClick}>
         <motion.span
            className={styles.icon}
            animate={{ rotate: direction }}
            transition={{ duration: 0.2 }}
         >
            <FaLongArrowAltRight />
         </motion.span>
         <Tooltip position="bottom">main axis direction</Tooltip>
      </motion.div>
   );
}

export default MainAxisPointer;
