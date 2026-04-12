"use client";

import { createContext } from "react";

export interface ModalContextType {
   showModal: boolean;
   openModal: () => void;
   closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
