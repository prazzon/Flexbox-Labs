import { useEffect, useState } from "react";

export function useStarCount() {
   const [stars, setStars] = useState(0);

   const url = "https://api.github.com/repos/prazzon/flexbox-labs";

   const getUsers = async () => {
      try {
         const response = await fetch(url);

         if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
         }

         const repo = await response.json();

         setStars(repo.stargazers_count);
      } catch (error) {
         console.error("Failed to fetch stars:", error);
      }
   };

   useEffect(() => {
      getUsers();
   }, []);

   return stars;
}
