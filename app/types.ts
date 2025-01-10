import {
   Flexbox,
   FlexboxContainer,
   FlexboxItem,
   FlexboxItemStyle,
} from "./_lib/types/flexbox";

import {
   Grid,
   GridContainer,
   GridItem,
   GridItemStyle,
} from "./_lib/types/grid";

export type State = Flexbox | Grid;
export type Item = FlexboxItem | GridItem;
export type ItemStyle = FlexboxItemStyle | GridItemStyle;
export type Container = FlexboxContainer | GridContainer;
