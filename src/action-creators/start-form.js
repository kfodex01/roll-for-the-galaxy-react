import {SET_BEGIN_GAME_FORM_VISIBILITY} from '../action-types.js';

export const showBeginGameForm = () => {
    return (
        {
            data: true,
            type: SET_BEGIN_GAME_FORM_VISIBILITY
        }
    )
};

export const hideBeginGameForm = () => {
    return (
        {
            data: false,
            type: SET_BEGIN_GAME_FORM_VISIBILITY
        }
    )
};
