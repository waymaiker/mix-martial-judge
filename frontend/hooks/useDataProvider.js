import { useContext } from "react";

import DataContext from "@/contexts/dataProvider";

export default function useDataProvider() {
  const context = useContext(DataContext)

  if(!context) {
      throw new Error('useDataProvider must be used within a DataProvider')
  }
  return context
}