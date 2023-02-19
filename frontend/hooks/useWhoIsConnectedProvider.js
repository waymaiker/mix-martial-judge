import { useContext } from "react";

import WhoIsConnectedContext from "@/contexts/whoIsConnectedProvider";

export default function useWhoIsConnectedProvider() {
  const context = useContext(WhoIsConnectedContext)

  if(!context) {
      throw new Error('useOwnerProvider must be used within a OwnerProvider')
  }
  return context
}