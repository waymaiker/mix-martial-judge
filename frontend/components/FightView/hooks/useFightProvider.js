import { useContext } from "react";

import FightContext from "../contexts/fightProvider";

export default function useFightProvider() {
  const context = useContext(FightContext)

  if(!context) {
      throw new Error('useFightProvider must be used within a FightProvider')
  }
  return context
}