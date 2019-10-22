import {CREATE_PLAYERS} from '../action-types.js';

export const createPlayers = (data) => {
    return (
        {
            data: data,
            type: CREATE_PLAYERS
        }
    )
};
