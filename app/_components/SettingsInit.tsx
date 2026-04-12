"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { setSettings } from "../_lib/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../_lib/hooks";

interface Props {
   children: React.ReactNode;
}

export function SettingsInit({ children }: Props) {
   const dispatch = useAppDispatch();
   const { theme, accent, reduceMotion } = useAppSelector((state) => state.settings);
   const prefersReducedMotion = useReducedMotion();

   // Load settings from localStorage on mount
   useEffect(() => {
      if (typeof window === "undefined") return;

      try {
         const stored = localStorage.getItem("settings");
         if (stored) {
            const parsed = JSON.parse(stored);
            dispatch(setSettings(parsed));
         } else if (prefersReducedMotion) {
            dispatch(setSettings({ reduceMotion: true }));
         }
      } catch (e) {
         console.error("Failed to load settings", e);
      }
   }, [dispatch, prefersReducedMotion]);

   // Apply theme
   useEffect(() => {
      if (typeof window === "undefined") return;

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

   // Apply accent
   useEffect(() => {
      if (typeof window === "undefined") return;
      document.documentElement.setAttribute("data-accent", accent);
   }, [accent]);

   const reduceMotionValue = reduceMotion ? "always" : "never";

   return <MotionConfig reducedMotion={reduceMotionValue}>{children}</MotionConfig>;
}
