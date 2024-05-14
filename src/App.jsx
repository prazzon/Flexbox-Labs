import { useEffect } from "react";
import Editor from "./components/Editor/Editor";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import Toolbar from "./components/Toolbar/Toolbar";

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
      </>
   );
}

export default App;
