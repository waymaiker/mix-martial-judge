import { useContext } from "react";

import NavigationContext from "@/contexts/NavigationProvider";

export default function useNavigationProvider() {
  const context = useContext(NavigationContext)

  if(!context) {
      throw new Error('useNavigationProvider must be used within a NavigationProvider')
  }
  return context
}