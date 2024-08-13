import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/global.css";
import { PlaygroundProvider } from "./context/PlaygroundContext";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <PlaygroundProvider>
         <App />
      </PlaygroundProvider>
   </StrictMode>
);
