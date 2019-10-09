import thunk from "redux-thunk";
import {applyMiddleware, createStore, compose} from "redux";
import {getReducers} from "./reducers/combine-reducers";

export const initializeStore = () => createStore(
    getReducers(),
    {},
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
