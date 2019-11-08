import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';
import { initialGameState, tileTypes, bonuses } from '../enums';
import Chance from 'chance';

const chance = new Chance();

const generateRandomGenericTile = () => {
    return ({
        tileId: chance.integer({ min: 1, max: 100 }),
        tiles: [
            {
                tileType: chance.pickone(tileTypes),
                points: chance.integer({ min: 1, max: 100 }),
                name: chance.word()
            },
            {
                tileType: chance.pickone(tileTypes),
                points: chance.integer({ min: 1, max: 100 }),
                name: chance.word()
            }
        ]
    });
}

describe('Game', () => {
    let playerOneButton,
        playerTwoButton,
        playerThreeButton,
        playerFourButton,
        playerFiveButton;

    const getButtons = (queryByText) => {
        playerOneButton = queryByText('1');
        playerTwoButton = queryByText('2');
        playerThreeButton = queryByText('3');
        playerFourButton = queryByText('4');
        playerFiveButton = queryByText('5');
    };

    let mockSinglePlayerStartingState = {
        factionTiles: [
            generateRandomGenericTile()
        ],
        homeWorldTiles: [
            generateRandomGenericTile()
        ],
        gameTiles: [
            generateRandomGenericTile(),
            generateRandomGenericTile()
        ],
        victoryPointPool: 0
    }

    afterEach(cleanup);

    describe('Setup', () => {
        describe('Player Creation', () => {
            it('should display the start form', () => {
                const { getByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                expect(getByTestId('start-form')).toBeTruthy();
            });

            it('should hide the start form, create a victory point pool with 12 points, and create 1 player', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 12')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(1);
            });

            it('should hide the start form, create a victory point pool with 24 points, and create 2 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                getButtons(queryByText);
                fireEvent.click(playerTwoButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 24')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(2);
            });

            it('should hide the start form, create a victory point pool with 36 points, and create 3 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                getButtons(queryByText);
                fireEvent.click(playerThreeButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 36')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(3);
            });

            it('should hide the start form, create a victory point pool with 48 points, and create 4 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                getButtons(queryByText);
                fireEvent.click(playerFourButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 48')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(4);
            });

            it('should hide the start form, create a victory point pool with 60 points, and create 5 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game initialGameState={{ ...initialGameState }} />);

                getButtons(queryByText);
                fireEvent.click(playerFiveButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 60')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(5);
            });
        });

        describe('Bonus Tests', () => {
            it('should add one brown die to citizenry', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to citizenry', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should add one purple die to citizenry', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_PURPLE_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('PurpleDie').length).toBe(1);
            });

            it('should add one blue die and one red die to citizenry', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('BlueDie').length).toBe(1);
                expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
            });

            it('should add two red dice to citizenry', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.TWO_RED_DICE_TO_CITIZENRY;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const citizenry = getByTestId('citizenry');

                expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(2);
            });

            it('should add one blue die to cup', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('BlueDie').length).toBe(1);
            });

            it('should add one brown die to cup', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to cup', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should add one purple die to cup', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_PURPLE_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('PurpleDie').length).toBe(1);
            });

            it('should add one red die to cup', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_RED_DIE_TO_CUP;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');

                expect(within(cup).queryAllByTestId('RedDie').length).toBe(1);
            });

            it('should add one blue die to world', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BLUE_DIE_TO_WORLD;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('BlueDie').length).toBe(1);
            });

            it('should add one brown die to world', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_BROWN_DIE_TO_WORLD;
                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('BrownDie').length).toBe(1);
            });

            it('should add one green die to world', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].name = 'Here I am';
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.ONE_GREEN_DIE_TO_WORLD;

                const { queryByText, getByTestId, queryAllByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const world = getByTestId('Here I am');

                expect(within(world).queryAllByTestId('GreenDie').length).toBe(1);
            });

            it('should start the player with eight credits', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].bonus = bonuses.EIGHT_CREDITS;

                const { queryByText, getByTestId } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(getByTestId('credits').textContent).toBe('8');
            });
        });

        describe('Picking build queue tiles', () => {
            it('should keep the build queue totals as low as possible', () => {
                mockSinglePlayerStartingState = {
                    ...mockSinglePlayerStartingState,
                    gameTiles: [
                        {
                            tileId: chance.integer({ min: 1, max: 100 }),
                            tiles: [
                                {
                                    tileType: chance.pickone(tileTypes),
                                    points: 1,
                                    name: 'Low Dev'
                                },
                                {
                                    tileType: chance.pickone(tileTypes),
                                    points: 10,
                                    name: 'High Settle'
                                }
                            ]
                        },
                        {
                            tileId: chance.integer({ min: 1, max: 100 }),
                            tiles: [
                                {
                                    tileType: chance.pickone(tileTypes),
                                    points: 10,
                                    name: 'High Dev'
                                },
                                {
                                    tileType: chance.pickone(tileTypes),
                                    points: 1,
                                    name: 'Low Settle'
                                }
                            ]
                        }
                    ]
                }

                for (let i = 0; i < 10; i++) {
                    const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
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
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].assignment = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Assignment: Ima power.')).toBeTruthy();
            });

            it('should add an explore phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].explore = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Explore: Ima power.')).toBeTruthy();
            });

            it('should add a develop phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].develop = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Develop: Ima power.')).toBeTruthy();
            });

            it('should add a settle phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].settle = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Settle: Ima power.')).toBeTruthy();
            });

            it('should add a produce phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].produce = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Produce: Ima power.')).toBeTruthy();
            });

            it('should add a ship phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].ship = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('Ship: Ima power.')).toBeTruthy();
            });

            it('should add an end game phase power', () => {
                mockSinglePlayerStartingState.homeWorldTiles[0].tiles[0].endGame = 'Ima power.';

                const { queryByText } = render(<Game initialGameState={{ ...mockSinglePlayerStartingState }} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);

                expect(queryByText('End Game: Ima power.')).toBeTruthy();
            });
        });
    });
});
