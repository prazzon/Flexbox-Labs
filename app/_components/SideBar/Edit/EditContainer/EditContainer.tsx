"use client";

import { ContainerConfig } from "@/app/_data/dataTypes";
import { Container } from "@/app/types";
import { Fragment } from "react";
import Item from "../Item/Item";
import ItemDropdown from "../Item/ItemDropdown";

interface Props {
   editContainer: (key: keyof Container, value: string) => void;
   container: Container;
   containerConfig: ContainerConfig[];
}

function EditContainer({ editContainer, container, containerConfig }: Props) {
   return (
      <>
         {containerConfig.map((item) => (
            <Fragment key={item.key}>
               {item.itemType === "dropdown" && (
                  <ItemDropdown
                     item={item}
                     value={
                        container[item.key as keyof Container]?.toString() ||
                        item.defaultValue
                     }
                     separator={item.dropDownSeparator || " "}
                     onChange={(key, value) =>
                        editContainer(key as keyof Container, value)
                     }
                  />
               )}

               {!item.itemType && (
                  <Item
                     item={item}
                     value={
                        container[item.key as keyof Container]?.toString() ||
                        item.defaultValue
                     }
                     onChange={(key, value) =>
                        editContainer(key as keyof Container, value)
                     }
                  />
               )}
            </Fragment>
         ))}
      </>
   );
}

export default EditContainer;
