"use client";

/* eslint-disable react-refresh/only-export-components */
import { useGrid } from "@/app/_hooks/useGrid";
import { Metadata } from "next";
import Playground from "../../Playground/Playground";
import LayoutGroupWrapper from "../../UI/LayoutGroup";
import MainContent from "../../UI/MainContent/MainContent";
import GridArea from "./GridArea/GridArea";
import GridSidebar from "./GridSidebar/GridSidebar";
import GridToolbar from "./GridToolbar/GridToolbar";

export const metadata: Metadata = {
   title: "Flexbox labs | Grid",
   description: "A visual tool for experimenting with grid layouts",
};

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