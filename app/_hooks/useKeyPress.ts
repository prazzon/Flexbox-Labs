"use client";

import { useEffect } from "react";

type Options = {
   event?: "keydown" | "keyup";
   target?: EventTarget;
   eventOptions?: AddEventListenerOptions;
   preventDefault?: boolean;
   condition?: boolean;
};

export function useKeyPress(
   key: string,
   cb: (event: KeyboardEvent) => void,
   options: Options = {}
): void {
   useEffect(() => {
      const {
         event = "keydown",
         target = window,
         eventOptions,
         preventDefault = true,
         condition = true,
      } = options;

      // Parse key combination (e.g., "ctrlKey + shiftKey + a" or "a + ctrlKey")
      const keyCombination = key.split("+").map((k) => k.trim());

      const handler = (e: Event) => {
         if (e instanceof KeyboardEvent) {
            const mainKey = keyCombination.find((k) => k.length === 1);
            const modifiers = keyCombination.filter((k) => k !== mainKey);

            // Check if the main key and all modifiers are pressed
            const isKeyMatch = mainKey
               ? e.key.toLowerCase() === mainKey.toLowerCase()
               : true;
            const isModifierMatch = modifiers.every(
               (modifier) => e[modifier as keyof KeyboardEvent]
            );

            // Run callback if condition are met and preventDefault if required
            if (isKeyMatch && isModifierMatch && condition) {
               if (preventDefault) e.preventDefault();
               cb(e);
            }
         }
      };

      target.addEventListener(event, handler, eventOptions);

      return () => {
         target.removeEventListener(event, handler, eventOptions);
      };
   }, [key, cb, options]);
}
