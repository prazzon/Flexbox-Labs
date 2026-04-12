"use client";

import { createContext } from "react";

export interface SelectContextType {
   open: boolean;
   toggleOpen: () => void;
   select: (value: string) => void;
   active: string;
   close: () => void;
   listboxId: string;
}

export const SelectContext = createContext<SelectContextType | null>(null);
