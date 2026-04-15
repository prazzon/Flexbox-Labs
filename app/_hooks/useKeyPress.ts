"use client";

import { useEffect, useRef } from "react";

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
   options: Options = {},
): void {
   // Use refs to avoid re-registration when options change
   const optionsRef = useRef(options);
   const cbRef = useRef(cb);

   // Keep refs up to date without triggering effect re-runs
   useEffect(() => {
      optionsRef.current = options;
      cbRef.current = cb;
   });

   useEffect(() => {
      const {
         event = "keydown",
         target = window,
         eventOptions,
         preventDefault = true,
      } = optionsRef.current;

      // Parse key combination (e.g., "ctrlKey + shiftKey + a" or "a + ctrlKey")
      const keyCombination = key.split("+").map((k) => k.trim());

      const handler = (e: Event) => {
         if (e instanceof KeyboardEvent) {
            const mainKey = keyCombination.find((k) => k.length === 1);
            const modifiers = keyCombination.filter((k) => k !== mainKey);

            // Check if the main key and all modifiers are pressed
            // Use e.code for physical key matching (e.g., "KeyA"), fallback to e.key
            const keyCode = mainKey ? `Key${mainKey.toUpperCase()}` : null;
            const isKeyMatch = mainKey
               ? e.code === keyCode ||
                 e.key.toLowerCase() === mainKey.toLowerCase()
               : true;
            const isModifierMatch = modifiers.every(
               (modifier) => e[modifier as keyof KeyboardEvent],
            );

            // Read condition from ref to get latest value
            const condition = optionsRef.current.condition ?? true;

            // Run callback if condition are met and preventDefault if required
            if (isKeyMatch && isModifierMatch && condition) {
               if (preventDefault) e.preventDefault();
               cbRef.current(e);
            }
         }
      };

      target.addEventListener(event, handler, eventOptions);

      return () => {
         target.removeEventListener(event, handler, eventOptions);
      };
      // Only re-register when key changes, not when options/callback change
   }, [key]);
}
