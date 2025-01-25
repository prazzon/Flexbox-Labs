import styles from "./ShinyText.module.scss";

interface Props {
   text: string;
   disabled?: boolean;
   speed?: number;
   className?: string;
}

const ShinyText = ({
   text,
   disabled = false,
   speed = 5,
   className = "",
}: Props) => {
   const animationDuration = `${speed}s`;

   return (
      <div
         className={`${styles.shiny_text} ${
            disabled ? styles.disabled : ""
         } ${className}`}
         style={{ animationDuration }}
      >
         {text}
      </div>
   );
};

export default ShinyText;
