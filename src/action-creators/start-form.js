import {DO_THE_THING} from '../action-types.js';

export const doTheThing = () => dispatch => {
    dispatch (
        {
            data: `Thing done`,
            type: DO_THE_THING
        }
    )
};
