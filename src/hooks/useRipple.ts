import { RefObject, useEffect } from "react";

export function useRipple<T extends HTMLElement>(ref: RefObject<T>, scaleSize = 20, duration = 500) {
   useEffect(() => {
      const { current } = ref || {};

      function handleClick(e: MouseEvent) {
         if (!current) return;

         const { offsetX, offsetY } = e;

         current.style.position = "relative";

         const ripple = document.createElement("span");
         ripple.classList.add("ripple");
         ripple.style.setProperty("--top", `${offsetY}px`);
         ripple.style.setProperty("--left", `${offsetX}px`);
         ripple.style.setProperty("--scaleSize", `${scaleSize}`);
         ripple.style.setProperty("--duration", `${duration}ms`);

         current.appendChild(ripple);

         setTimeout(() => current.removeChild(ripple), duration);
      }

      current?.addEventListener("click", handleClick);

      return () => current?.removeEventListener("click", handleClick);
   }, [ref, scaleSize, duration]);
}
