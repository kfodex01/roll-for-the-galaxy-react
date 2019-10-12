import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from "../../src/components/Game.js";
import {getReducers} from "../../src/reducers/combine-reducers";
import {initialGameState} from "../../src/enums";

const renderWithRedux = (component, {initialState, store = createStore(getReducers(), initialState)} = {}) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
};

describe('Game', () => {
    afterEach(cleanup);

    describe('When begin game form is visible', () => {
        it('should display begin game form correctly', () => {
            const {queryByTestId, queryAllByText} = renderWithRedux(<Game/>);
            const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');

            expect(queryByTestId('begin-game-form')).not.toBeNull();
            expect(queryAllByText('Please select number of players').length).toBe(1);
            expect(buttonsDiv).not.toBeNull();
            expect(buttonsDiv.children.length).toBe(5);
            expect(buttonsDiv.children[0].textContent).toBe('1');
            expect(buttonsDiv.children[1].textContent).toBe('2');
            expect(buttonsDiv.children[2].textContent).toBe('3');
            expect(buttonsDiv.children[3].textContent).toBe('4');
            expect(buttonsDiv.children[4].textContent).toBe('5');
        });

        describe('Button Actions', () => {
            it('should hide the begin game form when 1 player button is clicked and create a single player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(queryByTestId('player-boards').children.length).toBe(1);
            });

            it('should hide the begin game form when 2 player button is clicked and create a two player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerTwoButton = buttonsDiv.children[1];

                fireEvent.click(playerTwoButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(queryByTestId('player-boards').children.length).toBe(2);
            });

            it('should hide the begin game form when 3 player button is clicked and create a three player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerThreeButton = buttonsDiv.children[2];

                fireEvent.click(playerThreeButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(queryByTestId('player-boards').children.length).toBe(3);
            });

            it('should hide the begin game form when 4 player button is clicked and create a four player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerFourButton = buttonsDiv.children[3];

                fireEvent.click(playerFourButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(queryByTestId('player-boards').children.length).toBe(4);
            });

            it('should hide the begin game form when 5 player button is clicked and create a five player game', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerFiveButton = buttonsDiv.children[4];

                fireEvent.click(playerFiveButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
                expect(queryByTestId('player-boards').children.length).toBe(5);
            });
        });

        describe('Player Creation', () => {
            it('should create a player with correct number of credits', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            homeWorldTiles: initialGameState.homeWorldTiles.filter(tile => tile.tileId !== 2)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);
                const playerBoard = queryByTestId('player-boards').children[0];

                expect(playerBoard.children.length).toBeGreaterThan(0);
                expect(playerBoard.children[0].textContent).toBe('1');
            });

            it('should create a player with correct number of credits with Doomed World', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            homeWorldTiles: initialGameState.homeWorldTiles.filter(tile => tile.tileId === 2)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(0);
                expect(playerBoard.children[0].textContent).toBe('8');
            });

            it('should add Space Piracy and Hidden Fortress to tableau', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === 1)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(1);
                expect(playerBoard.children[1].children[0].textContent).toBe('Space Piracy');
                expect(playerBoard.children[1].children[1].textContent).toBe('Hidden Fortress');
                expect(playerBoard.children[2].textContent).toBe('Ship: +$1 for every two Military (red) dice (rounded up) in your Citizenry at the end of the phase.');
            });

            it('should add Alien Archaeology and Alien Rosetta Stone World to tableau', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === 2)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(1);
                expect(playerBoard.children[1].children[0].textContent).toBe('Alien Archaeology');
                expect(playerBoard.children[1].children[1].textContent).toBe('Alien Rosetta Stone World');
                expect(playerBoard.children[2].textContent).toBe('Ship: +$4 (instead of +$2) when Stocking with an Alien Technology (yellow) explorer.');
            });

            it('should add Consumer Markets and Space Mall to tableau', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === 3)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(1);
                expect(playerBoard.children[1].children[0].textContent).toBe('Consumer Markets');
                expect(playerBoard.children[1].children[1].textContent).toBe('Space Mall');
                expect(playerBoard.children[2].textContent).toBe('Produce: +$1 for each good on a Novelty (blue) world at the end of this phase.');
            });

            it('should add Improved Reconnaissance and Wormhole Station to tableau', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === 4)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(1);
                expect(playerBoard.children[1].children[0].textContent).toBe('Improved Reconnaissance');
                expect(playerBoard.children[1].children[1].textContent).toBe('Wormhole Station');
                expect(playerBoard.children[2].textContent).toBe('Explore: You may place new tiles on top of your stacks when Scouting.');
            });

            it('should add Genetics Lab and The Last Of the Gnarssh to tableau', () => {
                const {queryByTestId} = renderWithRedux(<Game/>, {
                    initialState: {
                        beginGameForm: {visibility: true},
                        game: {
                            ...initialGameState,
                            factionTiles: initialGameState.factionTiles.filter(tile => tile.tileId === 5)
                        }
                    }
                });
                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                const playerBoard = queryByTestId('player-boards').children[0];
                expect(playerBoard.children.length).toBeGreaterThan(1);
                expect(playerBoard.children[1].children[0].textContent).toBe('Genetics Lab');
                expect(playerBoard.children[1].children[1].textContent).toBe('The Last of the Gnarssh');
                expect(playerBoard.children[2].textContent).toBe('Produce: +$2 for each good represented by a Genes (green) die at the end of this phase.');
            });
        });
    });

    describe('Begin game form is not visible', () => {
        it('should not show the begin game form', () => {
            const {queryByTestId} = renderWithRedux(<Game/>, {initialState: {beginGameForm: {visibility: false}}});

            expect(queryByTestId('begin-game-form')).toBeNull();
        });
    });
});
