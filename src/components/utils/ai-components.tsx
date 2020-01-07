import { sortDiceByFaceInAssignmentState, addPickedPhaseToList } from './game-utilities';
import { DicePoolProps } from '../DicePool';
import { dieFace } from '../../enums';
import { DieProps } from '../Die';
import { AssignmentState } from '../AssignmentPopup';
import { fullState } from '../Game';
import DiceManager from './DiceManager';

export const assignAiPlayersDice = (state: fullState, diceManager: DiceManager): fullState => {
    for (let i = 1; i < state.game.players.length; i++) {
        let phaseStripDice: DicePoolProps = diceManager.rollDice(state.game.players[i].cup);
        let aiPlayerAssignmentState: AssignmentState = sortDiceByFaceInAssignmentState(phaseStripDice);
        for (let j = 0; j < aiPlayerAssignmentState.wildDice.dice.length; j++) {
            aiPlayerAssignmentState.exploreDice.dice.push(aiPlayerAssignmentState.wildDice.dice[j]);
        }
        aiPlayerAssignmentState.wildDice.dice = [];

        if (aiPlayerAssignmentState.exploreDice.dice.length === 0) {
            let selectorDie: DieProps | undefined;

            if (aiPlayerAssignmentState.developDice.dice.length > 0) {
                selectorDie = aiPlayerAssignmentState.developDice.dice.pop();
            } else if (aiPlayerAssignmentState.settleDice.dice.length > 0) {
                selectorDie = aiPlayerAssignmentState.settleDice.dice.pop();
            } else if (aiPlayerAssignmentState.produceDice.dice.length > 0) {
                selectorDie = aiPlayerAssignmentState.produceDice.dice.pop();
            } else if (aiPlayerAssignmentState.shipDice.dice.length > 0) {
                selectorDie = aiPlayerAssignmentState.shipDice.dice.pop();
            }

            if (selectorDie) {
                aiPlayerAssignmentState.exploreDice.dice.push(selectorDie);
            }
        };
        state.game.players[i].phaseDice = aiPlayerAssignmentState;
        state = addPickedPhaseToList(dieFace.EXPLORE, state);
    };
    return state;
};