"use client";

import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";

export function useBoundActions<T extends Record<string, (...args: unknown[]) => unknown>>(
   actions: T
): T {
   const dispatch = useAppDispatch();
   return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
}
