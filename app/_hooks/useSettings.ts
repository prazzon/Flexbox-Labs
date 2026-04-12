"use client";

import {
   changeAccent,
   changeReduceMotion,
   changeSelectMultiple,
   changeTextSize,
   changeTheme,
   resetSettings,
   selectAccent,
   selectReduceMotion,
   selectSelectMultiple,
   selectSettings,
   selectTextSize,
   selectTheme,
} from "../_lib/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";

const useSettings = () => {
   const dispatch = useAppDispatch();
   const settings = useAppSelector(selectSettings);
   const theme = useAppSelector(selectTheme);
   const accent = useAppSelector(selectAccent);
   const textSize = useAppSelector(selectTextSize);
   const reduceMotion = useAppSelector(selectReduceMotion);
   const selectMultiple = useAppSelector(selectSelectMultiple);

   return {
      theme,
      accent,
      textSize,
      reduceMotion,
      selectMultiple,
      settings,
      changeTheme: (newTheme: "light" | "dark" | "auto") =>
         dispatch(changeTheme(newTheme)),
      changeAccent: (
         newAccent: "purple" | "green" | "blue" | "orange" | "turquoise",
      ) => dispatch(changeAccent(newAccent)),
      changeTextSize: (size: number) => dispatch(changeTextSize(size)),
      changeReduceMotion: (value: boolean) =>
         dispatch(changeReduceMotion(value)),
      changeSelectMultiple: (value: boolean) =>
         dispatch(changeSelectMultiple(value)),
      reset: () => dispatch(resetSettings()),
   };
};

export default useSettings;
