"use client";

import FlexboxItem from "@/app/_components/Pages/Flexbox/FlexboxItem/FlexboxItem";
import FlexboxSidebar from "@/app/_components/Pages/Flexbox/FlexboxSidebar/FlexboxSidebar";
import FlexboxSnackbar from "@/app/_components/Pages/Flexbox/FlexboxSnackbar/FlexboxSnackbar";
import FlexboxToolbar from "@/app/_components/Pages/Flexbox/FlexboxToolbar/FlexboxToolbar";
import MainAxisPointer from "@/app/_components/Pages/Flexbox/MainAxisPointer/MainAxisPointer";
import Playground from "@/app/_components/Playground/Playground";
import LayoutGroupWrapper from "@/app/_components/UI/LayoutGroup";
import MainContent from "@/app/_components/UI/MainContent/MainContent";
import { getOS } from "@/app/_helpers/helpers";
import { useFlexbox } from "@/app/_hooks/useFlexbox";
import { useKeyPress } from "@/app/_hooks/useKeyPress";

export default function FlexboxPage() {
   const {
      items,
      container,
      clearSelected,
      addItem,
      duplicateItem,
      removeItem,
      resetContainer,
      undo,
      redo,
      canUndo,
      canRedo,
      selectedItems,
   } = useFlexbox();

   const emptySelected = selectedItems.length === 0;
   const isMac = getOS() === "Mac";
   const ctrlKey = isMac ? "metaKey" : "ctrlKey";

   useKeyPress(`${ctrlKey} + a`, addItem);
   useKeyPress(`${ctrlKey} + d`, duplicateItem, { condition: !emptySelected });
   useKeyPress(`${ctrlKey} + x`, removeItem, { condition: !emptySelected });
   useKeyPress(`${ctrlKey} + shiftKey + r`, resetContainer);
   useKeyPress(`${ctrlKey} + z`, undo, { condition: canUndo });
   useKeyPress(`${ctrlKey} + y`, redo, { condition: canRedo });

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
