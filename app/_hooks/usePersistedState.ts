"use client";

import { useEffect, useState, useRef } from "react";

/**
 * A custom hook to manage state that is persisted in localStorage.
 * Includes try-catch blocks for resilience against corrupt data and debounced writes.
 */
export const usePersistedState = <T>(key: string, defaultValue: T) => {
   const [state, setState] = useState<T>(defaultValue);
   const isInitialMount = useRef(true);

   // Sync from storage on mount
   useEffect(() => {
      try {
         const stored = localStorage.getItem(key);
         if (stored) {
            setState(JSON.parse(stored));
         }
      } catch (error) {
         console.warn(`[usePersistedState] Could not parse storage for key "${key}":`, error);
         // Falls back to defaultValue (already set in useState)
      }
   }, [key]);

   // Persist to storage with debounce
   useEffect(() => {
      // Skip the initial mount to avoid overwriting existing storage with default value
      if (isInitialMount.current) {
         isInitialMount.current = false;
         return;
      }

      const timeoutId = setTimeout(() => {
         try {
            localStorage.setItem(key, JSON.stringify(state));
         } catch (error) {
            console.error(`[usePersistedState] Error saving storage for key "${key}":`, error);
         }
      }, 800); // 800ms debounce to balance responsiveness and performance

      return () => clearTimeout(timeoutId);
   }, [key, state]);

   return [state, setState] as const;
};
