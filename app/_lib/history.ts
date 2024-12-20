import { Action, UnknownAction, createAction } from "@reduxjs/toolkit";

export interface HistoryState<T> {
   past: Partial<T>[];
   present: T;
   future: Partial<T>[];
}

export type HistoryEnabledState<T> = HistoryState<T>;

export const createHistoryActions = (sliceName: string) => ({
   undo: createAction(`${sliceName}/UNDO`),
   redo: createAction(`${sliceName}/REDO`),
});

export function enableHistory<T, A extends Action = UnknownAction>(
   reducer: (state: T | undefined, action: A) => T,
   sliceName: string,
   trackKeys: (keyof T)[]
) {
   const { undo, redo } = createHistoryActions(sliceName);

   const initialState: HistoryEnabledState<T> = {
      past: [],
      present: reducer(undefined, { type: "@@INIT" } as A),
      future: [],
   };

   return function (
      state: HistoryEnabledState<T> = initialState,
      action: A | ReturnType<typeof undo> | ReturnType<typeof redo>
   ): HistoryEnabledState<T> {
      const { past, present, future } = state;

      switch (action.type) {
         case undo.type: {
            if (past.length === 0) return state;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            const newPresent = { ...present, ...previous };
            return {
               past: newPast,
               present: newPresent as T,
               future: [
                  trackKeys.reduce(
                     (acc, key) => ({ ...acc, [key]: present[key] }),
                     {}
                  ),
                  ...future,
               ],
            };
         }

         case redo.type: {
            if (future.length === 0) return state;
            const next = future[0];
            const newFuture = future.slice(1);
            const newPresent = { ...present, ...next };
            return {
               past: [
                  ...past,
                  trackKeys.reduce(
                     (acc, key) => ({ ...acc, [key]: present[key] }),
                     {}
                  ),
               ],
               present: newPresent as T,
               future: newFuture,
            };
         }

         default: {
            const newPresent = reducer(present, action as A);
            if (present === newPresent) {
               return state;
            }
            const hasChangedTrackedKeys = trackKeys.some(
               (key) => present[key] !== newPresent[key]
            );
            if (!hasChangedTrackedKeys) {
               return {
                  ...state,
                  present: newPresent,
               };
            }
            const trackedState = trackKeys.reduce(
               (acc, key) => ({ ...acc, [key]: present[key] }),
               {}
            );
            return {
               past: [...past, trackedState],
               present: newPresent,
               future: [],
            };
         }
      }
   };
}

export const canUndo = <T>(state: HistoryEnabledState<T>) =>
   state.past.length > 0;
export const canRedo = <T>(state: HistoryEnabledState<T>) =>
   state.future.length > 0;
