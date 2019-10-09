import {DO_THE_THING} from '../action-types.js';

const initialState = {
    message: 'Hi'
};

const doTheThing = (state, data) => {
    console.log('state', state);
    
    return (
        {
            ...state,
            message: data
        }
    )
};

const reducerMap = {
    [DO_THE_THING]: doTheThing
};

export default (state = initialState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
