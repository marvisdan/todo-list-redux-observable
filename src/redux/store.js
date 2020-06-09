import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { todosReducer, filterReducer } from "./reducers";
import { todosEpic } from "./epics";

export const rootEpic = combineEpics(todosEpic);
export const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
