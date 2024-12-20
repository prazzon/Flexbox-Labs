import { configContainer } from "@/app/_data/flexbox/containerConfig";
import { layouts } from "@/app/_data/flexbox/layouts";
import { FaFloppyDisk } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";
import { useFlexbox } from "../../../_hooks/useFlexbox";
import Edit from "../../SideBar/Edit/Edit";
import Layout from "../../SideBar/Layout/Layout";
import Save from "../../SideBar/Save/Save";
import Settings from "../../SideBar/Settings/Settings";
import SideBar from "../../SideBar/SideBar";

export default function FlexboxSidebar() {
   const {
      items,
      container,
      selectedItems,
      flexbox,
      setFlexbox,
      editContainer,
      editItemStyle,
      clearSelected,
   } = useFlexbox();
   
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
               configContainer={configContainer}
               selectedItemStyles={selectedItemStyles}
               editItemStyle={editItemStyle}
            />
         ),
         icon: <MdOutlineEdit />,
      },
      {
         name: "Save",
         component: (
            <Save storageKey="flexbox" state={flexbox} setState={setFlexbox} />
         ),
         icon: <FaFloppyDisk />,
      },
      {
         name: "Layout",
         component: (
            <Layout
               layouts={layouts}
               setState={setFlexbox}
               clearSelected={clearSelected}
            />
         ),
         icon: <TbLayoutGrid />,
      },
      { name: "Settings", component: <Settings />, icon: <LuSettings2 /> },
   ];

   return <SideBar tabs={tabs} state={flexbox} />;
}
