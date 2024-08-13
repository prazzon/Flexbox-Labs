import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
   const ref = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      function handleClick(e: MouseEvent) {
         if (ref.current && !ref.current.contains(e.target as Node)) {
            handler();
         }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, listenCapturing);
   }, [handler, listenCapturing]);

   return ref;
}