import styles from "./Header.module.scss";
import Logo from "../../assets/img/logo.svg?react";
import Modal from "../UI/Modal/Modal";
import { FaGithub, FaRegQuestionCircle } from "react-icons/fa";
import About from "../SideBar/About/About";

function Header() {
   return (
      <div className={styles.header}>
         <a href="/" className={styles.link}>
            <h1 className={styles.logo}>
               <Logo className={styles.logo_svg} />
               Flexbox Labs
            </h1>
         </a>
         <hr className={styles.divider} />
         <div className={styles.description}>
            A visual tool for experimenting with flexbox layouts
         </div>

         <div className={styles.links}>
            <Modal>
               <Modal.OpenBtn>
                  <button className={styles.links__btn}>
                     <FaRegQuestionCircle />
                  </button>
               </Modal.OpenBtn>
               <Modal.Content>
                  <About />
               </Modal.Content>
            </Modal>

            <a
               href="https://github.com/prazzon/flexlab"
               target="_blank"
               className={styles.links__btn}
            >
               <FaGithub />
            </a>
         </div>

         <a
            href="https://github.com/prazzon/flexbox-labs"
            className={styles.star_btn}
            target="_blank"
         >
            <span className={styles.hover_effect}></span>
            <div className={styles.icon_text}>
               <FaGithub />
               <span className={styles.label}>Star on GitHub</span>
            </div>
         </a>
      </div>
   );
}

export default Header;
