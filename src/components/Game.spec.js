import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';
import { initialState, bonuses, tileTypes, dieColor, dieFace } from '../enums';
import Chance from 'chance';
import { getMockTile, getMockFullTile, getArrayOfRandomDice, getArrayOfRandomTiles, getMockDie } from '../test-utilities/mock-object-generators';
import { getDragEvent } from './utils/drag-event-utility';

jest.mock('./utils/drag-event-utility');

const chance = new Chance();

describe('Game', () => {
    afterEach(cleanup);

    describe('Setup', () => {
        let playerOneButton,
            playerTwoButton,
            playerThreeButton,
            playerFourButton,
            playerFiveButton,
            initialTestState,
            mockSinglePlayerStartingState;

        const getButtons = (queryByText) => {
            playerOneButton = queryByText('1');
            playerTwoButton = queryByText('2');
            playerThreeButton = queryByText('3');
            playerFourButton = queryByText('4');
            playerFiveButton = queryByText('5');
        };

        beforeEach(() => {
            initialTestState = JSON.parse(JSON.stringify(initialState));
            mockSinglePlayerStartingState = {
                game: {
                    factionTiles: [
                        getMockFullTile()
                    ],
                    homeWorldTiles: [
                        getMockFullTile()
                    ],
                    gameTiles: [
                        getMockFullTile(),
                        getMockFullTile()
                    ],
                    victoryPointPool: chance.integer({ min: 1, max: 60 })
                },
                startFormVisibility: true,
                assignmentPopupVisibility: false
            }
        });

        describe('Player Creation', () => {
            it('should display the start form', () => {
                const { getByTestId } = render(<Game initialState={initialTestState} />);

                expect(getByTestId('start-form')).toBeTruthy();
            });

            it('should hide the start form, create a victory point pool with 12 points, and create 1 player', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialState={initialTestState} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 12')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(1);
            });

            it('should hide the start form, create a victory point pool with 24 points, and create 2 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialState={initialTestState} />);

                getButtons(queryByText);
                fireEvent.click(playerTwoButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 24')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(2);
            });

            it('should hide the start form, create a victory point pool with 36 points, and create 3 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialState={initialTestState} />);

                getButtons(queryByText);
                fireEvent.click(playerThreeButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 36')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(3);
            });

            it('should hide the start form, create a victory point pool with 48 points, and create 4 players', () => {

                const { queryByText, getByTestId, queryByTestId } = render(<Game initialState={initialTestState} />);

                getButtons(queryByText);
                fireEvent.click(playerFourButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 48')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(4);
            });

            it('should hide the start form, create a victory point pool with 60 points, and create 5 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialState={initialTestState} />);

                getButtons(queryByText);
                fireEvent.click(playerFiveButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 60')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(5);
            });

            it('should create a player with three white dice in cup and two white dice in citizenry', () => {
                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');
                const citizenry = getByTestId('citizenry');

                expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
            });

            it('should create a player with the correct number of points', () => {
                mockSinglePlayerStartingState.game.factionTiles[0].tiles[0].points = 1;
                mockSinglePlayerStartingState.game.factionTiles[0].tiles[1].points = 2;
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].points = 3;

                const { queryByText, getByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const points = getByTestId('points');

                expect(points).toBeTruthy();
                expect(points.textContent).toBe('6');
            });

            it('should create a player with the correct number of credits', () => {
                const { queryByText, getByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const credits = getByTestId('credits');

                expect(credits).toBeTruthy();
                expect(credits.textContent).toBe('1');
            });
        });

        describe('Bonus Tests', () => {
            it('should add one brown die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should add one purple die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_PURPLE_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('PurpleDie').length).toBe(1);
            });

            it('should add one red die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_RED_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
            });

            it('should add one yellow die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_YELLOW_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('YellowDie').length).toBe(1);
            });

            it('should add one blue die and one red die to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('BlueDie').length).toBe(1);
                expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
            });

            it('should add two red dice to citizenry', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.TWO_RED_DICE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(2);
            });

            it('should add one blue die to cup', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('BlueDie').length).toBe(1);
            });

            it('should add one brown die to cup', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to cup', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should add one purple die to cup', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_PURPLE_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('PurpleDie').length).toBe(1);
            });

            it('should add one red die to cup', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_RED_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('RedDie').length).toBe(1);
            });

            it('should add one blue die to world', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_TO_WORLD;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('BlueDie').length).toBe(1);
            });

            it('should add one brown die to world', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_WORLD;
                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to world', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_WORLD;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should start the player with eight credits', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].bonus = bonuses.EIGHT_CREDITS;

                const { queryByText, getByTestId } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(getByTestId('credits').textContent).toBe('8');
            });
        });

        describe('Picking build queue tiles', () => {
            it('should keep the build queue totals as low as possible', () => {
                const customGameTiles = [
                    getMockFullTile(['Low Dev', 'High Settle'], [1, 10]),
                    getMockFullTile(['High Dev', 'Low Settle'], [10, 1])
                ];
                mockSinglePlayerStartingState.game.gameTiles = customGameTiles;

                for (let i = 0; i < 100; i++) {
                    const { queryByText } = render(<Game initialState={JSON.parse(JSON.stringify(mockSinglePlayerStartingState))} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);

                    expect(queryByText('Low Dev')).toBeTruthy();
                    expect(queryByText('Low Settle')).toBeTruthy();
                    expect(queryByText('High Dev')).toBeFalsy();
                    expect(queryByText('High Settle')).toBeFalsy();

                    cleanup();
                }
            });
        });

        describe('Phase Powers', () => {
            it('should add an assignment phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].assignment = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Assignment: Ima power.')).toBeTruthy();
            });

            it('should add an explore phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].explore = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Explore: Ima power.')).toBeTruthy();
            });

            it('should add a develop phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].develop = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Develop: Ima power.')).toBeTruthy();
            });

            it('should add a settle phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].settle = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Settle: Ima power.')).toBeTruthy();
            });

            it('should add a produce phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].produce = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Produce: Ima power.')).toBeTruthy();
            });

            it('should add a ship phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].ship = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Ship: Ima power.')).toBeTruthy();
            });

            it('should add an end game phase power', () => {
                mockSinglePlayerStartingState.game.homeWorldTiles[0].tiles[0].endGame = 'Ima power.';

                const { queryByText } = render(<Game initialState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('End Game: Ima power.')).toBeTruthy();
            });
        });
    });

    describe('Assignment Phase', () => {
        let mockSinglePlayerAssignmentState;

        beforeEach(() => {
            mockSinglePlayerAssignmentState = {
                assignmentPopupVisibility: false,
                startFormVisibility: false,
                game: {
                    factionTiles: [],
                    homeWorldTiles: [],
                    gameTiles: [],
                    victoryPointPool: chance.integer({ min: 1, max: 60 }),
                    players: [
                        {
                            citizenry: {
                                dice: getArrayOfRandomDice()
                            },
                            cup: {
                                dice: getArrayOfRandomDice()
                            },
                            developBuildQueue: getArrayOfRandomTiles(),
                            id: 1,
                            nextTileId: 4,
                            phasePowers: {
                                assignment: [],
                                develop: [],
                                endGame: [],
                                explore: [],
                                produce: [],
                                settle: [],
                                ship: []
                            },
                            points: chance.integer({ min: 0, max: 100 }),
                            settleBuildQueue: getArrayOfRandomTiles(),
                            tiles: [
                                getMockTile(),
                                getMockTile(),
                                getMockTile()
                            ],
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
                                }
                            }
                        }
                    ]
                }
            };

            mockSinglePlayerAssignmentState.game.players[0].tiles[0].tileId = 1;
            mockSinglePlayerAssignmentState.game.players[0].tiles[1].tileId = 2;
            mockSinglePlayerAssignmentState.game.players[0].tiles[2].tileId = 3;
        });

        it('should show the assignment popup', () => {
            const { getByText, queryByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(getByText('Assignment Phase')).toBeTruthy();
            expect(queryByTestId('explore-drop-box')).toBeTruthy();
            expect(queryByTestId('develop-drop-box')).toBeTruthy();
            expect(queryByTestId('settle-drop-box')).toBeTruthy();
            expect(queryByTestId('produce-drop-box')).toBeTruthy();
            expect(queryByTestId('ship-drop-box')).toBeTruthy();
            expect(queryByTestId('wild-drop-box')).toBeTruthy();
            expect(queryByTestId('reassign-drop-box')).toBeTruthy();
        });

        it('should hide the assignment popup', () => {
            const { getByText, queryByText, queryByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);
            const closeAssignmentPopupButton = getByText('Close');

            fireEvent.click(closeAssignmentPopupButton);

            expect(queryByText('Assignment Phase')).toBeFalsy();
            expect(queryByTestId('explore-drop-box')).toBeFalsy();
            expect(queryByTestId('develop-drop-box')).toBeFalsy();
            expect(queryByTestId('settle-drop-box')).toBeFalsy();
            expect(queryByTestId('produce-drop-box')).toBeFalsy();
            expect(queryByTestId('ship-drop-box')).toBeFalsy();
            expect(queryByTestId('wild-drop-box')).toBeFalsy();
            expect(queryByTestId('reassign-drop-box')).toBeFalsy();
        });

        it('should roll the dice from the cup when the dice have not been rolled yet', () => {
            mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
                {
                    color: dieColor.WHITE,
                    face: dieFace.WILD
                },
                {
                    color: dieColor.WHITE,
                    face: dieFace.WILD
                },
                {
                    color: dieColor.WHITE,
                    face: dieFace.WILD
                }
            ];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice = undefined;

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);
            const assignmentPopup = queryByTestId('assignment-popup');
            const whiteDice = within(assignmentPopup).queryAllByTestId('WhiteDie');

            expect(whiteDice.length).toBe(3);
            whiteDice.forEach(die => {
                expect(within(die).queryByTestId('wild-face')).toBeFalsy();;
            });
        });

        it('should not roll the dice from the cup when the dice have been rolled', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.wildDice = {
                dice: [
                    {
                        color: dieColor.WHITE,
                        face: dieFace.WILD,
                        id: '0'
                    },
                    {
                        color: dieColor.WHITE,
                        face: dieFace.WILD,
                        id: '1'
                    },
                    {
                        color: dieColor.WHITE,
                        face: dieFace.WILD,
                        id: '2'
                    }
                ]
            };

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);
            const assignmentPopup = queryByTestId('assignment-popup');
            const whiteDice = within(assignmentPopup).queryAllByTestId('WhiteDie');

            expect(whiteDice.length).toBe(3);
            whiteDice.forEach(die => {
                expect(within(die).queryByTestId('wild-face')).toBeTruthy();
            });
        });

        it('should only render a die in the explore field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.exploreDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.exploreDice.dice[0].face = dieFace.EXPLORE;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.exploreDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(1);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the develop field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.developDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.developDice.dice[0].face = dieFace.DEVELOP;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.developDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(1);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the settle field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.settleDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.settleDice.dice[0].face = dieFace.SETTLE;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.settleDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(1);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the produce field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.produceDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.produceDice.dice[0].face = dieFace.PRODUCE;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.produceDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(1);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the ship field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.shipDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.shipDice.dice[0].face = dieFace.SHIP;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.shipDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(1);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the wild field', () => {
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.wildDice.dice = [getMockDie()];
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.wildDice.dice[0].face = dieFace.WILD;
            mockSinglePlayerAssignmentState.game.players[0].phaseDice.wildDice.dice[0].id = '0';

            const { getByText, queryByTestId, queryAllByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
            const startRoundButton = getByText('Start Round');

            fireEvent.click(startRoundButton);

            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0);
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(1);
        });

        describe('Submit buttons', () => {
            let mockDataTransferData,
                exploreBox,
                developBox,
                settleBox,
                produceBox,
                shipBox,
                wildBox,
                phasePickerBox,
                exploreButton,
                developButton,
                settleButton,
                produceButton,
                shipButton;

            const mockDragEvent = {
                dataTransfer: {
                    getData: (key) => mockDataTransferData[key],
                    setData: (key, value) => {
                        mockDataTransferData = {
                            ...mockDataTransferData,
                            [key]: value
                        }
                    }
                },
                preventDefault: jest.fn()
            };

            const getDropBoxes = (getByTestId) => {
                exploreBox = getByTestId('explore-drop-box');
                developBox = getByTestId('develop-drop-box');
                settleBox = getByTestId('settle-drop-box');
                produceBox = getByTestId('produce-drop-box');
                shipBox = getByTestId('ship-drop-box');
                wildBox = getByTestId('wild-drop-box');
                phasePickerBox = getByTestId('phase-picker-box');
            };

            const getSubmitButtons = (getByText) => {
                exploreButton = getByText('Pick Explore');
                developButton = getByText('Pick Develop');
                settleButton = getByText('Pick Settle');
                produceButton = getByText('Pick Produce');
                shipButton = getByText('Pick Ship');
            };

            beforeEach(() => {
                mockSinglePlayerAssignmentState.game.players[0].cup.dice = [
                    {
                        color: dieColor.WHITE,
                        face: dieFace.EXPLORE
                    },
                    {
                        color: dieColor.WHITE,
                        face: dieFace.EXPLORE
                    },
                    {
                        color: dieColor.WHITE,
                        face: dieFace.EXPLORE
                    }
                ];
                mockSinglePlayerAssignmentState.game.players[0].phaseDice = undefined;
                getDragEvent.mockReturnValue(mockDragEvent);
                mockDataTransferData = {};
            });

            it('should not hide the start round button when the close button is clicked', () => {
                const { getByText, queryByText, queryByTestId } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                const closeAssignmentPopupButton = getByText('Close');

                fireEvent.click(closeAssignmentPopupButton);

                expect(queryByText('Start Round')).toBeTruthy();
            });

            it('should hide the start round button when the assignment is valid and the explore button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getDropBoxes(getByTestId);
                getSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(exploreButton);

                expect(queryByTestId('assignment-popup')).toBeFalsy();
                expect(queryByText('Start Round')).toBeFalsy();
            });

            it('should hide the start round button when the assignment is valid and the develop button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getDropBoxes(getByTestId);
                getSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(developButton);

                expect(queryByTestId('assignment-popup')).toBeFalsy();
                expect(queryByText('Start Round')).toBeFalsy();
            });

            it('should hide the start round button when the assignment is valid and the settle button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getDropBoxes(getByTestId);
                getSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(settleButton);

                expect(queryByTestId('assignment-popup')).toBeFalsy();
                expect(queryByText('Start Round')).toBeFalsy();
            });

            it('should hide the start round button when the assignment is valid and the produce button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getDropBoxes(getByTestId);
                getSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(produceButton);

                expect(queryByTestId('assignment-popup')).toBeFalsy();
                expect(queryByText('Start Round')).toBeFalsy();
            });

            it('should hide the start round button when the assignment is valid and the ship button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game initialState={mockSinglePlayerAssignmentState} />);
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getDropBoxes(getByTestId);
                getSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(shipButton);

                expect(queryByTestId('assignment-popup')).toBeFalsy();
                expect(queryByText('Start Round')).toBeFalsy();
            });
        });
    });
});
