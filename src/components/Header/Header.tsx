import styles from "./Header.module.css";
import { BsFillBoxFill } from "react-icons/bs";

function Header() {
   return (
      <h1 className={styles.header}>
         <BsFillBoxFill />
         FlexLab
      </h1>
   );
}

export default Header;
