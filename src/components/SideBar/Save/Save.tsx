import styles from "./Save.module.scss";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import usePlayground from "../../../hooks/usePlayground";
import { State } from "../../../context/PlaygroundContext";
import { AnimatePresence, motion } from "framer-motion";

import { RiSaveFill } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

interface Edits {
   name: string;
   date: string;
   data: State;
}

function Save() {
   const [name, setName] = useState("");
   const { state, set, clearSelected } = usePlayground();
   const [edits, saveEdit] = useLocalStorage<Edits[]>("edits", []);

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!name) return;

      const date = new Date().toLocaleString();

      saveEdit((prevEdits) => [
         ...prevEdits,
         {
            name,
            date,
            data: state,
         },
      ]);

      setName("");
   }

   function Clear() {
      saveEdit([]);
   }

   function handleDelete(key: string) {
      saveEdit((prevEdits) => prevEdits.filter((edit) => edit.name !== key));
   }

   return (
      <motion.div
         className={styles.container}
         initial={{ y: 10, opacity: 0.5 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.2 }}
         exit={{ y: -10, opacity: 0.5 }}
      >
         <h2 className="title">Add Edit</h2>
         <form className={styles.form} onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Name"
               className={styles.input}
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.form__btn} type="submit" disabled={!name}>
               <RiSaveFill /> Save Edit
            </button>
         </form>

         <h2 className="title">Saved Edits</h2>

         <ul className={styles.list}>
            <AnimatePresence mode="popLayout" initial={false}>
               {edits.map((edit) => (
                  <motion.li
                     key={edit.name}
                     className={styles.item}
                     layout
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                  >
                     <div className={styles.item__info}>
                        <p className={styles.item__name}>{edit.name}</p>
                        <p className={styles.item__date}>{edit.date}</p>
                     </div>
                     <button
                        className={styles.item__btn}
                        onClick={() => {
                           set(edit.data);
                           clearSelected();
                        }}
                     >
                        <FaEye />
                     </button>
                     <button
                        className={`${styles.item__btn} ${styles.delete}`}
                        onClick={() => handleDelete(edit.name)}
                     >
                        <LuTrash2 />
                     </button>
                  </motion.li>
               ))}
            </AnimatePresence>
         </ul>

         {edits.length > 0 && (
            <motion.button layout className={styles.clear__btn} onClick={Clear}>
               Clear All Saves
            </motion.button>
         )}
      </motion.div>
   );
}

export default Save;
