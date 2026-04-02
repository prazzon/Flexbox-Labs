"use client";

import { State } from "@/app/types";
import { Reorder, useDragControls, useMotionValue } from "motion/react";
import { forwardRef } from "react";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { PiDotsNineBold } from "react-icons/pi";
import { useRaisedShadow } from "../../../../_hooks/useRaisedShadow";
import { Edit } from "../Save";
import styles from "./SaveItem.module.scss";

type Props = {
   edit: Edit;
   handleView: (data: State) => void;
   handleDelete: (id: number, name: string) => void;
};

const SaveItem = forwardRef<HTMLLIElement, Props>(function SaveItem(
   { edit, handleView, handleDelete },
   ref,
) {
   const y = useMotionValue(0);
   const boxShadow = useRaisedShadow(y);
   const controls = useDragControls();

   return (
      <Reorder.Item
         value={edit}
         id={String(edit.id)}
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
            role="button"
            tabIndex={0}
            aria-label={`Reorder saved edit: ${edit.name}`}
            onPointerDown={(e) => controls.start(e)}
            onKeyDown={(e) => {
               if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
               }
            }}
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
            type="button"
            className={styles.item__btn}
            onClick={() => handleView(edit.data)}
            aria-label={`Load saved edit: ${edit.name}`}
         >
            <FaEye />
         </button>
         <button
            type="button"
            className={`${styles.item__btn} ${styles.delete}`}
            onClick={() => handleDelete(edit.id, edit.name)}
            aria-label={`Delete saved edit: ${edit.name}`}
         >
            <LuTrash2 />
         </button>
      </Reorder.Item>
   );
});

export default SaveItem;
