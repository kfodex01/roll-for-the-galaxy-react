import {combineReducers} from 'redux';

import beginGameForm from './begin-game-form-reducer.js';
import game from './game-reducer.js';

export const getReducers = () =>
    combineReducers({
        beginGameForm,
        game
    });
