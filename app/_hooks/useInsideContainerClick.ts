"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Clears selection when the user clicks the empty playground surface
 * (`#playground_view`), not nested interactive children.
 */
export function useInsideContainerClick(handler?: () => void) {
   const ref = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      if (!handler) return;
      const root = ref.current;
      if (!root) return;

      const view = root.querySelector<HTMLElement>("#playground_view");
      if (!view) return;

      function handleClick(e: MouseEvent) {
         if (!handler) return;
         if (e.target === view) {
            handler();
         }
      }

      view.addEventListener("click", handleClick);
      return () => view.removeEventListener("click", handleClick);
   }, [handler]);

   return ref;
}
