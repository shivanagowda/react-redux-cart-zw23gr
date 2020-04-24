import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { reducer } from './reducers/index'

const initialState = {
  cart: []
}

const logger = store => next => action => {
  console.log('dispatchin',action);
  let result = next(action);
  console.log('next state',store.getState());
  return result;
}


export default createStore(reducer, initialState, composeWithDevTools(
  applyMiddleware(logger, thunk)
));