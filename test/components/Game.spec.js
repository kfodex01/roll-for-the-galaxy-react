import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from "../../src/components/Game.js";
import {getReducers} from "../../src/reducers/combine-reducers";
import {initialGameState} from "../../src/enums";
import {within} from "@testing-library/dom";

const renderWithRedux = (component, {initialState, store = createStore(getReducers(), initialState)} = {}) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
};

const renderComponentWithSpecificStartingTiles = (factionTileId, homeworldTileId) => {
    let game = {
        ...initialGameState
    };
    if (factionTileId !== null) {
        game = {
            ...game,
            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === factionTileId)
        };
    }

    if (homeworldTileId !== null) {
        game = {
            ...game,
            homeWorldTiles: initialGameState.homeWorldTiles.filter(tile => tile.tileId === homeworldTileId)
        };
    }
    const {queryByTestId} = renderWithRedux(<Game/>, {
        initialState: {
            game
        }
    });
    return queryByTestId;
};

describe('Game', () => {
    afterEach(cleanup);

    describe('When begin game form is visible', () => {
        let buttonsDiv,
            playerOneButton,
            playerTwoButton,
            playerThreeButton,
            playerFourButton,
            playerFiveButton,
            victoryPointPool,
            playerBoards,
            playerOneBoard,
            playerOnePoints,
            playerOneCredits,
            playerOneCitizenryDice,
            playerOneCupDice,
            playerOneTileOne,
            playerOneTileTwo,
            playerOneTileThree,
            playerOnePhasePowers;

        const getButtons = (queryByTestId) => {
            buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
            [
                playerOneButton,
                playerTwoButton,
                playerThreeButton,
                playerFourButton,
                playerFiveButton
            ] = buttonsDiv.children;
        };

        const getPlayerBoards = (queryByTestId) => {
            victoryPointPool = queryByTestId('victory-point-pool');
            playerBoards = queryByTestId('player-boards');
            playerOneBoard = playerBoards.children[0];
            playerOnePoints = playerOneBoard.children[0].children[1];
            playerOneCredits = playerOneBoard.children[0].children[3];
            playerOneCitizenryDice = playerOneBoard.children[0].children[5];
            playerOneCupDice = playerOneBoard.children[0].children[6];
            [playerOneTileOne, playerOneTileTwo, playerOneTileThree] = playerOneBoard.children[1].children;
            playerOnePhasePowers = playerOneBoard.children[2];
        };

        it('should display begin game form correctly', () => {
            const {queryByTestId, queryAllByText} = renderWithRedux(<Game/>);
            getButtons(queryByTestId);

            expect(queryByTestId('begin-game-form')).not.toBeNull();
            expect(queryAllByText('Please select number of players').length).toBe(1);
            expect(buttonsDiv).not.toBeNull();
            expect(buttonsDiv.children.length).toBe(5);
            expect(playerOneButton.textContent).toBe('1');
            expect(playerTwoButton.textContent).toBe('2');
            expect(playerThreeButton.textContent).toBe('3');
            expect(playerFourButton.textContent).toBe('4');
            expect(playerFiveButton.textContent).toBe('5');
        });

        describe('Button Actions', () => {
            it('should hide the begin game form when 1 player button is clicked and create a single player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                getButtons(queryByTestId);

                fireEvent.click(playerOneButton);
                getPlayerBoards(queryByTestId);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(victoryPointPool.textContent).toBe('Victory Point Pool: 12');
                expect(playerBoards.children.length).toBe(1);
            });

            it('should hide the begin game form when 2 player button is clicked and create a two player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                getButtons(queryByTestId);

                fireEvent.click(playerTwoButton);
                getPlayerBoards(queryByTestId);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(victoryPointPool.textContent).toBe('Victory Point Pool: 24');
                expect(playerBoards.children.length).toBe(2);
            });

            it('should hide the begin game form when 3 player button is clicked and create a three player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                getButtons(queryByTestId);

                fireEvent.click(playerThreeButton);
                getPlayerBoards(queryByTestId);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(victoryPointPool.textContent).toBe('Victory Point Pool: 36');
                expect(playerBoards.children.length).toBe(3);
            });

            it('should hide the begin game form when 4 player button is clicked and create a four player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                getButtons(queryByTestId);

                fireEvent.click(playerFourButton);
                getPlayerBoards(queryByTestId);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(victoryPointPool.textContent).toBe('Victory Point Pool: 48');
                expect(playerBoards.children.length).toBe(4);
            });

            it('should hide the begin game form when 5 player button is clicked and create a five player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                getButtons(queryByTestId);

                fireEvent.click(playerFiveButton);
                getPlayerBoards(queryByTestId);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(victoryPointPool.textContent).toBe('Victory Point Pool: 60');
                expect(playerBoards.children.length).toBe(5);
            });
        });

        describe('Player Creation', () => {
            it('should create a player with correct number of credits', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        game: {
                            ...initialGameState,
                            homeWorldTiles: initialGameState.homeWorldTiles.filter(tile => tile.tileId !== 2)
                        }
                    }
                });
                getButtons(queryByTestId);

                fireEvent.click(playerOneButton);
                getPlayerBoards(queryByTestId);

                expect(playerOneBoard.children.length).toBeGreaterThan(0);
                expect(playerOneCredits.textContent).toBe('1');
            });

            describe('Faction Tile Setup', () => {
                it('should add Space Piracy and Hidden Fortress to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(1, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Space Piracy');
                    expect(playerOneTileTwo.textContent).toBe('Hidden Fortress');
                    expect(playerOnePhasePowers.textContent).toBe('Ship: +$1 for every two Military (red) dice (rounded up) in your Citizenry at the end of the phase.');
                    expect(playerOnePoints.textContent).toBe('2');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('RedDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Alien Archaeology and Alien Rosetta Stone World to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(2, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Alien Archaeology');
                    expect(playerOneTileTwo.textContent).toBe('Alien Rosetta Stone World');
                    expect(playerOnePhasePowers.textContent).toBe('Ship: +$4 (instead of +$2) when Stocking with an Alien Technology (yellow) explorer.');
                    expect(playerOnePoints.textContent).toBe('2');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('YellowDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Consumer Markets and Space Mall to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(3, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Consumer Markets');
                    expect(playerOneTileTwo.textContent).toBe('Space Mall');
                    expect(playerOnePhasePowers.textContent).toBe('Produce: +$1 for each good on a Novelty (blue) world at the end of this phase.');
                    expect(playerOnePoints.textContent).toBe('3');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(playerOneCupDice).getAllByTestId('BlueDie').length).toBe(1);
                });

                it('should add Improved Reconnaissance and Wormhole Station to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(4, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Improved Reconnaissance');
                    expect(playerOneTileTwo.textContent).toBe('Wormhole Station');
                    expect(playerOnePhasePowers.textContent).toBe('Explore: You may place new tiles on top of your stacks when Scouting.');
                    expect(playerOnePoints.textContent).toBe('5');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(playerOneCupDice).getAllByTestId('BrownDie').length).toBe(1);
                });

                it('should add Genetics Lab and The Last Of the Gnarssh to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(5, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Genetics Lab');
                    expect(playerOneTileTwo.textContent).toBe('The Last of the Gnarssh');
                    expect(playerOnePhasePowers.textContent).toBe('Produce: +$2 for each good represented by a Genes (green) die at the end of this phase.');
                    expect(playerOnePoints.textContent).toBe('2');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('GreenDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Galactic Religion and Pilgrimage World to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Galactic Religion');
                    expect(playerOneTileTwo.textContent).toBe('Pilgrimage World');
                    expect(within(playerOneTileTwo).getAllByTestId('BlueDie').length).toBe(1);
                    expect(playerOnePhasePowers.textContent).toBe('Develop: +$1 for each Novelty (blue) die in your Citizenry at the end of this phase.');
                    expect(playerOnePoints.textContent).toBe('5');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Biological Adaptation and Aquatic Uplift World to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(7, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Biological Adaptation');
                    expect(playerOneTileTwo.textContent).toBe('Aquatic Uplift World');
                    expect(playerOnePhasePowers.textContent).toBe('Develop: All Reassign-power developments require one fewer developer to complete (but no fewer than one).');
                    expect(playerOnePoints.textContent).toBe('4');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(playerOneCupDice).getAllByTestId('GreenDie').length).toBe(1);
                });

                it('should add Mining Industry and Meteorite Planet to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(8, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Mining Industry');
                    expect(playerOneTileTwo.textContent).toBe('Meteorite Planet');
                    expect(playerOnePhasePowers.textContent).toBe('Ship: +$1 for each good you Consume (not Trade) this phase from a Rare Elements (brown) world.');
                    expect(playerOnePoints.textContent).toBe('3');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('BrownDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Destroyed Colony and Awakened Alien Outpost to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(9, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileOne.textContent).toBe('Destroyed Colony');
                    expect(playerOneTileTwo.textContent).toBe('Awakened Alien Outpost');
                    expect(playerOnePhasePowers.textContent).toBe('');
                    expect(playerOnePoints.textContent).toBe('3');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('RedDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(playerOneCupDice).getAllByTestId('PurpleDie').length).toBe(1);
                });
            });

            describe('Home World Tile Setup', () => {
                it('should add New Sparta to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 1);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('New Sparta');
                    expect(playerOnePoints.textContent).toBe('7');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('RedDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Doomed World to tableau with correct credits and starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 2);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Doomed World');
                    expect(playerOnePoints.textContent).toBe('5');
                    expect(playerOneCredits.textContent).toBe('8');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Alpha Centauri to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 3);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Alpha Centauri');
                    expect(playerOnePoints.textContent).toBe('6');
                    expect(within(playerOneTileThree).getAllByTestId('BrownDie').length).toBe(1);
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Earth\'s Lost Colony to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 4);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Earth\'s Lost Colony');
                    expect(playerOnePoints.textContent).toBe('7');
                    expect(within(playerOneTileThree).getAllByTestId('BlueDie').length).toBe(1);
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Ancient Race to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 5);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Ancient Race');
                    expect(playerOnePoints.textContent).toBe('5');
                    expect(within(playerOneTileThree).getAllByTestId('GreenDie').length).toBe(1);
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Damaged Alien Factory to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 6);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Damaged Alien Factory');
                    expect(playerOnePoints.textContent).toBe('6');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('YellowDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Old Earth to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 7);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Old Earth');
                    expect(playerOnePoints.textContent).toBe('8');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('PurpleDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });

                it('should add Separatist Colony to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 8);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Separatist Colony');
                    expect(playerOnePoints.textContent).toBe('7');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(playerOneCupDice).getAllByTestId('RedDie').length).toBe(1);
                });

                it('should add Epsilon Eridani to tableau with correct starting dice', () => {
                    const queryByTestId = renderComponentWithSpecificStartingTiles(6, 9);
                    getButtons(queryByTestId);

                    fireEvent.click(playerOneButton);
                    getPlayerBoards(queryByTestId);

                    expect(playerOneBoard.children.length).toBeGreaterThan(1);
                    expect(playerOneTileThree.textContent).toBe('Epsilon Eridani');
                    expect(playerOnePoints.textContent).toBe('7');
                    expect(within(playerOneCitizenryDice).getAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(playerOneCitizenryDice).getAllByTestId('BlueDie').length).toBe(1);
                    expect(within(playerOneCitizenryDice).getAllByTestId('RedDie').length).toBe(1);
                    expect(within(playerOneCupDice).getAllByTestId('WhiteDie').length).toBe(3);
                });
            });
        });
    });
});
