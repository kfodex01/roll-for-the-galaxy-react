import { AssignmentState } from '../AssignmentPopup';
import { DieProps } from '../Die'
import { dieFace } from '../../enums';

const pushDieBackToDefaultPool = (state: AssignmentState, die: DieProps): AssignmentState => {
    switch (die.face) {
        case dieFace.EXPLORE:
            state.exploreDice.dice.push(die);
            break;
        case dieFace.DEVELOP:
            state.developDice.dice.push(die);
            break;
        case dieFace.SETTLE:
            state.settleDice.dice.push(die);
            break;
        case dieFace.PRODUCE:
            state.produceDice.dice.push(die);
            break;
        case dieFace.SHIP:
            state.shipDice.dice.push(die);
            break;
        case dieFace.WILD:
            state.wildDice.dice.push(die);
            break;
    };
    return state;
};

export const findDieByIdInAssignmentState = (state: AssignmentState, id: string): DieProps => {
    let die: DieProps[] = [];
    die.push(state.exploreDice.dice.filter(die => die.id === id)[0]);
    die.push(state.developDice.dice.filter(die => die.id === id)[0]);
    die.push(state.settleDice.dice.filter(die => die.id === id)[0]);
    die.push(state.produceDice.dice.filter(die => die.id === id)[0]);
    die.push(state.shipDice.dice.filter(die => die.id === id)[0]);
    die.push(state.wildDice.dice.filter(die => die.id === id)[0]);
    die.push(state.selectorDice.dice.filter(die => die.id === id)[0]);
    return die.filter(die => die)[0];
};

export const removeDieByIdFromAssignmentState = (state: AssignmentState, id: string): AssignmentState => {
    state.exploreDice.dice = state.exploreDice.dice.filter(die => die.id !== id);
    state.developDice.dice = state.developDice.dice.filter(die => die.id !== id);
    state.settleDice.dice = state.settleDice.dice.filter(die => die.id !== id);
    state.produceDice.dice = state.produceDice.dice.filter(die => die.id !== id);
    state.shipDice.dice = state.shipDice.dice.filter(die => die.id !== id);
    state.wildDice.dice = state.wildDice.dice.filter(die => die.id !== id);
    state.selectorDice.dice = state.selectorDice.dice.filter(die => die.id !== id);
    return state;
}

export const moveDieToPool = (state: AssignmentState, die: DieProps, containerToDropIn: string): AssignmentState => {
    switch (containerToDropIn) {
        case dieFace.EXPLORE:
            if (die.face === dieFace.EXPLORE || die.face === dieFace.WILD) {
                state.exploreDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        case dieFace.DEVELOP:
            if (die.face === dieFace.DEVELOP || die.face === dieFace.WILD) {
                state.developDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        case dieFace.SETTLE:
            if (die.face === dieFace.SETTLE || die.face === dieFace.WILD) {
                state.settleDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        case dieFace.PRODUCE:
            if (die.face === dieFace.PRODUCE || die.face === dieFace.WILD) {
                state.produceDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        case dieFace.SHIP:
            if (die.face === dieFace.SHIP || die.face === dieFace.WILD) {
                state.shipDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        case dieFace.WILD:
            if (die.face === dieFace.WILD) {
                state.wildDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
        default:
            if (state.selectorDice.dice.length === 0) {
                state.selectorDice.dice.push(die);
            } else {
                state = pushDieBackToDefaultPool(state, die);
            }
            break;
    };
    return state;
};
