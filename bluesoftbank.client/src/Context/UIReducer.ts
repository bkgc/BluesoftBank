import { UIState } from '.'

type UIActionType =
  | { type: 'UI- Open UpdateData' }
  | { type: 'UI- Close UpdateData' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI- Open UpdateData':
      console.log('openData')

      return {
        ...state,
        getData: true
      }
    case 'UI- Close UpdateData':
      console.log('closeData')

      return {
        ...state,
        getData: false
      }
  }

  return state
}
