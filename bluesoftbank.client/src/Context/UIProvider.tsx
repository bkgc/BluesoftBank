/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, useReducer } from 'react'
/*import { UIContext, uiReducer } from './'*/
import { UIContext } from './UIContext';
import { uiReducer } from './UIReducer';

export interface UIState {
  getData: boolean
}

const UI_INITIAL_STATE: UIState = {
  getData: false
}

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
  const openData = () => {
    dispatch({ type: 'UI- Open UpdateData' })
  }
  const closeData = () => {
    dispatch({ type: 'UI- Close UpdateData' })
  }

  return (
    <UIContext.Provider value={{ ...state, openData, closeData }}>
      {children}
    </UIContext.Provider>
  )
}
