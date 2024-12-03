import { createContext, CSSProperties, useState } from "react";
import { useHistoryState } from "@uidotdev/usehooks";
import useSettings from "../hooks/useSettings";

export interface Container {
   display: CSSProperties["display"];
   gap: CSSProperties["gap"];
   flexDirection?: CSSProperties["flexDirection"];
   flexWrap?: CSSProperties["flexWrap"];
   justifyContent?: CSSProperties["justifyContent"];
   alignItems?: CSSProperties["alignItems"];
   alignContent?: CSSProperties["alignContent"];
}

export interface ItemStyle {
   order?: number;
   flexGrow?: number;
   flexShrink?: number;
   flexBasis?: string;
   alignSelf?: string;
   width?: string;
   height?: string;
}

export interface Item {
   id: number;
   text: string;
   styles: ItemStyle;
}

export interface State {
   items: Item[];
   container: Container;
}

interface Context {
   state: State;
   set: (newState: State) => void;
   container: Container;
   items: Item[];
   editContainer: (key: keyof Container, value: string) => void;
   editItem: (key: string, value: string) => void;
   editItemStyle: (key: string, value: string) => void;
   getItemText: (id: number) => string;
   editItemText: (id: number, value: string) => void;
   getItemStyle: (
      id: number,
      key: keyof ItemStyle
   ) => ItemStyle[keyof ItemStyle];
   addItem: () => void;
   removeItem: () => void;
   duplicateItem: () => void;
   selectedItems: number[];
   toggleSelected: (id: number) => void;
   toggleAllSelected: () => void;
   clearSelected: () => void;
   undoAction: () => void;
   redoAction: () => void;
   canUndo: boolean;
   canRedo: boolean;
   resetContainer: () => void;
}

interface Provider {
   children: React.ReactNode;
}

export const PlaygroundContext = createContext<Context | null>(null);

const defaultItemStyle: ItemStyle = {
   width: "150px",
   height: "150px",
};

const defaultContainer: Container = {
   display: "flex",
   gap: "20px",
};

const newItem = (length: number): Item => {
   return {
      id: Math.random(),
      text: `${length + 1}`,
      styles: defaultItemStyle,
   };
};

const defaultState: State = {
   items: [newItem(0), newItem(1), newItem(2)],
   container: defaultContainer,
};

export const PlaygroundProvider = ({ children }: Provider) => {
   const { state, set, undo, redo, canUndo, canRedo } = useHistoryState(defaultState);
   const { selectMultiple } = useSettings();

   const [selectedItems, setSelectedItems] = useState<number[]>([]);

   const items = state.items;
   const container = state.container;

   const editContainer: Context["editContainer"] = (key, value) => {
      set({ ...state, container: { ...state.container, [key]: value } });
   };

   const getItemText: Context["getItemText"] = (id) => {
      return items.find((item) => item.id === id)!.text;
   };

   const editItemText: Context["editItemText"] = (id, value) => {
      const newItem = items.map((item) => {
         if (item.id === id) {
            return { ...item, text: value };
         }
         return item;
      });
      set({ ...state, items: newItem });
   };

   const getItemStyle: Context["getItemStyle"] = (id, key) => {
      return items.find((item) => item.id === id)?.styles[key];
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

   const toggleAllSelected = () => {
      if (selectedItems.length === items.length) {
         setSelectedItems([]);
      } else {
         setSelectedItems(items.map((item) => item.id));
      }
   };

   const clearSelected = () => {
      if (selectedItems.length > 0) setSelectedItems([]);
   };

   const resetContainer = () => {
      set(defaultState);
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
            state,
            set,
            container,
            items,
            editContainer,
            editItem,
            editItemStyle,
            getItemText,
            editItemText,
            getItemStyle,
            addItem,
            removeItem,
            duplicateItem,
            selectedItems,
            toggleSelected,
            toggleAllSelected,
            clearSelected,
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
