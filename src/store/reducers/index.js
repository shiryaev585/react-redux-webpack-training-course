const { combineReducers, createStore, applyMiddleware } = require("redux");
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
const { default: reposReducer } = require("./reposReducer");


const rootReducer = combineReducers({
    repos: reposReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))