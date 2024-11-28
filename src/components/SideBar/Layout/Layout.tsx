import { State } from "../../../context/PlaygroundContext";
import usePlayground from "../../../hooks/usePlayground";
import styles from "./Layout.module.scss";
import { layouts } from "./layouts";

function Layout() {
   const { set, clearSelected } = usePlayground();

   function handleClick(layout: State) {
      set(layout);
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
                  {layout.img && <layout.img />}
                  <h4 className={styles.layout__title}>{layout.name}</h4>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Layout;
