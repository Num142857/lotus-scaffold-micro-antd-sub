import { createStore, combineReducers } from 'redux'
import menuDate from "./common/menu"
const initialState = { 
  count: 0,
  refresh: 0
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    case 'REFRESH':
      return {
        ...state,
        refresh: state.refresh + 1
      }
    default:
      return state
  }
}

function menu(){
  return menuDate
}

export const storeInstance = createStore(combineReducers({ namespace: () => 'list', menu, reducer}))
