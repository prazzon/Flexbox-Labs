import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import SideBar from "./components/SideBar/SideBar";
import { LayoutGroup } from "framer-motion";

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
         <Toaster
            position="bottom-center"
            reverseOrder={true}
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
               success: { duration: 3000 },
               error: { duration: 2000 },
               style: {
                  maxWidth: "100%",
                  borderRadius: "15px",
                  padding: "12px 18px",
                  backgroundColor: "#101114",
                  color: "#fff",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
               },
            }}
         />
      </>
   );
}

export default App;
