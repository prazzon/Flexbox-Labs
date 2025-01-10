export function generateGridAreas(columns: number, rows: number): string {
   let areas = "";
   for (let i = 0; i < rows; i++) {
      areas += '"';
      for (let j = 0; j < columns; j++) {
         areas += `area-${i}-${j} `;
      }
      areas = areas.trim() + '"\n';
   }
   return areas.trim();
}
