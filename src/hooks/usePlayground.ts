import { useContext } from "react";
import { PlaygroundContext } from "../context/PlaygroundContext";

const usePlayground = () => {
   const context = useContext(PlaygroundContext);

   if (!context) {
      throw new Error("usePlayground must be used within a PlaygroundProvider");
   }

   return context;
};

export default usePlayground;