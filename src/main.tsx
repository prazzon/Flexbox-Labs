import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/global.scss";
import { PlaygroundProvider } from "./context/PlaygroundContext";
import { SettingsProvider } from "./context/SettingsContext.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <SettingsProvider>
         <PlaygroundProvider>
            <App />
         </PlaygroundProvider>
      </SettingsProvider>
   </StrictMode>
);
