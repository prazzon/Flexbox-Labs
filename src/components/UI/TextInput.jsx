import style from "./TextInput.module.css";

function TextInput({ size, value, type, onChange }) {
   return (
      <div>
         <input
            type={type}
            value={value}
            className={`${style.input} ${style[size]}`}
            onChange={onChange}
         />
      </div>
   );
}

export default TextInput;
