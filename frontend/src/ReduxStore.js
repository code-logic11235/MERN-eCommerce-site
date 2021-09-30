import {  combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer } from "./reducer/productReducers";
import { modalReducer } from "./reducer/modalReducer";
import { FilterReducer } from "./reducer/filtersReduder";
const reducer = combineReducers ({
  products: productsReducer,
  productDetails: productDetailsReducer,
  modal: modalReducer,
  Filters: FilterReducer



})

let initialState = {};

const middleware = [thunk];

const reduxStore = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default reduxStore;