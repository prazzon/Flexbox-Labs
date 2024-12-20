"use client";

import FlexboxItem from "../../_components/Flexbox/FlexboxItem/FlexboxItem";
import FlexboxSidebar from "../../_components/Flexbox/FlexboxSidebar/FlexboxSidebar";
import FlexboxSnackbar from "../../_components/Flexbox/FlexboxSnackbar/FlexboxSnackbar";
import FlexboxToolbar from "../../_components/Flexbox/FlexboxToolbar/FlexboxToolbar";
import MainAxisPointer from "../../_components/Flexbox/MainAxisPointer/MainAxisPointer";
import Playground from "../../_components/Playground/Playground";
import LayoutGroupWrapper from "../../_components/UI/LayoutGroup";
import MainContent from "../../_components/UI/MainContent/MainContent";
import { useFlexbox } from "../../_hooks/useFlexbox";

export default function FlexboxPage() {
   const { items, container, clearSelected } = useFlexbox();

   const playgroundTools = [
      { component: <FlexboxToolbar />, id: "toolbar" },
      { component: <MainAxisPointer />, id: "main-axis-pointer" },
      { component: <FlexboxSnackbar />, id: "snackbar" },
   ];

   return (
      <MainContent>
         <LayoutGroupWrapper>
            <FlexboxSidebar />
            <Playground
               playgroundTools={playgroundTools}
               container={container}
               clearSelected={clearSelected}
            >
               {items.map((item) => (
                  <FlexboxItem key={item.id} item={item} />
               ))}
            </Playground>
         </LayoutGroupWrapper>
      </MainContent>
   );
}
