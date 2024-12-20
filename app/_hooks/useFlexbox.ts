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
import { useDispatch, useSelector } from "react-redux";
import useSettings from "./useSettings";

export const useFlexbox = () => {
   const { selectMultiple } = useSettings();
   const dispatch = useDispatch();
   const items = useSelector(selectItems);
   const container = useSelector(selectContainer);
   const selectedItems = useSelector(selectSelectedItems);
   const canUndo = useSelector(selectCanUndoFlexbox);
   const canRedo = useSelector(selectCanRedoFlexbox);
   const flexbox = useSelector(selectFlexbox);

   const handleSetFlexbox = useCallback(
      (state: Flexbox) => {
         dispatch(setFlexbox(state));
      },
      [dispatch]
   );

   const handleEditContainer = useCallback(
      (key: keyof FlexboxContainer, value: string) => {
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

   const handleRemoveItem = useCallback(() => {
      dispatch(removeItem());
   }, [dispatch]);

   const handleDuplicateItem = useCallback(() => {
      dispatch(duplicateItem());
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
