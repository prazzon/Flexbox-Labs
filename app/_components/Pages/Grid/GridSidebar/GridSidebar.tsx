import { containerConfig } from "@/app/_data/grid/containerConfig";
import { layouts } from "@/app/_data/grid/layouts";
import { useGrid } from "@/app/_hooks/useGrid";
import { FaFloppyDisk } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";
import Edit from "../../../SideBar/Edit/Edit";
import Layout from "../../../SideBar/Layout/Layout";
import Save from "../../../SideBar/Save/Save";
import Settings from "../../../SideBar/Settings/Settings";
import SideBar from "../../../SideBar/SideBar";
import { itemsConfig } from "@/app/_data/grid/itemsConfig";

export default function GridSidebar() {
   const {
      items,
      container,
      selectedItems,
      grid,
      setGrid,
      editContainer,
      editItemStyle,
      clearSelected,
   } = useGrid();

   const lastSelectedItem = selectedItems[selectedItems.length - 1];

   const selectedItemStyles = items.find(
      (item) => item.id === lastSelectedItem
   )?.styles;

   const tabs = [
      {
         name: "Edit",
         component: (
            <Edit
               selectedItems={selectedItems}
               editContainer={editContainer}
               container={container}
               containerConfig={containerConfig}
               itemsConfig={itemsConfig}
               selectedItemStyles={selectedItemStyles}
               editItemStyle={editItemStyle}
            />
         ),
         icon: <MdOutlineEdit />,
      },
      {
         name: "Save",
         component: (
            <Save storageKey="grid" state={grid} setState={setGrid} />
         ),
         icon: <FaFloppyDisk />,
      },
      {
         name: "Layout",
         component: (
            <Layout
               layouts={layouts}
               setState={setGrid}
               clearSelected={clearSelected}
            />
         ),
         icon: <TbLayoutGrid />,
      },
      { name: "Settings", component: <Settings />, icon: <LuSettings2 /> },
   ];

   return <SideBar tabs={tabs} state={grid} />;
}
