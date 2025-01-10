import { IconType } from "react-icons";
import { FlexboxContainer, FlexboxItemStyle } from "../_lib/types/flexbox";
import { GridContainer, GridItemStyle } from "../_lib/types/grid";

type ConfigBase = TypeConfig & ItemType & {
   title: string;
   description: string;
   icon: IconType;
   defaultValue: string;
   // itemType?: "default" | "dropdown";
   // itemType?: ItemType;
};

type ItemType = DropDownConfig | { itemType?: "default"; defaultValue: string };

type DropDownConfig = DropDownType & {
   itemType?: "dropdown";
   dropDownSeparator?: string;
}

type DropDownType = 
   | { dropDownType: "iteration"; placeholder: string }
   | { dropDownType: "combine"; combineData: CombineType[] }

export type CombineType = TypeConfig & {
   key: string;
   title: string;
   description: string;
}

type TypeConfig = SelectConfig | InputConfig;

type SelectConfig = {
   type: "select";
   options: string[];
}

type InputConfig = InputType & {
   type: "input";
}

type InputType =
   | { inputType: "unit"; unitOptions: string[] }
   | { inputType: "number"; step?: number };

export type ContainerConfig = ConfigBase & {
   key: keyof FlexboxContainer | keyof GridContainer;
};

export type ItemConfig = ConfigBase & {
   key: keyof FlexboxItemStyle | keyof GridItemStyle;
};