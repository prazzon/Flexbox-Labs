import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/global.css";
import { PlaygroundProvider } from "./context/PlaygroundContext";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <PlaygroundProvider>
         <App />
      </PlaygroundProvider>
   </React.StrictMode>
);
