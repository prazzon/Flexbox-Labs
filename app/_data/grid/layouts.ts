import { GridItem, GridContainer } from "@/app/_lib/types/grid";

export interface Layout {
   name: string;
   img: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
   layout: {
      items: GridItem[];
      container: GridContainer;
   };
}

export const layouts: Layout[] = []