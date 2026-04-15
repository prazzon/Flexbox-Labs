"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface Dimensions {
   width?: number | string;
   height?: number | string;
}

interface Props {
   ref: RefObject<HTMLElement | null>;
   minWidth?: number;
   minHeight?: number;
   throttleMs?: number;
}

interface ReturnProps {
   dimensions: Dimensions;
   isResizing: boolean;
   startResize: (
      event: React.MouseEvent | MouseEvent,
      direction: "horizontal" | "vertical",
   ) => void;
   reset: (direction: "horizontal" | "vertical") => void;
}

// Throttle utility to limit update frequency
function throttle<T extends (arg: DOMRectReadOnly) => void>(
   func: T,
   limit: number,
): (arg: DOMRectReadOnly) => void {
   let inThrottle = false;
   return (arg: DOMRectReadOnly) => {
      if (!inThrottle) {
         func(arg);
         inThrottle = true;
         setTimeout(() => (inThrottle = false), limit);
      }
   };
}

export const useResize = ({
   ref,
   minWidth = 400,
   minHeight = 280,
   throttleMs = 100,
}: Props): ReturnProps => {
   const [dimensions, setDimensions] = useState<Dimensions>({});
   const [isResizing, setIsResizing] = useState(false);
   const [maxDimensions, setMaxDimensions] = useState<Dimensions>({});

   // Track throttle timer for cleanup
   const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   useEffect(() => {
      if (!ref.current?.parentElement) return;

      const updateMaxDimensions = (parentRect: DOMRectReadOnly) => {
         setMaxDimensions({
            width: parentRect.width,
            height: parentRect.height,
         });

         // Update current dimensions if they match parent dimensions
         setDimensions((prev) => {
            const newDimensions = { ...prev };

            if (prev.width && prev.width === parentRect.width) {
               newDimensions.width = "100%";
            }

            if (prev.height && prev.height === parentRect.height) {
               newDimensions.height = "100%";
            }

            return newDimensions;
         });
      };

      // Throttled update function
      const throttledUpdate = throttle(updateMaxDimensions, throttleMs);

      const resizeObserver = new ResizeObserver((entries) => {
         for (const entry of entries) {
            throttledUpdate(entry.contentRect);
         }
      });

      resizeObserver.observe(ref.current.parentElement);

      return () => {
         resizeObserver.disconnect();
         if (throttleTimerRef.current) {
            clearTimeout(throttleTimerRef.current);
         }
      };
   }, [ref, throttleMs]);

   const startResize = useCallback(
      (
         event: React.MouseEvent | MouseEvent,
         direction: "horizontal" | "vertical",
      ) => {
         event.preventDefault();
         if (!ref.current) return;

         const startX = event.clientX;
         const startY = event.clientY;
         const startWidth = ref.current.offsetWidth;
         const startHeight = ref.current.offsetHeight;

         const handleMouseMove = (e: MouseEvent) => {
            if (direction === "horizontal") {
               const newWidth = Math.max(
                  Math.min(
                     startWidth + (e.clientX - startX),
                     Number(maxDimensions.width) || Infinity,
                  ),
                  minWidth,
               );
               setDimensions((prev) => ({ ...prev, width: newWidth }));
            } else {
               const newHeight = Math.max(
                  Math.min(
                     startHeight + (e.clientY - startY),
                     Number(maxDimensions.height) || Infinity,
                  ),
                  minHeight,
               );
               setDimensions((prev) => ({ ...prev, height: newHeight }));
            }
         };

         const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            setIsResizing(false);
         };

         document.addEventListener("mousemove", handleMouseMove);
         document.addEventListener("mouseup", handleMouseUp);
         setIsResizing(true);
      },
      [ref, minWidth, minHeight, maxDimensions],
   );

   const reset = useCallback((direction: "horizontal" | "vertical") => {
      setDimensions((prev) => ({
         ...prev,
         [direction === "horizontal" ? "width" : "height"]: "100%",
      }));
   }, []);

   return { dimensions, isResizing, startResize, reset };
};
