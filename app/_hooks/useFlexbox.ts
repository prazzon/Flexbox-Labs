import { useCallback } from "react";
import {
   addItem,
   clearSelected,
   duplicateItem,
   editContainer,
   editItem,
   editItemStyle,
   editItemText,
   redoFlexbox,
   removeItem,
   resetContainer,
   selectCanRedoFlexbox,
   selectCanUndoFlexbox,
   selectContainer,
   selectItems,
   selectFlexbox,
   selectSelectedItems,
   setFlexbox,
   toggleAllSelected,
   toggleSelected,
   undoFlexbox,
} from "../_lib/features/flexbox/flexboxSlice";
import { FlexboxContainer, Flexbox } from "../_lib/types/flexbox";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";
import useSettings from "./useSettings";

export const useFlexbox = () => {
   const { selectMultiple } = useSettings();
   const dispatch = useAppDispatch();
   const items = useAppSelector(selectItems);
   const container = useAppSelector(selectContainer);
   const selectedItems = useAppSelector(selectSelectedItems);
   const canUndo = useAppSelector(selectCanUndoFlexbox);
   const canRedo = useAppSelector(selectCanRedoFlexbox);
   const flexbox = useAppSelector(selectFlexbox);

   const handleSetFlexbox = useCallback(
      (state: Flexbox) => {
         dispatch(setFlexbox(state));
      },
      [dispatch],
   );

   const handleEditContainer = useCallback(
      (key: keyof FlexboxContainer, value: string) => {
         dispatch(editContainer({ key, value }));
      },
      [dispatch],
   );

   const handleEditItem = useCallback(
      (key: string, value: string) => {
         dispatch(editItem({ key, value }));
      },
      [dispatch],
   );

   const handleEditItemStyle = useCallback(
      (key: string, value: string) => {
         dispatch(editItemStyle({ key, value }));
      },
      [dispatch],
   );

   const handleEditItemText = useCallback(
      (id: string, value: string) => {
         dispatch(editItemText({ id, value }));
      },
      [dispatch],
   );

   const handleAddItem = useCallback(() => {
      dispatch(addItem());
   }, [dispatch]);

   const handleRemoveItem = useCallback(() => {
      dispatch(removeItem());
   }, [dispatch]);

   const handleDuplicateItem = useCallback(() => {
      dispatch(duplicateItem());
   }, [dispatch]);

   const handleToggleSelected = useCallback(
      (id: string) => {
         dispatch(toggleSelected({ id, selectMultiple }));
      },
      [dispatch, selectMultiple],
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
      dispatch(undoFlexbox());
   }, [dispatch]);

   const handleRedo = useCallback(() => {
      dispatch(redoFlexbox());
   }, [dispatch]);

   return {
      flexbox,
      items,
      container,
      selectedItems,
      canUndo,
      canRedo,
      setFlexbox: handleSetFlexbox,
      editContainer: handleEditContainer,
      editItem: handleEditItem,
      editItemStyle: handleEditItemStyle,
      editItemText: handleEditItemText,
      addItem: handleAddItem,
      removeItem: handleRemoveItem,
      duplicateItem: handleDuplicateItem,
      toggleSelected: handleToggleSelected,
      toggleAllSelected: handleToggleAllSelected,
      clearSelected: handleClearSelected,
      resetContainer: handleResetContainer,
      undo: handleUndo,
      redo: handleRedo,
   };
};
