import { configureStore } from "@reduxjs/toolkit";
import flexboxReducer from "./features/flexbox/flexboxSlice";
import gridReducer from "./features/grid/gridSlice";

export const makeStore = () => {
   return configureStore({
      reducer: {
         flexbox: flexboxReducer,
         grid: gridReducer
      },
   });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
