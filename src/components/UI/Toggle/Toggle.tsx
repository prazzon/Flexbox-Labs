import styles from "./Toggle.module.scss";

interface Props {
   checked: boolean;
   onChange: () => void;
}

function Toggle({ checked, onChange }: Props) {
   return (
      <label className={styles.switch}>
         <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={onChange}
         />
         <span className={styles.toggle}></span>
      </label>
   );
}

export default Toggle;
