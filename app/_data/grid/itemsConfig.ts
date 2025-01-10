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
            key: "gridRowStart",
            title: "Grid Row Start",
            description: "Sets an element's row start",
            type: "input",
            inputType: "number",
         },
         {
            key: "gridRowEnd",
            title: "Grid Row End",
            description: "Sets an element's row end",
            type: "input",
            inputType: "number",
         },
      ],
      key: "gridRow",
      title: "Grid Row",
      description: "Sets an element's row",
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
            key: "gridColumnStart",
            title: "Grid Column Start",
            description: "Sets an element's column start",
            type: "input",
            inputType: "number",
         },
         {
            key: "gridColumnEnd",
            title: "Grid Column End",
            description: "Sets an element's column end",
            type: "input",
            inputType: "number",
         },
      ],
      key: "gridColumn",
      title: "Grid Column",
      description: "Sets an element's column",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "number",
      defaultValue: "0 / 0",
   },
   {
      key: "justifySelf",
      title: "Justify Self",
      description: "Aligns item on row axis",
      icon: LuAlignVerticalSpaceAround,
      type: "select",
      options: ["stretch", "start", "center", "end"],
      defaultValue: "stretch",
   },
   {
      key: "alignSelf",
      title: "Align Self",
      description: "Aligns item on column axis",
      icon: LuAlignVerticalSpaceAround,
      type: "select",
      options: ["stretch", "start", "center", "end"],
      defaultValue: "stretch",
   },
   {
      key: "width",
      title: "Width",
      description: "Sets an element's width",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
   {
      key: "height",
      title: "Height",
      description: "Sets an element's height",
      icon: LuAlignVerticalSpaceAround,
      type: "input",
      inputType: "unit",
      unitOptions: ["auto", "px", "%"],
      defaultValue: "auto",
   },
];