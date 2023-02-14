import React, { useState, createContext } from "react";

const FightContext = createContext(null)

export const FightProvider = ({ children }) => {

  //Rendering
  const [isLoading, setIsLoading] = useState(false)

  //States
  const [round, setRound] = useState(1)
  const [isRoundFinished, setRoundFinished] = useState(false)
  const [results, setResults] = useState({
    left: {head:0, body:0, legs:0},
    right: {head:0, body:0, legs:0},
    winner: ""
  })
  const fightType = false;
  const maxRound = fightType ? 5 : 3
  const isFightInProgress = round <= maxRound;

  return (
    <FightContext.Provider value={{ 
      round, 
      setRound,
      isRoundFinished, 
      setRoundFinished,
      results, 
      setResults,
      fightType,
      maxRound,
      isFightInProgress,
      isLoading, 
      setIsLoading
    }}>
      {children}
    </FightContext.Provider>
  )
}

export default FightContext;