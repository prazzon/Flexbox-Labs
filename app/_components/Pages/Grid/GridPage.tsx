"use client";

import { getOS } from "@/app/_helpers/helpers";
import { useGrid } from "@/app/_hooks/useGrid";
import { useKeyPress } from "@/app/_hooks/useKeyPress";
import Playground from "../../Playground/Playground";
import LayoutGroupWrapper from "../../UI/LayoutGroup";
import MainContent from "../../UI/MainContent/MainContent";
import GridArea from "./GridArea/GridArea";
import GridSidebar from "./GridSidebar/GridSidebar";
import GridToolbar from "./GridToolbar/GridToolbar";

function GridPage() {
   const {
      container,
      clearSelected,
      addItem,
      removeItem,
      resetContainer,
      undo,
      redo,
      canUndo,
      canRedo,
      selectedItems,
   } = useGrid();

   const emptySelected = selectedItems.length === 0;
   const isMac = getOS() === "Mac";
   const ctrlKey = isMac ? "metaKey" : "ctrlKey";

   useKeyPress(`${ctrlKey} + a`, addItem);
   useKeyPress(`${ctrlKey} + x`, removeItem, { condition: !emptySelected });
   useKeyPress(`${ctrlKey} + shiftKey + r`, resetContainer);
   useKeyPress(`${ctrlKey} + z`, undo, { condition: canUndo });
   useKeyPress(`${ctrlKey} + y`, redo, { condition: canRedo });

   const playgroundTools = [{ component: <GridToolbar />, id: "toolbar" }];

   return (
      <MainContent>
         <LayoutGroupWrapper>
            <GridSidebar />
            <Playground
               playgroundTools={playgroundTools}
               container={container}
               clearSelected={clearSelected}
            >
               <GridArea />
            </Playground>
         </LayoutGroupWrapper>
      </MainContent>
   );
}

export default GridPage;
