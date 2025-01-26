"use client";

import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { ItemConfig } from "../dataTypes";

export const itemsConfig: ItemConfig[] = [
   {
      itemType: "dropdown",
      dropDownType: "combine",
      dropDownSeparator: " / ",
      combineData: [
         {
            key: "gridColumnStart",
            title: "Grid Column Start",
            description:
               "Specifies the starting column for an element within the grid.",
            type: "input",
            inputType: "number",
         },
         {
            key: "gridColumnEnd",
            title: "Grid Column End",
            description:
               "Specifies the ending column for an element within the grid.",
            type: "input",
            inputType: "number",
         },
      ],
      key: "gridColumn",
      title: "Grid Column",
      description:
         "Defines the start and end columns for an element in the grid.",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "number",
      defaultValue: "0 / 0",
   },
   {
      itemType: "dropdown",
      dropDownType: "combine",
      dropDownSeparator: " / ",
      combineData: [
         {
            key: "gridRowStart",
            title: "Grid Row Start",
            description:
               "Specifies the starting row for an element within the grid.",
            type: "input",
            inputType: "number",
         },
         {
            key: "gridRowEnd",
            title: "Grid Row End",
            description:
               "Specifies the ending row for an element within the grid.",
            type: "input",
            inputType: "number",
         },
      ],
      key: "gridRow",
      title: "Grid Row",
      description: "Defines the start and end rows for an element in the grid.",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "number",
      defaultValue: "0 / 0",
   },
   {
      key: "justifySelf",
      title: "Justify Self",
      description:
         "Controls horizontal alignment of an element within its grid container.",
      icon: LuAlignVerticalSpaceAround,
      type: "select",
      options: ["stretch", "start", "center", "end"],
      defaultValue: "stretch",
   },
   {
      key: "alignSelf",
      title: "Align Self",
      description:
         "Controls vertical alignment of an element within its grid container.",
      icon: LuAlignVerticalSpaceAround,
      type: "select",
      options: ["stretch", "start", "center", "end"],
      defaultValue: "stretch",
   },
   {
      key: "width",
      title: "Width",
      description: "Specifies the width of an element, including unit options.",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "height",
      title: "Height",
      description:
         "Specifies the height of an element, including unit options.",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
];