import { createStore, combineReducers } from 'redux'
import menuDate from "./common/menu"
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

const initialState = { 
  refresh: 0
}

function render(state = initialState, action) {
  switch (action.type) {
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

function to(state,action){
  if (action.type === 'to'){
    history.replace(action.path)
    console.log('sub 准备push')
    return { path: action.path }
  }
  return {}
}

export const storeInstance = createStore(combineReducers({ namespace: () => 'list', menu, render, to}))
export { history }
