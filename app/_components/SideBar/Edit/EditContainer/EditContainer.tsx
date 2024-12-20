"use client";

import Select from "../../../UI/Select/Select";
import TextInput from "../../../UI/TextInput/TextInput";
import itemStyles from "../Item.module.scss";
import { Container } from "@/app/types";
import { ContainerConfig } from "@/app/_data/flexbox/containerConfig";

interface Props {
   editContainer: (key: keyof Container, value: string) => void;
   container: Container;
   configContainer: ContainerConfig[];
}

function EditContainer({ editContainer, container, configContainer }: Props) {
   return (
      <>
         {configContainer.map((item) => (
            <label className={itemStyles.item} key={item.key}>
               <div className={itemStyles.icon}>
                  <item.icon />
               </div>
               <div className={itemStyles.text}>
                  <div className={itemStyles.title}>{item.title}</div>
                  <div className={itemStyles.description}>
                     {item.description}
                  </div>
               </div>
               {item.type === "select" ? (
                  <Select
                     active={
                        (container?.[item.key] as string) || item.defaultValue
                     }
                     onSelect={(value) => editContainer(item.key, value)}
                  >
                     <Select.Toggle maxLength={7} />
                     <Select.Options>
                        {item.options.map((option) => (
                           <Select.Option value={option} key={option} />
                        ))}
                     </Select.Options>
                  </Select>
               ) : null}
               {item.type === "input" && item.inputType === "unit" ? (
                  <TextInput
                     size="small"
                     value={
                        (container?.[item.key]?.toString() ||
                           item.defaultValue) as string
                     }
                     type={item.inputType}
                     unitOptions={item.unitOptions}
                     onChange={(value) => editContainer(item.key, value)}
                  />
               ) : null}
               {item.type === "input" && item.inputType === "number" ? (
                  <TextInput
                     size="small"
                     value={
                        (container?.[item.key]?.toString() ||
                           item.defaultValue) as string
                     }
                     type={item.inputType}
                     step={item.step}
                     onChange={(value) => editContainer(item.key, value)}
                  />
               ) : null}
            </label>
         ))}
      </>
   );
}

export default EditContainer;
