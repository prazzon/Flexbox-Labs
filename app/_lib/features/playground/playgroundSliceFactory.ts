import {
   createSelector,
   createSlice,
   PayloadAction,
   Slice,
} from "@reduxjs/toolkit";
import { Draft } from "immer";
import {
   canRedo,
   canUndo,
   createHistoryActions,
   enableHistory,
   HistoryEnabledState,
} from "../../history";

export interface PlaygroundItem<TStyles> {
   id: string;
   text: string;
   styles: TStyles;
}

export interface PlaygroundState<
   TItem extends PlaygroundItem<unknown>,
   TContainer,
> {
   items: TItem[];
   container: TContainer;
   selectedItems: string[];
}

export interface PlaygroundConfig<
   TItem extends PlaygroundItem<unknown>,
   TContainer,
> {
   name: string;
   initialItems: TItem[];
   defaultContainer: TContainer;
   extraReducers?: Record<
      string,
      (
         state: PlaygroundState<TItem, TContainer> & Record<string, unknown>,
      ) => void
   >;
   extraInitialState?: Record<string, unknown>;
}

export interface PlaygroundSlice<
   TItem extends PlaygroundItem<unknown>,
   TContainer,
> {
   slice: Slice<PlaygroundState<TItem, TContainer> & Record<string, unknown>>;
   reducer: ReturnType<
      typeof enableHistory<
         PlaygroundState<TItem, TContainer> & Record<string, unknown>
      >
   >;
   actions: ReturnType<typeof createHistoryActions>;
   selectors: {
      selectItems: (
         state: Record<
            string,
            HistoryEnabledState<
               PlaygroundState<TItem, TContainer> & Record<string, unknown>
            >
         >,
      ) => TItem[];
      selectContainer: (
         state: Record<
            string,
            HistoryEnabledState<
               PlaygroundState<TItem, TContainer> & Record<string, unknown>
            >
         >,
      ) => TContainer;
      selectSelectedItems: (
         state: Record<
            string,
            HistoryEnabledState<
               PlaygroundState<TItem, TContainer> & Record<string, unknown>
            >
         >,
      ) => string[];
      selectCanUndo: (
         state: Record<
            string,
            HistoryEnabledState<
               PlaygroundState<TItem, TContainer> & Record<string, unknown>
            >
         >,
      ) => boolean;
      selectCanRedo: (
         state: Record<
            string,
            HistoryEnabledState<
               PlaygroundState<TItem, TContainer> & Record<string, unknown>
            >
         >,
      ) => boolean;
      selectPlayground: ReturnType<typeof createSelector>;
   };
}

export function createPlaygroundSlice<
   TItem extends PlaygroundItem<unknown>,
   TContainer,
>(
   config: PlaygroundConfig<TItem, TContainer>,
): PlaygroundSlice<TItem, TContainer> {
   const {
      name,
      initialItems,
      defaultContainer,
      extraReducers = {},
      extraInitialState = {},
   } = config;

   const initialState: PlaygroundState<TItem, TContainer> &
      Record<string, unknown> = {
      items: initialItems,
      container: defaultContainer,
      selectedItems: [],
      ...extraInitialState,
   };

   const slice = createSlice({
      name,
      initialState,
      reducers: {
         setState: (
            state,
            action: PayloadAction<{ items: TItem[]; container: TContainer }>,
         ) => {
            state.items = action.payload.items as Draft<TItem>[];
            state.container = action.payload.container as Draft<TContainer>;
            state.selectedItems = [];
         },
         editContainer: (
            state,
            action: PayloadAction<{
               key: keyof TContainer;
               value: string | number;
            }>,
         ) => {
            const { key, value } = action.payload;
            state.container = {
               ...state.container,
               [key]: value,
            } as Draft<TContainer>;
         },
         editItem: (
            state,
            action: PayloadAction<{ key: string; value: string }>,
         ) => {
            const { key, value } = action.payload;
            const selectedSet = new Set(state.selectedItems);
            state.items = state.items.map((item) =>
               selectedSet.has(item.id) ? { ...item, [key]: value } : item,
            ) as Draft<TItem>[];
         },
         editItemStyle: (
            state,
            action: PayloadAction<{ key: string; value: string | number }>,
         ) => {
            const { key, value } = action.payload;
            const selectedSet = new Set(state.selectedItems);
            state.items.forEach((item) => {
               if (selectedSet.has(item.id)) {
                  (item.styles as Record<string, unknown>)[key] = value;
               }
            });
         },
         editItemText: (
            state,
            action: PayloadAction<{ id: string; value: string }>,
         ) => {
            const { id, value } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
               item.text = value;
            }
         },
         addItem: (state, action: PayloadAction<TItem>) => {
            state.items.push(action.payload as Draft<TItem>);
         },
         removeItem: (state) => {
            const selectedSet = new Set(state.selectedItems);
            state.items = state.items.filter(
               (item) => !selectedSet.has(item.id),
            ) as Draft<TItem>[];
            state.selectedItems = [];
         },
         duplicateItem: (state) => {
            const itemsMap = new Map(
               state.items.map((item) => [item.id, item]),
            );
            const newItems = state.selectedItems.map((itemId) => {
               const item = itemsMap.get(itemId);
               if (!item) {
                  throw new Error(
                     `Item with id ${itemId} not found for duplication`,
                  );
               }
               return { ...item, id: crypto.randomUUID() };
            });
            state.items = [...state.items, ...newItems] as Draft<TItem>[];
         },
         toggleSelected: (
            state,
            action: PayloadAction<{ id: string; selectMultiple: boolean }>,
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
            return { ...initialState };
         },
         ...extraReducers,
      },
   });

   const reducer = enableHistory(slice.reducer, name, ["items", "container"]);
   const actions = createHistoryActions(name);

   const selectItems = (
      state: Record<
         string,
         HistoryEnabledState<
            PlaygroundState<TItem, TContainer> & Record<string, unknown>
         >
      >,
   ) => state[name].present.items;
   const selectContainer = (
      state: Record<
         string,
         HistoryEnabledState<
            PlaygroundState<TItem, TContainer> & Record<string, unknown>
         >
      >,
   ) => state[name].present.container;
   const selectSelectedItems = (
      state: Record<
         string,
         HistoryEnabledState<
            PlaygroundState<TItem, TContainer> & Record<string, unknown>
         >
      >,
   ) => state[name].present.selectedItems;
   const selectCanUndo = (
      state: Record<
         string,
         HistoryEnabledState<
            PlaygroundState<TItem, TContainer> & Record<string, unknown>
         >
      >,
   ) => canUndo(state[name]);
   const selectCanRedo = (
      state: Record<
         string,
         HistoryEnabledState<
            PlaygroundState<TItem, TContainer> & Record<string, unknown>
         >
      >,
   ) => canRedo(state[name]);

   const selectPlayground = createSelector(
      [selectItems, selectContainer],
      (items, container) => ({
         items,
         container,
      }),
   );

   return {
      slice,
      reducer,
      actions,
      selectors: {
         selectItems,
         selectContainer,
         selectSelectedItems,
         selectCanUndo,
         selectCanRedo,
         selectPlayground,
      },
   };
}
