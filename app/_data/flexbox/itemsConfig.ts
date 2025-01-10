"use client";

import {
   LuAlignVerticalSpaceAround,
   LuExpand,
   LuScan,
   LuShrink,
} from "react-icons/lu";
import {
   TbArrowAutofitHeight,
   TbArrowAutofitWidth,
   TbReorder,
} from "react-icons/tb";
import { ItemConfig } from "../dataTypes";

export const itemsConfig: ItemConfig[] = [
   {
      key: "order",
      title: "Order",
      description: "Controls position of a flex item",
      icon: TbReorder,
      type: "input",
      inputType: "number",
      defaultValue: "",
   },
   {
      key: "flexGrow",
      title: "Flex Grow",
      description: "Controls size of an item",
      icon: LuExpand,
      type: "input",
      inputType: "number",
      defaultValue: "",
   },
   {
      key: "flexShrink",
      title: "Flex Shrink",
      description: "Controls maximum shrink",
      icon: LuShrink,
      type: "input",
      inputType: "number",
      defaultValue: "1",
   },
   {
      key: "flexBasis",
      title: "Flex Basis",
      description: "Sets initial size of an item",
      icon: LuScan,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "alignSelf",
      title: "Align Self",
      description: "Aligns item on cross axis",
      icon: LuAlignVerticalSpaceAround,
      type: "select",
      options: [
         "auto",
         "flex-start",
         "flex-end",
         "center",
         "baseline",
         "stretch",
      ],
      defaultValue: "auto",
   },
   {
      key: "width",
      title: "Width",
      description: "Sets an element's width",
      icon: TbArrowAutofitWidth,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "height",
      title: "Height",
      description: "Sets an element's height",
      icon: TbArrowAutofitHeight,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
];
