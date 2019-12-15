import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { dieFace, dieColor } from '../enums'
import Game from '../components/Game'
import Chance from 'chance';

jest.mock('chance');

let mockSinglePlayerAssignmentState;
describe('Distribution Tests', () => {

    beforeEach(() => {
        mockSinglePlayerAssignmentState = {
            assignmentPopupVisibility: false,
            startFormVisibility: false,
            game: {
                factionTiles: [],
                homeWorldTiles: [],
                gameTiles: [],
                victoryPointPool: 12,
                players: [
                    {
                        citizenry: {
                            dice: []
                        },
                        cup: {
                            dice: []
                        },
                        developBuildQueue: [],
                        id: 1,
                        nextTileId: 1,
                        phasePowers: {
                            assignment: [],
                            develop: [],
                            endGame: [],
                            explore: [],
                            produce: [],
                            settle: [],
                            ship: []
                        },
                        phaseDice: {
                            exploreDice: {
                                dice: []
                            },
                            developDice: {
                                dice: []
                            },
                            settleDice: {
                                dice: []
                            },
                            produceDice: {
                                dice: []
                            },
                            shipDice: {
                                dice: []
                            },
                            wildDice: {
                                dice: []
                            },
                            selectorDice: {
                                dice: []
                            },
                            phaseDiceRolled: false
                        },
                        points: 0,
                        settleBuildQueue: [],
                        tiles: []
                    }
                ]
            }
        };
    });

    afterEach(cleanup);

    it('should call chance with the correct distribution of a blue die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.BLUE,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.PRODUCE,
            dieFace.PRODUCE,
            dieFace.SHIP,
            dieFace.SHIP,
            dieFace.WILD
        ]);
    });

    it('should call chance with the correct distribution of a brown die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.BROWN,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.DEVELOP,
            dieFace.PRODUCE,
            dieFace.SHIP,
            dieFace.WILD
        ]);
    });

    it('should call chance with the correct distribution of a green die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.GREEN,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.SETTLE,
            dieFace.SETTLE,
            dieFace.PRODUCE,
            dieFace.WILD,
            dieFace.WILD
        ]);
    });

    it('should call chance with the correct distribution of a purple die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.PURPLE,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.SHIP,
            dieFace.SHIP,
            dieFace.SHIP,
            dieFace.WILD
        ]);
    });

    it('should call chance with the correct distribution of a red die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.RED,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.DEVELOP,
            dieFace.SETTLE,
            dieFace.SETTLE,
            dieFace.WILD
        ]);
    });

    it('should call chance with the correct distribution of a white die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.WHITE,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.EXPLORE,
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.SETTLE,
            dieFace.PRODUCE,
            dieFace.SHIP
        ]);
    });

    it('should call chance with the correct distribution of a yellow die', () => {
        mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
            {
                color: dieColor.YELLOW,
                face: dieFace.EXPLORE
            }
        ];

        const { getByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
        const startRoundButton = getByText('Start Round');

        fireEvent.click(startRoundButton);

        expect(Chance.prototype.pickone).toHaveBeenCalledWith([
            dieFace.DEVELOP,
            dieFace.SETTLE,
            dieFace.PRODUCE,
            dieFace.WILD,
            dieFace.WILD,
            dieFace.WILD
        ]);
    });
});
