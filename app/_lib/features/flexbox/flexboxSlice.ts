import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   canRedo,
   canUndo,
   createHistoryActions,
   enableHistory,
   HistoryEnabledState,
} from "../../history";
import {
   Flexbox,
   FlexboxContainer,
   FlexboxItem,
   FlexboxItemStyle,
   FlexboxState,
} from "../../types/flexbox";

type RootState = {
   flexbox: HistoryEnabledState<FlexboxState>;
};

const defaultItemStyle: FlexboxItemStyle = {
   width: "150px",
   height: "150px",
};

const defaultContainer: FlexboxContainer = {
   display: "flex",
   gap: "20px",
};

const newItem = (length: number): FlexboxItem => ({
   id: Math.random(),
   text: `${length + 1}`,
   styles: defaultItemStyle,
});

const initialState: FlexboxState = {
   items: [newItem(0), newItem(1), newItem(2)],
   container: defaultContainer,
   selectedItems: [],
};

export const flexboxSlice = createSlice({
   name: "flexbox",
   initialState,
   reducers: {
      setFlexbox: (state, action: PayloadAction<Flexbox>) => {
         state.items = action.payload.items;
         state.container = action.payload.container;
         state.selectedItems = [];
      },
      editContainer: (
         state,
         action: PayloadAction<{
            key: keyof FlexboxContainer;
            value: string | number;
         }>
      ) => {
         const { key, value } = action.payload;
         state.container = {
            ...state.container,
            [key]: value,
         };
      },
      editItem: (
         state,
         action: PayloadAction<{ key: string; value: string }>
      ) => {
         const { key, value } = action.payload;
         state.items = state.items.map((item) =>
            state.selectedItems.includes(item.id)
               ? { ...item, [key]: value }
               : item
         );
      },
      editItemStyle: (
         state,
         action: PayloadAction<{ key: string; value: string | number }>
      ) => {
         const { key, value } = action.payload;
         state.items = state.items.map((item) =>
            state.selectedItems.includes(item.id)
               ? { ...item, styles: { ...item.styles, [key]: value } }
               : item
         );
      },
      editItemText: (
         state,
         action: PayloadAction<{ id: number; value: string }>
      ) => {
         const { id, value } = action.payload;
         const item = state.items.find((item) => item.id === id);
         if (item) {
            item.text = value;
         }
      },
      addItem: (state) => {
         state.items.push(newItem(state.items.length));
      },
      removeItem: (state) => {
         state.items = state.items.filter(
            (item) => !state.selectedItems.includes(item.id)
         );
         state.selectedItems = [];
      },
      duplicateItem: (state) => {
         const newItems = state.selectedItems.map((itemId) => {
            const item = state.items.find((item) => item.id === itemId)!;
            return { ...item, id: Math.random() };
         });
         state.items = [...state.items, ...newItems];
      },
      toggleSelected: (
         state,
         action: PayloadAction<{ id: number; selectMultiple: boolean }>
      ) => {
         const { id, selectMultiple } = action.payload;

         if (selectMultiple) {
            const index = state.selectedItems.indexOf(id);
            if (index !== -1) {
               state.selectedItems.splice(index, 1);
            } else {
               state.selectedItems.push(id);
            }
         } else {
            state.selectedItems = state.selectedItems[0] === id ? [] : [id];
         }
      },
      toggleAllSelected: (state) => {
         if (state.selectedItems.length === state.items.length) {
            state.selectedItems = [];
         } else {
            state.selectedItems = state.items.map((item) => item.id);
         }
      },
      clearSelected: (state) => {
         state.selectedItems = [];
      },
      resetContainer: () => {
         return initialState;
      },
   },
});

export const {
   setFlexbox,
   editContainer,
   editItem,
   editItemStyle,
   editItemText,
   addItem,
   removeItem,
   duplicateItem,
   toggleSelected,
   toggleAllSelected,
   clearSelected,
   resetContainer,
} = flexboxSlice.actions;

const flexboxReducer = enableHistory(flexboxSlice.reducer, "flexbox", [
   "items",
   "container",
]);

export const { undo: undoFlexbox, redo: redoFlexbox } =
   createHistoryActions("flexbox");

// Selector functions
export const selectItems = (state: RootState) => state.flexbox.present.items;
export const selectContainer = (state: RootState) =>
   state.flexbox.present.container;
export const selectSelectedItems = (state: RootState) =>
   state.flexbox.present.selectedItems;
export const selectCanUndoFlexbox = (state: RootState) =>
   canUndo(state.flexbox);
export const selectCanRedoFlexbox = (state: RootState) =>
   canRedo(state.flexbox);

export const selectFlexbox = createSelector(
   [selectItems, selectContainer],
   (items, container) => ({
      items,
      container,
   })
);

export default flexboxReducer;
