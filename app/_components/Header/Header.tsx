"use client";

import Logo from "@/public/img/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import About from "../SideBar/About/About";
import Modal, { Content, OpenBtn } from "../UI/Modal/Modal";
import ShinyText from "../UI/ShinyText/ShinyText";
import styles from "./Header.module.scss";

function Header() {
   const pathname = usePathname();

   return (
      <div className={styles.header}>
         <a href="/" className={styles.link}>
            <h1 className={styles.logo}>
               <Logo className={styles.logo_svg} />
               Flexbox Labs
            </h1>
         </a>
         
         <hr className={styles.divider} />

         {pathname !== "/grid" && (
            <Link href="/grid" className={styles.grid_link}>
               <HiOutlineExternalLink />
               Grids <span className={styles.beta}>beta</span>
            </Link>
         )}

         {pathname === "/grid" && (
            <Link href="/flexbox" className={styles.grid_link}>
               <HiOutlineExternalLink />
               Flexbox
            </Link>
         )}

         <div className={styles.links}>
            <Modal>
               <OpenBtn>
                  <button className={styles.links__btn}>
                     <FaRegQuestionCircle />
                  </button>
               </OpenBtn>
               <Content>
                  <About />
               </Content>
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
               <ShinyText text="Star on GitHub" className={styles.label} />
            </div>
         </a>
      </div>
   );
}

export default Header;
