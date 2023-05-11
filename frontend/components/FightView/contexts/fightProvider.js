import React, { useState, createContext } from "react";

const FightContext = createContext(null)

export const FightProvider = ({ children }) => {
  //States
  const [headRight, setHeadRight] = useState(0)
  const [bodyRight, setBodyRight] = useState(0)
  const [legsRight, setLegsRight] = useState(0)
  const [headLeft, setHeadLeft] = useState(0)
  const [bodyLeft, setBodyLeft] = useState(0)
  const [legsLeft, setLegsLeft] = useState(0)
  const [round, setRound] = useState(1)
  const [isPaused, setIsPaused] = useState(true)
  const [isRoundFinished, setRoundFinished] = useState(false)
  const [showNotice, setShowNotice] = useState(true)
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
      showNotice,
      setShowNotice,
      isRoundFinished,
      setRoundFinished,
      results,
      setResults,
      fightType,
      maxRound,
      isFightInProgress,
      isPaused,
      setIsPaused,
      headRight, setHeadRight,
      bodyRight, setBodyRight,
      legsRight, setLegsRight,
      headLeft, setHeadLeft,
      bodyLeft, setBodyLeft,
      legsLeft, setLegsLeft
    }}>
      {children}
    </FightContext.Provider>
  )
}

export default FightContext;