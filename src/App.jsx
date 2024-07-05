import { useEffect } from "react";
import Editor from "./components/Editor/Editor";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import Toolbar from "./components/Toolbar/Toolbar";
import { Toaster } from "react-hot-toast";

function App() {
   useEffect(() => {
      document.body.classList.add("show");
   })
   
   return (
      <>
         <Header />
         <Toolbar />
         <Playground />
         <Editor />
         <Footer />
         <Toaster
            position="bottom-center"
            reverseOrder={true}
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
               success: { duration: 3000 },
               error: { duration: 2000 },
               style: {
                  borderRadius: "15px",
                  padding: "12px 18px",
                  backgroundColor: "var(--bg-secondary-2)",
                  color: "var(--text-color-light)",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
               },
            }}
         />
      </>
   );
}

export default App;
