import { LayoutGroup } from "framer-motion";
import { useEffect } from "react";
import CustomToaster from "./components/CustomToaster";
import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import SideBar from "./components/SideBar/SideBar";

function App() {
   useEffect(() => {
      document.body.classList.add("show");
   }, []);

   return (
      <>
         <Header />
         <LayoutGroup>
            <SideBar />
            <Playground />
         </LayoutGroup>
         <CustomToaster />
      </>
   );
}

export default App;
