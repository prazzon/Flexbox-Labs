import styles from "./Slider.module.css";

function Slider({ checked }) {
   return (
      <>
         <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            readOnly
         />
         <span className={styles.slider}></span>
      </>
   );
}

export default Slider;
