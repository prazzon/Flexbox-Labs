import styles from "./Settings.module.scss";
import Toggle from "../../UI/Toggle/Toggle";
import useSettings from "../../../hooks/useSettings";
import { motion } from "framer-motion";
import { TbSunset2, TbTextSize } from "react-icons/tb";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { IoColorPaletteOutline } from "react-icons/io5";
import { ImTextColor } from "react-icons/im";
import { FiLoader } from "react-icons/fi";
import { GrMultiple } from "react-icons/gr";

function Settings() {
   const {
      theme,
      changeTheme,
      accent,
      changeAccent,
      textSize,
      changeTextSize,
      reset,
      reduceMotion,
      changeReduceMotion,
      selectMultiple,
      changeSelectMultiple,
   } = useSettings();

   return (
      <motion.div
         className={styles.container}
         initial={{ y: 10, opacity: 0.5 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.2 }}
         exit={{ y: -10, opacity: 0.5 }}
      >
         <h2 className="title">Settings</h2>

         <div className={styles.block}>
            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <TbSunset2 />
                  </div>
                  <h4 className={styles.text}>Appearance</h4>
               </div>

               <div className={styles.tile__container}>
                  <label className={styles.tile}>
                     <input
                        className={styles.tile__input}
                        type="radio"
                        name="appearance"
                        checked={theme === "light"}
                        onChange={() => changeTheme("light")}
                     />
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <MdOutlineLightMode />
                        </div>
                        <div className={styles.tile__text_title}>Light</div>
                     </div>
                  </label>

                  <label className={styles.tile}>
                     <input
                        className={styles.tile__input}
                        type="radio"
                        name="appearance"
                        checked={theme === "dark"}
                        onChange={() => changeTheme("dark")}
                     />
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <MdDarkMode />
                        </div>
                        <div className={styles.tile__text_title}>Dark</div>
                     </div>
                  </label>

                  <label className={styles.tile}>
                     <input
                        className={styles.tile__input}
                        type="radio"
                        name="appearance"
                        checked={theme === "auto"}
                        onChange={() => changeTheme("auto")}
                     />
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <CgDarkMode />
                        </div>
                        <div className={styles.tile__text_title}>Auto</div>
                     </div>
                  </label>
               </div>
            </div>
         </div>

         <div className={styles.block}>
            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <IoColorPaletteOutline />
                  </div>
                  <h4 className={styles.text}>Accent Color</h4>

                  <div className={styles.color__container}>
                     <label className={styles.color}>
                        <input
                           type="radio"
                           name="accent"
                           checked={accent === "purple"}
                           onChange={() => changeAccent("purple")}
                        />
                        <span className={styles.color__purple}></span>
                     </label>
                     <label className={styles.color}>
                        <input
                           type="radio"
                           name="accent"
                           checked={accent === "green"}
                           onChange={() => changeAccent("green")}
                        />
                        <span className={styles.color__green}></span>
                     </label>
                     <label className={styles.color}>
                        <input
                           type="radio"
                           name="accent"
                           checked={accent === "blue"}
                           onChange={() => changeAccent("blue")}
                        />
                        <span className={styles.color__blue}></span>
                     </label>
                     <label className={styles.color}>
                        <input
                           type="radio"
                           name="accent"
                           checked={accent === "orange"}
                           onChange={() => changeAccent("orange")}
                        />
                        <span className={styles.color__yellow}></span>
                     </label>
                     <label className={styles.color}>
                        <input
                           type="radio"
                           name="accent"
                           checked={accent === "turquoise"}
                           onChange={() => changeAccent("turquoise")}
                        />
                        <span className={styles.color__turquoise}></span>
                     </label>
                  </div>
               </div>
            </div>

            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <TbTextSize />
                  </div>
                  <h4 className={styles.text}>Text Size</h4>

                  <div className={styles.range}>
                     <span className={styles.range__icon}>
                        <ImTextColor />
                     </span>
                     <input
                        type="range"
                        min="10"
                        max="32"
                        value={textSize}
                        onChange={(e) => changeTextSize(Number(e.target.value))}
                        className={styles.range__slider}
                        id="myRange"
                     />
                     <span className={styles.range__icon}>
                        <ImTextColor />
                     </span>
                  </div>
               </div>
            </div>

            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <GrMultiple />
                  </div>
                  <h4 className={styles.text}>Select Multiple</h4>
                  <Toggle
                     checked={selectMultiple}
                     onChange={() => changeSelectMultiple(!selectMultiple)}
                  />
               </div>
            </div>

            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <FiLoader />
                  </div>
                  <h4 className={styles.text}>Reduce Motion</h4>
                  <Toggle
                     checked={reduceMotion || false}
                     onChange={() => changeReduceMotion(!reduceMotion)}
                  />
               </div>
            </div>
         </div>
         <button className={styles.btn} onClick={reset}>
            Reset to Defaults
         </button>
      </motion.div>
   );
}

export default Settings;
