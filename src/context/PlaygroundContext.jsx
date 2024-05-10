/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useHistoryState } from "@uidotdev/usehooks";

const PlaygroundContext = createContext();

const newItem = (length) => {
   return {
      id: Math.random(),
      text: length + 1,
      styles: defaultItemStyle,
   };
};

const defaultItemStyle = {
   order: 0,
   flexGrow: 0,
   flexShrink: 1,
   flexBasis: "auto",
   alignSelf: "auto",
   fontSize: "16px",
   width: "auto",
   height: "auto",
};

const PlaygroundProvider = ({ children }) => {
   const { state, set, undo, redo, clear, canUndo, canRedo } = useHistoryState({
      items: [newItem(0), newItem(1), newItem(2)],
      container: {
         display: "flex",
         gap: "20px",
      },
   });

   const [selectedItems, setSelectedItems] = useState([]);
   const [selectMultiple, setSelectMultiple] = useState(true);

   const items = state.items;
   const container = state.container;

   const getItem = (id, key) => {
      return items.find((item) => item.id === id)[key];
   };

   const getItemStyle = (id, key) => {
      return items.find((item) => item.id === id)?.styles[key];
   };

   const addItem = () => {
      set({ ...state, items: [...state.items, newItem(items.length)] });
   };

   const editItem = (key, value) => {
      const newItem = items.map((item) => {
         for (const selectedItem of selectedItems) {
            if (item.id === selectedItem.id) {
               return { ...item, [key]: value };
            }
         }
         return item;
      })

      set({ ...state, items: newItem });
   };

   const editItemStyle = (key, value) => {
      const newItemStyles = items.map((item) => {
         for (const selectedItem of selectedItems) {
            if (item.id === selectedItem.id) {
               return { ...item, styles: { ...item.styles, [key]: value } };
            }
         }
         return item;
      })

      set({ ...state, items: newItemStyles });
   };

   const removeItem = () => {
      const newItems = items.filter((item) => !selectedItems.includes(item));
      set({ ...state, items: newItems });

      setSelectedItems([]);
   };

   const duplicateItem = () => {
      const newItems = selectedItems.map((item) => {
         return { ...item, id: Math.random() };
      });

      set({ ...state, items: [...state.items, ...newItems] });
   };

   const toggleSelectedItems = (id) => {
      if (selectMultiple) {
         const index = selectedItems.findIndex((item) => item.id === id);

         if (index !== -1) {
            setSelectedItems((prev) => prev.filter((item) => item.id !== id));
         } else {
            setSelectedItems((prev) => [
               ...prev,
               items.find((item) => item.id === id),
            ]);
         }
      } else {
         setSelectedItems((prev) =>
            prev.at(0)?.id === id ? [] : [items.find((item) => item.id === id)]
         );
      }
   };

   const clearSelectedItems = () => {
      setSelectedItems([]);
   }

   const editContainer = (key, value) => {
      set({ ...state, container: { ...state.container, [key]: value } });
   };

   return (
      <PlaygroundContext.Provider
         value={{
            container,
            editContainer,
            items,
            getItem,
            getItemStyle,
            addItem,
            editItem,
            editItemStyle,
            removeItem,
            duplicateItem,
            selectedItems,
            toggleSelectedItems,
            clearSelectedItems,
            selectMultiple,
            setSelectMultiple,
            defaultItemStyle,
            undo,
            redo,
            canUndo,
            canRedo,
            clear,
         }}
      >
         {children}
      </PlaygroundContext.Provider>
   );
};

const usePlayground = () => {
   const context = useContext(PlaygroundContext);

   if (!context) {
      throw new Error("usePlayground must be used within a PlaygroundProvider");
   }

   return context;
};

export { PlaygroundProvider, usePlayground };
