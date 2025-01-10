import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   canRedo,
   canUndo,
   createHistoryActions,
   enableHistory,
   HistoryEnabledState,
} from "../../history";
import {
   Grid,
   GridContainer,
   GridItem,
   GridItemStyle,
   GridState,
} from "../../types/grid";

type RootState = {
   grid: HistoryEnabledState<GridState>;
};

const defaultItemStyle: GridItemStyle = {
   width: "auto",
   height: "auto",
};

const defaultContainer: GridContainer = {
   display: "grid",
   gridTemplateColumns: "1fr 1fr 1fr",
   gridTemplateRows: "1fr 1fr 1fr",
   // gridAutoRows: "1fr",
   // rowGap: "15px",
   // columnGap: "15px",
   gap: "15px 15px",
};

const newItem = (length: number, styles = defaultItemStyle): GridItem => ({
   id: Math.random(),
   text: `${length + 1}`,
   styles,
});

const initialState: GridState = {
   // items: [newItem(0), newItem(1), newItem(2), { ...newItem(3), styles: { width: "auto", height: "auto", gridArea: "2 / 2 / 3 / 3" } }, newItem(4)],
   items: [],
   container: defaultContainer,
   selectedItems: [],
};

export const gridSlice = createSlice({
   name: "grid",
   initialState,
   reducers: {
      setGrid: (state, action: PayloadAction<Grid>) => {
         state.items = action.payload.items;
         state.container = action.payload.container;
         state.selectedItems = [];
      },
      editContainer: (
         state,
         action: PayloadAction<{
            key: keyof GridContainer;
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
      addItemStyle: (
         state,
         action: PayloadAction<{ style: GridItemStyle }>
      ) => {
         state.items.push(newItem(state.items.length, action.payload.style));
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
   setGrid,
   editContainer,
   editItem,
   editItemStyle,
   editItemText,
   addItem,
   addItemStyle,
   removeItem,
   toggleSelected,
   toggleAllSelected,
   clearSelected,
   resetContainer,
} = gridSlice.actions;

const gridReducer = enableHistory(gridSlice.reducer, "grid", [
   "items",
   "container",
]);

export const { undo: undoGrid, redo: redoGrid } = createHistoryActions("grid");

// Selector functions
export const selectItems = (state: RootState) => state.grid.present.items;
export const selectContainer = (state: RootState) =>
   state.grid.present.container;
export const selectSelectedItems = (state: RootState) =>
   state.grid.present.selectedItems;
export const selectCanUndoGrid = (state: RootState) => canUndo(state.grid);
export const selectCanRedoGrid = (state: RootState) => canRedo(state.grid);

export const selectGrid = createSelector(
   [selectItems, selectContainer],
   (items, container) => ({
      items,
      container,
   })
);

export default gridReducer;
