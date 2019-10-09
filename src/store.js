import thunk from "redux-thunk";
import {applyMiddleware, createStore, compose} from "redux";
import {getReducers} from "./reducers/combine-reducers";

const initialState = {};
const middleware = [thunk];
const store = createStore(
    getReducers(),
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
