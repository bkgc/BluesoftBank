import React from 'react'

interface ContextProps {
  getData: boolean
  openData: () => void
  closeData: () => void
}

export const UIContext = React.createContext({} as ContextProps)
