"use client";

import { useEffect, useState } from "react";

export const usePersistedState = <T>(key: string, defaultValue: T) => {
   const [state, setState] = useState<T>(defaultValue);

   useEffect(() => {
      const stored = localStorage.getItem(key);
      if (stored) {
         setState(JSON.parse(stored));
      }
   }, [key]);

   const setValue = (value: T) => {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
   };

   return [state, setValue] as const;
};
