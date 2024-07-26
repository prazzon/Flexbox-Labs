import { useEffect } from "react";

export function useRipple(ref, scaleSize = 20, duration = 500) {
   useEffect(() => {
      const { current } = ref || {};

      function handleClick(e) {
         current.style.position = "relative";

         const { offsetX, offsetY } = e;

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
