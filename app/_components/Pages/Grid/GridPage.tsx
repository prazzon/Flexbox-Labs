"use client";

import { useGrid } from "@/app/_hooks/useGrid";
import Playground from "../../Playground/Playground";
import LayoutGroupWrapper from "../../UI/LayoutGroup";
import MainContent from "../../UI/MainContent/MainContent";
import GridArea from "./GridArea/GridArea";
import GridSidebar from "./GridSidebar/GridSidebar";
import GridToolbar from "./GridToolbar/GridToolbar";

function GridPage() {
   const { container, clearSelected } = useGrid();

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
