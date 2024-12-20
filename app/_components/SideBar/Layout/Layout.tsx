
import { type Layout } from "@/app/_data/flexbox/layouts";
import { State } from "@/app/types";
import styles from "./Layout.module.scss";

interface Props {
   layouts: Layout[];
   setState: (state: State) => void;
   clearSelected: () => void;
}

function Layout({ layouts, setState, clearSelected }: Props) {
   function handleClick(layout: State) {
      setState(layout);
      clearSelected();
   }

   return (
      <div className={styles.container}>
         <h2 className="title">Layouts</h2>
         <div className={styles.layout_container}>
            {layouts.map((layout, index) => (
               <div
                  key={index}
                  className={styles.layout}
                  onClick={() => handleClick(layout.layout)}
               >
                  <layout.img />
                  <h4 className={styles.layout__title}>{layout.name}</h4>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Layout;
