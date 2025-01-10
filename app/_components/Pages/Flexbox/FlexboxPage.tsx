"use client";

import FlexboxItem from "@/app/_components/Pages/Flexbox/FlexboxItem/FlexboxItem";
import FlexboxSidebar from "@/app/_components/Pages/Flexbox/FlexboxSidebar/FlexboxSidebar";
import FlexboxSnackbar from "@/app/_components/Pages/Flexbox/FlexboxSnackbar/FlexboxSnackbar";
import FlexboxToolbar from "@/app/_components/Pages/Flexbox/FlexboxToolbar/FlexboxToolbar";
import MainAxisPointer from "@/app/_components/Pages/Flexbox/MainAxisPointer/MainAxisPointer";
import Playground from "@/app/_components/Playground/Playground";
import LayoutGroupWrapper from "@/app/_components/UI/LayoutGroup";
import MainContent from "@/app/_components/UI/MainContent/MainContent";
import { useFlexbox } from "@/app/_hooks/useFlexbox";

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
