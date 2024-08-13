import { createContext, CSSProperties, useState } from "react";
import { useHistoryState } from "@uidotdev/usehooks";

interface Container {
   display: CSSProperties["display"];
   gap: CSSProperties["gap"];
   flexDirection?: CSSProperties["flexDirection"];
   flexWrap?: CSSProperties["flexWrap"];
   justifyContent?: CSSProperties["justifyContent"];
   alignItems?: CSSProperties["alignItems"];
   alignContent?: CSSProperties["alignContent"];
}

export interface ItemStyle {
   order: number;
   flexGrow: number;
   flexShrink: number;
   flexBasis: string;
   alignSelf: string;
   fontSize: string;
   width: string;
   height: string;
}

interface Item {
   id: number;
   text: string;
   styles: ItemStyle;
}

interface Context {
   container: Container;
   items: Item[];
   editContainer: (key: keyof Container, value: string) => void;
   editItem: (key: string, value: string) => void;
   editItemStyle: (key: string, value: string) => void;
   getItemText: (id: number) => string;
   getItemStyle: (
      id: number,
      key: keyof ItemStyle
   ) => ItemStyle[keyof ItemStyle];
   addItem: () => void;
   removeItem: () => void;
   duplicateItem: () => void;
   selectedItems: number[];
   toggleSelected: (id: number) => void;
   clearSelected: () => void;
   selectMultiple: boolean;
   setSelectMultiple: (value: boolean) => void;
   defaultItemStyle: ItemStyle;
   undoAction: () => void;
   redoAction: () => void;
   canUndo: boolean;
   canRedo: boolean;
   resetContainer: () => void;
}

export const PlaygroundContext = createContext<Context | null>(null);

const defaultItemStyle: ItemStyle = {
   order: 0,
   flexGrow: 0,
   flexShrink: 1,
   flexBasis: "auto",
   alignSelf: "auto",
   fontSize: "16px",
   width: "auto",
   height: "auto",
};

const newItem = (length: number): Item => {
   return {
      id: Math.random(),
      text: `${length + 1}`,
      styles: defaultItemStyle,
   };
};

export const PlaygroundProvider = ({ children }: { children: React.ReactNode }) => {
   const { state, set, undo, redo, clear, canUndo, canRedo } = useHistoryState({
      items: [newItem(0), newItem(1), newItem(2)],
      container: {
         display: "flex",
         gap: "20px",
      },
   });

   const [selectedItems, setSelectedItems] = useState<number[]>([]);
   const [selectMultiple, setSelectMultiple] = useState(true);

   const items = state.items;
   const container = state.container;

   const editContainer: Context["editContainer"] = (key, value) => {
      set({ ...state, container: { ...state.container, [key]: value } });
   };

   const getItemText: Context["getItemText"] = (id) => {
      return items.find((item) => item.id === id)!.text;
   };

   const getItemStyle: Context["getItemStyle"] = (id, key) => {
      return items.find((item) => item.id === id)!.styles[key];
   };

   const addItem = () => {
      set({ ...state, items: [...state.items, newItem(items.length)] });
   };

   const editItem: Context["editItem"] = (key, value) => {
      const newItem = items.map((item) => {
         for (const selectedItem of selectedItems) {
            if (item.id === selectedItem) {
               return { ...item, [key]: value };
            }
         }
         return item;
      });

      set({ ...state, items: newItem });
   };

   const editItemStyle: Context["editItemStyle"] = (key, value) => {
      const newItemStyles = items.map((item) => {
         for (const selectedItem of selectedItems) {
            if (item.id === selectedItem) {
               return { ...item, styles: { ...item.styles, [key]: value } };
            }
         }
         return item;
      });

      set({ ...state, items: newItemStyles });
   };

   const removeItem = () => {
      const newItems = items.filter((item) => !selectedItems.includes(item.id));
      set({ ...state, items: newItems });

      setSelectedItems([]);
   };

   const duplicateItem = () => {
      const newItems = selectedItems.map((itemId) => {
         const item = items.find((item) => item.id === itemId)!;
         return { ...item, id: Math.random() };
      });

      set({ ...state, items: [...state.items, ...newItems] });
   };

   const toggleSelected: Context["toggleSelected"] = (id) => {
      if (selectMultiple) {
         const index = selectedItems.findIndex((itemId) => itemId === id);

         if (index !== -1) {
            setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
         } else {
            setSelectedItems((prev) => [...prev, id]);
         }
      } else {
         setSelectedItems((prev) => (prev[0] === id ? [] : [id]));
      }
   };

   const clearSelected = () => {
      if (selectedItems.length > 0) setSelectedItems([]);
   };

   const resetContainer = () => {
      clear();
      setSelectedItems([]);
   };

   const undoAction = () => {
      undo();
      clearSelected();
   };

   const redoAction = () => {
      redo();
      clearSelected();
   };

   return (
      <PlaygroundContext.Provider
         value={{
            container,
            items,
            editContainer,
            editItem,
            editItemStyle,
            getItemText,
            getItemStyle,
            addItem,
            removeItem,
            duplicateItem,
            selectedItems,
            toggleSelected,
            clearSelected,
            selectMultiple,
            setSelectMultiple,
            defaultItemStyle,
            undoAction,
            redoAction,
            canUndo,
            canRedo,
            resetContainer,
         }}
      >
         {children}
      </PlaygroundContext.Provider>
   );
};