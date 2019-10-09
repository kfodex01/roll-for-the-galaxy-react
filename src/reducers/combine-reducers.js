import {combineReducers} from 'redux';

import startForm from './start-form-reducer.js';

export const getReducers = () =>
    combineReducers({startForm});
