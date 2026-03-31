"use client";

import { LayoutGroup } from "motion/react";

export default function LayoutGroupWrapper({
   children,
}: {
   children: React.ReactNode;
}) {
   return <LayoutGroup>{children}</LayoutGroup>;
}
