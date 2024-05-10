import { useEffect, useRef } from "react";

export function useInsideContainerClick(handler) {
   const ref = useRef();

   useEffect(() => {
      function handleClick(e) {
         if (ref.current && ref.current === e.target) {
            handler();
         }
      }

      document.addEventListener("click", handleClick);

      return () => document.removeEventListener("click", handleClick);
   }, [handler]);

   return ref;
}
