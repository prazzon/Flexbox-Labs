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
      description: "Specifies the order of the flex item within the container.",
      icon: TbReorder,
      type: "input",
      inputType: "number",
      defaultValue: "",
   },
   {
      key: "flexGrow",
      title: "Flex Grow",
      description: "Determines how much the item will grow relative to others.",
      icon: LuExpand,
      type: "input",
      inputType: "number",
      defaultValue: "",
   },
   {
      key: "flexShrink",
      title: "Flex Shrink",
      description:
         "Controls how much the item will shrink when space is limited.",
      icon: LuShrink,
      type: "input",
      inputType: "number",
      defaultValue: "1",
   },
   {
      key: "flexBasis",
      title: "Flex Basis",
      description:
         "Defines the initial size of the item before space distribution.",
      icon: LuScan,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "alignSelf",
      title: "Align Self",
      description:
         "Overrides the container's alignment for this item on the cross axis.",
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
      description: "Specifies the item's width, overriding its default size.",
      icon: TbArrowAutofitWidth,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "height",
      title: "Height",
      description: "Specifies the item's height, overriding its default size.",
      icon: TbArrowAutofitHeight,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
];
