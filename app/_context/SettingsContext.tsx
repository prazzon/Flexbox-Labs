"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { createContext, useEffect } from "react";
import { usePersistedState } from "../_hooks/usePersistedState";

interface Context {
   theme: string;
   changeTheme: (theme: "light" | "dark" | "auto") => void;
   accent: string;
   changeAccent: (
      accent: "purple" | "green" | "blue" | "orange" | "turquoise"
   ) => void;
   textSize: number;
   changeTextSize: (size: number) => void;
   reset: () => void;
   reduceMotion: boolean | null;
   changeReduceMotion: (value: boolean) => void;
   selectMultiple: boolean;
   changeSelectMultiple: (value: boolean) => void;
}

interface Props {
   children: React.ReactNode;
}

export const SettingsContext = createContext<Context | null>(null);

const defaultSettings = {
   theme: "dark",
   accent: "purple",
   textSize: 16,
   selectMultiple: true,
};

export const SettingsProvider = ({ children }: Props) => {
   const prefersReducedMotion = useReducedMotion();

   const [settings, saveSettings] = usePersistedState("settings", {
      ...defaultSettings,
      reduceMotion: prefersReducedMotion,
   });

   const { theme, accent, textSize, reduceMotion, selectMultiple } = settings;

   const changeTheme = (theme: "light" | "dark" | "auto") => {
      saveSettings({ ...settings, theme: theme });
   };

   const changeAccent = (
      accent: "purple" | "green" | "blue" | "orange" | "turquoise"
   ) => {
      saveSettings({ ...settings, accent: accent });
   };

   const changeTextSize = (size: number) => {
      saveSettings({ ...settings, textSize: size });
   };

   const reset = () => {
      saveSettings({ ...defaultSettings, reduceMotion: prefersReducedMotion });
   };

   const changeReduceMotion = (value: boolean) => {
      saveSettings({ ...settings, reduceMotion: value });
   };

   const changeSelectMultiple = (value: boolean) => {
      saveSettings({ ...settings, selectMultiple: value });
   };

   const reduceMotionValue = () => {
      return reduceMotion ? "always" : "never";
   };

   useEffect(() => {
      if (theme === "auto") {
         if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.setAttribute("data-theme", "dark");
         } else {
            document.documentElement.setAttribute("data-theme", "light");
         }
      } else {
         document.documentElement.setAttribute("data-theme", theme);
      }
   }, [theme]);

   useEffect(() => {
      document.documentElement.setAttribute("data-accent", accent);
   }, [accent]);

   useEffect(() => {
      const playground = document.getElementById("playground_view");
      if (playground) {
         playground.style.fontSize = `${textSize}px`;
      }
   }, [textSize]);

   return (
      <SettingsContext.Provider
         value={{
            theme,
            changeTheme,
            accent,
            changeAccent,
            textSize,
            changeTextSize,
            reset,
            reduceMotion,
            changeReduceMotion,
            selectMultiple,
            changeSelectMultiple,
         }}
      >
         <MotionConfig reducedMotion={reduceMotionValue()}>
            {children}
         </MotionConfig>
      </SettingsContext.Provider>
   );
};
