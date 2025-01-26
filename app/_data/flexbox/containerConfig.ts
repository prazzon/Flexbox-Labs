"use client";

import { DiGhostSmall } from "react-icons/di";
import {
   LuAlignHorizontalJustifyStart,
   LuAlignVerticalDistributeEnd,
   LuAlignVerticalJustifyEnd,
   LuWrapText,
} from "react-icons/lu";
import { RxSpaceEvenlyHorizontally } from "react-icons/rx";
import { TbArrowsRightDown } from "react-icons/tb";
import { ContainerConfig } from "../dataTypes";

export const containerConfig: ContainerConfig[] = [
   {
      key: "display",
      title: "Display",
      description: "Defines the layout type, such as flex or block.",
      icon: DiGhostSmall,
      type: "select",
      options: ["flex", "block"],
      defaultValue: "flex",
   },
   {
      key: "flexDirection",
      title: "Flex Direction",
      description: "Specifies the direction of the main axis for item layout.",
      icon: TbArrowsRightDown,
      type: "select",
      options: ["row", "row-reverse", "column", "column-reverse"],
      defaultValue: "row",
   },
   {
      key: "flexWrap",
      title: "Flex Wrap",
      description:
         "Determines whether items wrap onto multiple lines or stay on one line.",
      icon: LuWrapText,
      type: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
      defaultValue: "nowrap",
   },
   {
      key: "justifyContent",
      title: "Justify Content",
      description:
         "Aligns items along the main axis, controlling horizontal spacing.",
      icon: LuAlignHorizontalJustifyStart,
      type: "select",
      options: [
         "start",
         "center",
         "end",
         "space-between",
         "space-around",
         "space-evenly",
      ],
      defaultValue: "start",
   },
   {
      key: "alignItems",
      title: "Align Items",
      description:
         "Aligns items along the cross axis, affecting vertical alignment.",
      icon: LuAlignVerticalJustifyEnd,
      type: "select",
      options: ["stretch", "start", "center", "end", "baseline"],
      defaultValue: "stretch",
   },
   {
      key: "alignContent",
      title: "Align Content",
      description:
         "Defines the spacing between flex lines when wrapping occurs.",
      icon: LuAlignVerticalDistributeEnd,
      type: "select",
      options: [
         "stretch",
         "start",
         "center",
         "end",
         "space-between",
         "space-around",
      ],
      defaultValue: "stretch",
   },
   {
      key: "gap",
      title: "Gap",
      description:
         "Specifies the spacing between flex items within the container.",
      icon: RxSpaceEvenlyHorizontally,
      type: "input",
      defaultValue: "20px",
      inputType: "unit",
      unitOptions: ["px", "%"],
   },
];
