import { assignAiPlayersDice } from './ai-components';
import { dieColor, phases, dieFace } from '../../enums';
import Chance from 'chance';

jest.mock('chance');

describe('ai-components', () => {
    // let mockFullState;

    // beforeEach(() => {
    //     mockFullState = {
    //         game: {
    //             players: [
    //                 {},
    //                 {
    //                     cup: {
    //                         dice: [
    //                             {
    //                                 color: dieColor.WHITE,
    //                                 face: phases.EXPLORE
    //                             }
    //                         ]
    //                     },
    //                     phaseDice: {
    //                         exploreDice: {
    //                             dice: []
    //                         },
    //                         developDice: {
    //                             dice: []
    //                         },
    //                         settleDice: {
    //                             dice: []
    //                         },
    //                         produceDice: {
    //                             dice: []
    //                         },
    //                         shipDice: {
    //                             dice: []
    //                         },
    //                         wildDice: {
    //                             dice: []
    //                         },
    //                         selectorDice: {
    //                             dice: []
    //                         },
    //                         phaseDiceRolled: false
    //                     }
    //                 }
    //             ]
    //         },
    //         pickedPhases: {
    //             explore: false,
    //             develop: false,
    //             settle: false,
    //             produce: false,
    //             ship: false
    //         }
    //     };
    //     Chance.mockClear();
    // });

    // it('should add the only die to the explore pool when explore is rolled', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.EXPLORE);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    // });

    // it('should add all the explore dice to the explore pool when all dice roll explore', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.EXPLORE);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(2);
    // });

    // it('should add the only die from the develop pool to the explore pool', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.DEVELOP);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.developDice.dice.length).toBe(0);
    // });

    // it('should add one die to the explore dice to the develop pool when all dice roll develop', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.DEVELOP);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.developDice.dice.length).toBe(1);
    // });

    // it('should add the only die from the settle pool to the explore pool', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.SETTLE);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.settleDice.dice.length).toBe(0);
    // });

    // it('should add one die to the explore dice to the settle pool when all dice roll settle', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.SETTLE);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.settleDice.dice.length).toBe(1);
    // });

    // it('should add the only die from the produce pool to the explore pool', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.PRODUCE);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.produceDice.dice.length).toBe(0);
    // });

    // it('should add one die to the explore dice to the produce pool when all dice roll produce', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.PRODUCE);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.produceDice.dice.length).toBe(1);
    // });

    // it('should add the only die from the ship pool to the explore pool', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.SHIP);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.shipDice.dice.length).toBe(0);
    // });

    // it('should add one die to the explore dice to the ship pool when all dice roll ship', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.SHIP);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.shipDice.dice.length).toBe(1);
    // });

    // it('should add the only die from the wild pool to the explore pool', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.WILD);
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(1);
    //     expect(result.game.players[1].phaseDice.wildDice.dice.length).toBe(0);
    // });

    // it('should add all the wild dice from the wild pool to the explore pool when all dice roll wild', () => {
    //     Chance.prototype.pickone.mockReturnValue(dieFace.WILD);
    //     mockFullState.game.players[1].cup.dice.push(
    //         {
    //             color: dieColor.WHITE,
    //             face: phases.EXPLORE
    //         }
    //     );
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(2);
    //     expect(result.game.players[1].phaseDice.wildDice.dice.length).toBe(0);
    // });

    // it('should return an empty strip when the cup is empty', () => {
    //     mockFullState.game.players[1].cup.dice = [];
    //     let result = assignAiPlayersDice(mockFullState);

    //     expect(result.game.players[1].phaseDice.exploreDice.dice.length).toBe(0);
    //     expect(result.game.players[1].phaseDice.developDice.dice.length).toBe(0);
    //     expect(result.game.players[1].phaseDice.settleDice.dice.length).toBe(0);
    //     expect(result.game.players[1].phaseDice.produceDice.dice.length).toBe(0);
    //     expect(result.game.players[1].phaseDice.shipDice.dice.length).toBe(0);
    //     expect(result.game.players[1].phaseDice.wildDice.dice.length).toBe(0);
    // });
});