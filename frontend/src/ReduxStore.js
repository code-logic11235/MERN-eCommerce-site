import {  combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducer = combineReducers ({


})

let initialState = {};

const middleware = [thunk];

const reduxStore = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default reduxStore;