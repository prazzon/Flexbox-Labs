import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "./Menu.module.css";

const MenuContext = createContext();

function Menu({ children }) {
   const [openId, setOpenId] = useState("");
   const [position, setPosition] = useState(null);

   const close = () => setOpenId("");
   const open = setOpenId;

   return (
      <MenuContext.Provider
         value={{ openId, close, open, position, setPosition }}
      >
         {children}
      </MenuContext.Provider>
   );
}

function Toggle({ id, children }) {
   const { openId, close, open, setPosition } = useContext(MenuContext);

   function handleClick(e) {
      e.stopPropagation();

      const rect = e.target.closest("button").getBoundingClientRect();

      setPosition({
         x: rect.x - rect.width,
         y: rect.y + rect.height + 8,
      });

      openId === "" || openId !== id ? open(id) : close();
   }

   return <div onClick={handleClick}>{children}</div>;
}

function List({ id, children, className, overlay = true }) {
   const { openId, position, close } = useContext(MenuContext);

   const ref = useOutsideClick(close, false);

   if (openId !== id) return null;

   const style = {
      top: position.y,
      left: position.x,
   };

   return createPortal(
      <>
         <div
            className={`${styles.menu__list} ${className}`}
            style={style}
            ref={ref}
         >
            {children}
         </div>
         {overlay && <div className={styles.overlay} onClick={close}></div>}
      </>,
      document.body
   );
}

function Button({ children, icon, onClick }) {
   const { close } = useContext(MenuContext);

   function handleClick() {
      onClick?.();
      close();
   }

   return (
      <button onClick={handleClick} className={`${styles.menu__btn}`}>
         {icon}
         {children}
      </button>
   );
}

Menu.Menu = Menu;
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
