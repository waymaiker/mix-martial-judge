import React, { useState, createContext } from "react";

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
  //Rendering
  const [currentPage, setCurrentPage] = useState("events")
  const [eventIdSelected, setEventIdSelected] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <NavigationContext.Provider value={{
      currentPage,
      setCurrentPage,
      isLoading,
      setIsLoading,
      eventIdSelected,
      setEventIdSelected
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationContext;