import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiSaveFill } from "react-icons/ri";
import { State } from "../../../context/PlaygroundContext";
import usePlayground from "../../../hooks/usePlayground";
import styles from "./Save.module.scss";
import SaveItem from "./SaveItem/SaveItem";

export interface Edit {
   id: number;
   name: string;
   date: string;
   data: State;
}

function Save() {
   const [name, setName] = useState("");
   const [edits, saveEdit] = useLocalStorage<Edit[]>("edits", []);
   const { state, set, clearSelected } = usePlayground();

   const toastConfig = {
      duration: 10000,
      style: { paddingRight: "15px" },
      id: "save",
   };

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!name) return;

      const date = new Date().toLocaleString();

      saveEdit((prevEdits) => [
         ...prevEdits,
         {
            id: Date.now(),
            name,
            date,
            data: state,
         },
      ]);

      setName("");
   }

   function handleDeleteEditToast(message: string) {
      const prevEdits = edits;

      toast.error(
         (t) => (
            <div className={styles.toast}>
               <p>{message}</p>
               <button
                  onClick={() => {
                     saveEdit(prevEdits);
                     toast.dismiss(t.id);
                  }}
                  className={styles.undo}
               >
                  Undo
               </button>
               <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
            </div>
         ),
         toastConfig
      );
   }

   function Clear() {
      saveEdit([]);

      handleDeleteEditToast("All edits has been deleted");
   }

   function handleView(data: State) {
      set(data);
      clearSelected();
   }

   function handleDelete(id: number, name: string) {
      if (id) {
         saveEdit((prevEdits) => prevEdits.filter((edit) => edit.id !== id));
      } else {
         saveEdit((prevEdits) =>
            prevEdits.filter((edit) => edit.name !== name)
         );
      }

      handleDeleteEditToast("Edit has been deleted");
   }

   return (
      <div className={styles.container}>
         <h2 className="title">Add Edit</h2>
         <form className={styles.form} onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Name"
               maxLength={20}
               className={styles.input}
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.form__btn} type="submit" disabled={!name}>
               <RiSaveFill /> Save Edit
            </button>
         </form>

         <h2 className="title">Saved Edits</h2>

         <Reorder.Group
            axis="y"
            values={edits}
            onReorder={saveEdit}
            className={styles.list}
         >
            <AnimatePresence mode="popLayout" initial={false}>
               {edits.map((edit) => (
                  <SaveItem
                     key={edit.name}
                     edit={edit}
                     handleView={handleView}
                     handleDelete={handleDelete}
                  />
               ))}
            </AnimatePresence>
         </Reorder.Group>

         {edits.length > 0 && (
            <motion.button
               layout
               className={styles.clear__btn}
               onClick={Clear}
               type="button"
            >
               Clear All Saves
            </motion.button>
         )}
      </div>
   );
}

export default Save;
