import {applyMiddleware, createStore} from 'redux';
import createLogger from 'redux-logger';
import * as Model from './model';

const middlewares = [
  createLogger(),
];

export default createStore(
  (state, action) => action.type === 'Patch' ? Model.applyPatch(state, action.patch) : state,
  Model.initialState,
  applyMiddleware(...middlewares)
);
