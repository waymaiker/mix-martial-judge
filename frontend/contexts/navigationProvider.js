import React, { useState, createContext } from "react";

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("events")

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationContext;