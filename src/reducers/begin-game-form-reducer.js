import {SET_BEGIN_GAME_FORM_VISIBILITY} from '../action-types.js';

const initialState = {
    visibility: true
};

const setBeginGameFormVisibility = (state, data) => {
    return (
        {
            ...state,
            visibility: data
        }
    )
};

const reducerMap = {
    [SET_BEGIN_GAME_FORM_VISIBILITY]: setBeginGameFormVisibility
};

export default (state = initialState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
