"use client";

import { RefObject, useEffect } from "react";

export function useRipple<T extends HTMLElement>(
   ref: RefObject<T | null>,
   scaleSize = 20,
   duration = 500,
) {
   useEffect(() => {
      const { current } = ref || {};
      if (!current) return;

      const timeouts = new Set<number>();

      function handleClick(e: MouseEvent) {
         const { offsetX, offsetY } = e;

         current!.style.position = "relative";

         const ripple = document.createElement("span");
         ripple.classList.add("ripple");
         ripple.style.setProperty("--top", `${offsetY}px`);
         ripple.style.setProperty("--left", `${offsetX}px`);
         ripple.style.setProperty("--scaleSize", `${scaleSize}`);
         ripple.style.setProperty("--duration", `${duration}ms`);

         current!.appendChild(ripple);

         const timeoutId = window.setTimeout(() => {
            timeouts.delete(timeoutId);
            if (ripple.parentNode === current) {
               current!.removeChild(ripple);
            }
         }, duration);
         timeouts.add(timeoutId);
      }

      current.addEventListener("click", handleClick);

      return () => {
         current.removeEventListener("click", handleClick);
         timeouts.forEach((id) => window.clearTimeout(id));
         timeouts.clear();
      };
   }, [ref, scaleSize, duration]);
}
