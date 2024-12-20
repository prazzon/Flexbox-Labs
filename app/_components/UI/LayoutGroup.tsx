"use client";

import { LayoutGroup } from "framer-motion";

export default function LayoutGroupWrapper({
   children,
}: {
   children: React.ReactNode;
}) {
   return <LayoutGroup>{children}</LayoutGroup>;
}
