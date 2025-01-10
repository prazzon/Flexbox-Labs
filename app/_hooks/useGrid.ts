import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   addItem,
   addItemStyle,
   clearSelected,
   editContainer,
   editItem,
   editItemStyle,
   editItemText,
   redoGrid,
   removeItem,
   resetContainer,
   selectCanRedoGrid,
   selectCanUndoGrid,
   selectContainer,
   selectGrid,
   selectItems,
   selectSelectedItems,
   setGrid,
   toggleAllSelected,
   toggleSelected,
   undoGrid,
} from "../_lib/features/grid/gridSlice";
import { Grid, GridContainer, GridItemStyle } from "../_lib/types/grid";
import useSettings from "./useSettings";

export const useGrid = () => {
   const { selectMultiple } = useSettings();
   const dispatch = useDispatch();
   const items = useSelector(selectItems);
   const container = useSelector(selectContainer);
   const selectedItems = useSelector(selectSelectedItems);
   const canUndo = useSelector(selectCanUndoGrid);
   const canRedo = useSelector(selectCanRedoGrid);
   const grid = useSelector(selectGrid);

   const handleSetGrid = useCallback(
      (state: Grid) => {
         dispatch(setGrid(state));
      },
      [dispatch]
   );

   const handleEditContainer = useCallback(
      (key: keyof GridContainer, value: string) => {
         dispatch(editContainer({ key, value }));
      },
      [dispatch]
   );

   const handleEditItem = useCallback(
      (key: string, value: string) => {
         dispatch(editItem({ key, value }));
      },
      [dispatch]
   );

   const handleEditItemStyle = useCallback(
      (key: string, value: string) => {
         dispatch(editItemStyle({ key, value }));
      },
      [dispatch]
   );

   const handleEditItemText = useCallback(
      (id: number, value: string) => {
         dispatch(editItemText({ id, value }));
      },
      [dispatch]
   );

   const handleAddItem = useCallback(() => {
      dispatch(addItem());
   }, [dispatch]);

   const handleAddItemStyle = useCallback(
      (style: GridItemStyle) => {
         dispatch(addItemStyle({ style }));
      },
      [dispatch]
   );

   const handleRemoveItem = useCallback(() => {
      dispatch(removeItem());
   }, [dispatch]);

   const handleToggleSelected = useCallback(
      (id: number) => {
         dispatch(toggleSelected({ id, selectMultiple }));
      },
      [dispatch, selectMultiple]
   );

   const handleToggleAllSelected = useCallback(() => {
      dispatch(toggleAllSelected());
   }, [dispatch]);

   const handleClearSelected = useCallback(() => {
      dispatch(clearSelected());
   }, [dispatch]);

   const handleResetContainer = useCallback(() => {
      dispatch(resetContainer());
   }, [dispatch]);

   const handleUndo = useCallback(() => {
      dispatch(undoGrid());
   }, [dispatch]);

   const handleRedo = useCallback(() => {
      dispatch(redoGrid());
   }, [dispatch]);

   return {
      grid,
      items,
      container,
      selectedItems,
      canUndo,
      canRedo,
      setGrid: handleSetGrid,
      editContainer: handleEditContainer,
      editItem: handleEditItem,
      editItemStyle: handleEditItemStyle,
      editItemText: handleEditItemText,
      addItem: handleAddItem,
      addItemStyle: handleAddItemStyle,
      removeItem: handleRemoveItem,
      toggleSelected: handleToggleSelected,
      toggleAllSelected: handleToggleAllSelected,
      clearSelected: handleClearSelected,
      resetContainer: handleResetContainer,
      undo: handleUndo,
      redo: handleRedo,
   };
};
