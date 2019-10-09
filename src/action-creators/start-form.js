import {DO_THE_THING} from '../action-types.js';

export const doTheThing = () => {
    return (
        {
            data: `Thing done`,
            type: DO_THE_THING
        }
    )
};
