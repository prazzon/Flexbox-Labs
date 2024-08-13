import { useEffect, useRef } from "react";

export function useInsideContainerClick(handler: () => void) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      function handleClick(e: MouseEvent) {
         if (ref.current && ref.current === e.target) {
            handler();
         }
      }

      document.addEventListener("click", handleClick);

      return () => document.removeEventListener("click", handleClick);
   }, [ref, handler]);

   return ref;
}
