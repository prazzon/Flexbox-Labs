import styles from "./TextInput.module.css";

function TextInput({ size, value, type, onChange }) {
   return (
      <div>
         <input
            type={type}
            value={value}
            className={`${styles.input} ${styles[size]}`}
            onChange={onChange}
         />
      </div>
   );
}

export default TextInput;
