import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { forwardRef } from "react";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { PiDotsNineBold } from "react-icons/pi";
import { State } from "../../../../context/PlaygroundContext";
import { Edit } from "../Save";
import { useRaisedShadow } from "../../../../hooks/useRaisedShadow";
import styles from "./SaveItem.module.scss";

type Props = {
   edit: Edit;
   handleView: (data: State) => void;
   handleDelete: (id: number, name: string) => void;
};

const SaveItem = forwardRef<HTMLDivElement, Props>(function SaveItem(
   { edit, handleView, handleDelete },
   ref
) {
   const y = useMotionValue(0);
   const boxShadow = useRaisedShadow(y);
   const controls = useDragControls();

   return (
      <Reorder.Item
         value={edit}
         id={edit.name}
         style={{ boxShadow, y }}
         dragListener={false}
         dragControls={controls}
         className={styles.item}
         ref={ref}
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         exit={{ scale: 0.8, opacity: 0 }}
      >
         <span
            onPointerDown={(e) => controls.start(e)}
            style={{ touchAction: "none" }}
            className={styles.drag}
         >
            <PiDotsNineBold />
         </span>
         <div className={styles.item__info}>
            <p className={styles.item__name}>{edit.name}</p>
            <p className={styles.item__date}>{edit.date}</p>
         </div>
         <button
            className={styles.item__btn}
            onClick={() => handleView(edit.data)}
         >
            <FaEye />
         </button>
         <button
            className={`${styles.item__btn} ${styles.delete}`}
            onClick={() => handleDelete(edit.id, edit.name)}
         >
            <LuTrash2 />
         </button>
      </Reorder.Item>
   );
});

export default SaveItem;
