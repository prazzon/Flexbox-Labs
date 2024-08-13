import styles from "./TextInput.module.css";

interface Props {
   size: "small" | "medium" | "large";
   value: string | number;
   type: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ size, value, type, onChange }: Props) {
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
