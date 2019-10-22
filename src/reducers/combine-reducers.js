import {combineReducers} from 'redux';

import game from './game-reducer.js';

export const getReducers = () =>
    combineReducers({
        game
    });
