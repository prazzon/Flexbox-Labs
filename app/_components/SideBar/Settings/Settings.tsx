import useSettings from "@/app/_hooks/useSettings";
import { Radio, RadioGroup } from "@base-ui/react";
import { CgDarkMode } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";
import { GrMultiple } from "react-icons/gr";
import { ImTextColor } from "react-icons/im";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { TbSunset2, TbTextSize } from "react-icons/tb";
import Slider from "../../UI/Slider/Slider";
import Toggle from "../../UI/Toggle/Toggle";
import styles from "./Settings.module.scss";

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
      <div className={styles.container}>
         <h2 className="title">Settings</h2>

         <div className={styles.block}>
            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <TbSunset2 />
                  </div>
                  <h4 className={styles.text}>Appearance</h4>
               </div>

               <RadioGroup
                  value={theme}
                  onValueChange={(val) =>
                     changeTheme(val as "light" | "dark" | "auto")
                  }
                  className={styles.tile__container}
               >
                  <Radio.Root
                     value="light"
                     className={styles.tile}
                     aria-label="Light Appearance"
                  >
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <MdOutlineLightMode />
                        </div>
                        <div className={styles.tile__text_title}>Light</div>
                     </div>
                  </Radio.Root>

                  <Radio.Root
                     value="dark"
                     className={styles.tile}
                     aria-label="Dark Appearance"
                  >
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <MdDarkMode />
                        </div>
                        <div className={styles.tile__text_title}>Dark</div>
                     </div>
                  </Radio.Root>

                  <Radio.Root
                     value="auto"
                     className={styles.tile}
                     aria-label="Auto Appearance"
                  >
                     <div className={styles.tile__text}>
                        <div className={styles.tile__text_icon}>
                           <CgDarkMode />
                        </div>
                        <div className={styles.tile__text_title}>Auto</div>
                     </div>
                  </Radio.Root>
               </RadioGroup>
            </div>
         </div>

         <div className={styles.block}>
            <div className={styles.item}>
               <div className={styles.title}>
                  <div className={styles.icon}>
                     <IoColorPaletteOutline />
                  </div>
                  <h4 className={styles.text}>Accent Color</h4>

                  <RadioGroup
                     value={accent}
                     onValueChange={(val) => changeAccent(val)}
                     className={styles.color__container}
                  >
                     <Radio.Root
                        value="purple"
                        className={styles.color}
                        aria-label="Purple Accent"
                     >
                        <span className={styles.color__purple}></span>
                     </Radio.Root>
                     <Radio.Root
                        value="green"
                        className={styles.color}
                        aria-label="Green Accent"
                     >
                        <span className={styles.color__green}></span>
                     </Radio.Root>
                     <Radio.Root
                        value="blue"
                        className={styles.color}
                        aria-label="Blue Accent"
                     >
                        <span className={styles.color__blue}></span>
                     </Radio.Root>
                     <Radio.Root
                        value="orange"
                        className={styles.color}
                        aria-label="Orange Accent"
                     >
                        <span className={styles.color__yellow}></span>
                     </Radio.Root>
                     <Radio.Root
                        value="turquoise"
                        className={styles.color}
                        aria-label="Turquoise Accent"
                     >
                        <span className={styles.color__turquoise}></span>
                     </Radio.Root>
                  </RadioGroup>
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
                     <Slider
                        min={10}
                        max={32}
                        value={textSize}
                        onChange={changeTextSize}
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
      </div>
   );
}

export default Settings;
