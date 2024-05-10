import style from "./Header.module.css";
import { BsFillBoxFill } from "react-icons/bs";

function Header() {
   return (
      <h1 className={style.header}>
         <BsFillBoxFill />
         FlexLab
      </h1>
   );
}

export default Header;
