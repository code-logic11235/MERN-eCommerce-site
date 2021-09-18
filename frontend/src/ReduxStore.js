import {  combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer } from "./reducer/productReducers";

const reducer = combineReducers ({
  products: productsReducer,
  productDetails: productDetailsReducer

})

let initialState = {};

const middleware = [thunk];

const reduxStore = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default reduxStore;