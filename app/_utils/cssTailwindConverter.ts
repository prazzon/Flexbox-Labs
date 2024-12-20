import { CSSProperties } from "react";

const cssTailwindMap: Record<string, Record<string, string>> = {
   display: {
      flex: "flex",
      "inline-flex": "inline-flex",
      block: "block",
      "inline-block": "inline-block",
      grid: "grid",
      none: "hidden",
   },
   flexDirection: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
   },
   flexWrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
   },
   justifyContent: {
      "flex-start": "justify-start",
      "flex-end": "justify-end",
      center: "justify-center",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly",
   },
   alignItems: {
      "flex-start": "items-start",
      "flex-end": "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
   },
   alignContent: {
      "flex-start": "content-start",
      "flex-end": "content-end",
      center: "content-center",
      "space-between": "content-between",
      "space-around": "content-around",
      stretch: "content-stretch",
   },
   alignSelf: {
      auto: "self-auto",
      "flex-start": "self-start",
      "flex-end": "self-end",
      center: "self-center",
      stretch: "self-stretch",
   },
   flexGrow: {
      "0": "grow-0",
      "1": "grow",
   },
   flexShrink: {
      "0": "shrink-0",
      "1": "shrink",
   },
   flexBasis: {
      auto: "basis-auto",
      "100%": "basis-full",
   },
   order: {
      "0": "order-none",
      "1": "order-1",
      "2": "order-2",
      "3": "order-3",
      "4": "order-4",
      "5": "order-5",
      "6": "order-6",
      "7": "order-7",
      "8": "order-8",
      "9": "order-9",
      "10": "order-10",
      "11": "order-11",
      "12": "order-12",
      "-1": "order-first",
      "9999": "order-last",
   },
};

const gapMap: Record<string, string> = {
   "0px": "gap-0",
   "0.25rem": "gap-1",
   "0.5rem": "gap-2",
   "0.75rem": "gap-3",
   "1rem": "gap-4",
   "1.25rem": "gap-5",
   "1.5rem": "gap-6",
   "2rem": "gap-8",
   "2.5rem": "gap-10",
   "3rem": "gap-12",
};

const sizeMap: Record<string, string> = {
   "0px": "w-0",
   "100%": "w-full",
   "100vh": "h-screen",
   "100vw": "w-screen",
   auto: "w-auto",
};

function convertSize(value: string, property: "width" | "height"): string {
   const prefix = property === "width" ? "w" : "h";
   if (sizeMap[value]) return sizeMap[value];
   if (value.endsWith("px")) {
      const numValue = parseInt(value);
      if (numValue % 4 === 0) return `${prefix}-${numValue / 4}`;
   }
   if (value.endsWith("%")) {
      const numValue = parseInt(value);
      if (numValue % 25 === 0) return `${prefix}-${numValue / 25}/4`;
   }
   return `${prefix}-[${value}]`;
}

export function convertCssToTailwind(
   cssObject: CSSProperties
): string {
   const tailwindClasses: string[] = [];

   Object.entries(cssObject).forEach(([key, value]) => {
      const stringValue = value.toString();
      const camelCaseKey = key.replace(/-./g, (x) => x[1].toUpperCase());

      if (
         cssTailwindMap[camelCaseKey] &&
         cssTailwindMap[camelCaseKey][stringValue]
      ) {
         tailwindClasses.push(cssTailwindMap[camelCaseKey][stringValue]);
      } else if (camelCaseKey === "gap") {
         tailwindClasses.push(gapMap[stringValue] || `gap-[${stringValue}]`);
      } else if (camelCaseKey === "width") {
         tailwindClasses.push(convertSize(stringValue, "width"));
      } else if (camelCaseKey === "height") {
         tailwindClasses.push(convertSize(stringValue, "height"));
      } else if (camelCaseKey === "order") {
         tailwindClasses.push(
            cssTailwindMap.order[stringValue] || `order-[${stringValue}]`
         );
      } else if (camelCaseKey === "flexGrow") {
         if (stringValue === "0") {
            tailwindClasses.push("grow-0");
         } else if (stringValue === "1") {
            tailwindClasses.push("grow");
         } else {
            tailwindClasses.push(`grow-[${stringValue}]`);
         }
      } else if (camelCaseKey === "flexShrink") {
         if (stringValue === "0") {
            tailwindClasses.push("shrink-0");
         } else if (stringValue === "1") {
            tailwindClasses.push("shrink");
         } else {
            tailwindClasses.push(`shrink-[${stringValue}]`);
         }
      } else if (camelCaseKey === "flexBasis") {
         if (cssTailwindMap.flexBasis[stringValue]) {
            tailwindClasses.push(cssTailwindMap.flexBasis[stringValue]);
         } else {
            tailwindClasses.push(`basis-[${stringValue}]`);
         }
      } else if (camelCaseKey === "flex") {
         const flexValues: string[] = stringValue.split(" ");
         if (flexValues.length === 1) {
            tailwindClasses.push(`flex-[${stringValue}]`);
         } else {
            flexValues.forEach((flexValue, index) => {
               if (index === 0)
                  tailwindClasses.push(
                     flexValue === "1" ? "grow" : `grow-[${flexValue}]`
                  );
               if (index === 1)
                  tailwindClasses.push(
                     flexValue === "1" ? "shrink" : `shrink-[${flexValue}]`
                  );
               if (index === 2) {
                  if (flexValue === "auto") {
                     tailwindClasses.push("basis-auto");
                  } else if (flexValue === "100%") {
                     tailwindClasses.push("basis-full");
                  } else {
                     tailwindClasses.push(`basis-[${flexValue}]`);
                  }
               }
            });
         }
      } else {
         console.warn(
            `No Tailwind equivalent found for CSS property: ${key}: ${value}`
         );
      }
   });

   return tailwindClasses.join(" ");
}
