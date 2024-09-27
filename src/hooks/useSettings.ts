import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const useSettings = () => {
   const context = useContext(SettingsContext);

   if (!context) {
      throw new Error("useSettings must be used within a SettingsProvider");
   }

   return context;
};

export default useSettings;
