import {CREATE_PLAYERS} from '../action-types.js';

const initialState = {
    players: []
};

const createPlayers = (state, data) => {
    return (
        {
            ...state,
            players: data
        }
    )
};

const reducerMap = {
    [CREATE_PLAYERS]: createPlayers
};

export default (state = initialState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
