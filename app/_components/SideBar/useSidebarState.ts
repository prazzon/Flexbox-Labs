import { useCallback, useState } from "react";

/**
 * Hook for managing sidebar panel state and tab switching.
 * Follows React hook naming convention: use[Feature][OptionalModifier].
 */
export function useSidebar() {
   const [switchState, setSwitchState] = useState(0);
   const [showPanel, setShowPanel] = useState(true);

   const handleSwitch = useCallback(
      (dataSwitch: number) => {
         setSwitchState(dataSwitch);

         if (!showPanel) setShowPanel(true);
      },
      [showPanel],
   );

   const handlePanelToggle = useCallback(() => {
      setShowPanel((prev) => !prev);
   }, []);

   return {
      switchState,
      handleSwitch,
      showPanel,
      handlePanelToggle,
   };
}

export default useSidebar;
