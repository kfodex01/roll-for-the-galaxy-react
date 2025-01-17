import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';
import { initialState, bonuses, tileTypes, dieColor, dieFace, developmentPowers } from '../enums';
import { getMockTile, getMockFullTile, getArrayOfRandomDice, getArrayOfRandomTiles, getMockDie } from '../test-utilities/mock-object-generators';
import { getDragEvent } from './utils/drag-event-utility';
import GameManager from './utils/GameManager';
import DiceManager from './utils/DiceManager';
import { finishAssignmentPhase } from './utils/game-utilities';

jest.mock('./utils/drag-event-utility');

describe('Game', () => {
    let gameManager,
        diceManager;

    beforeEach(() => {
        gameManager = new GameManager();
        diceManager = new DiceManager();
    });

    afterEach(cleanup);

    describe('Setup', () => {
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

        describe('Player Creation', () => {
            it('should display the start form', () => {
                const { getByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                expect(getByTestId('start-form')).toBeTruthy();
            });

            it('should hide the start form, create a victory point pool with 12 points, and create 1 player', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 12')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(1);
            });

            it('should hide the start form, create a victory point pool with 24 points, and create 2 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                getButtons(queryByText);
                fireEvent.click(playerTwoButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 24')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(2);
            });

            it('should hide the start form, create a victory point pool with 36 points, and create 3 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                getButtons(queryByText);
                fireEvent.click(playerThreeButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 36')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(3);
            });

            it('should hide the start form, create a victory point pool with 48 points, and create 4 players', () => {

                const { queryByText, getByTestId, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                getButtons(queryByText);
                fireEvent.click(playerFourButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 48')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(4);
            });

            it('should hide the start form, create a victory point pool with 60 points, and create 5 players', () => {
                const { queryByText, getByTestId, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                getButtons(queryByText);
                fireEvent.click(playerFiveButton);
                const playerBoards = getByTestId('player-boards');

                expect(queryByTestId('start-form')).toBeFalsy();
                expect(queryByText('Victory Point Pool: 60')).toBeTruthy();
                expect(playerBoards).toBeTruthy();
                expect(playerBoards.children.length).toBe(5);
            });

            it('should create a player with three white dice in cup and two white dice in citizenry', () => {
                const { queryByText, getByTestId, queryAllByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                getButtons(queryByText);
                fireEvent.click(playerOneButton);
                const cup = getByTestId('cup');
                const citizenry = getByTestId('citizenry');

                expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
            });

            describe('Faction Tiles', () => {
                it('should render a player with Space Piracy and Hidden Fortress', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('3');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Space Piracy')).toBeTruthy();
                    expect(within(tableau).getByText('Hidden Fortress')).toBeTruthy();
                    expect(getByText('Ship: ' + developmentPowers.SPACE_PIRACY)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
                });

                it('should render a player with Alien Archaeology and Alien Rosetta Stone World', () => {
                    gameManager.chooseNextFactionTiles([2]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('3');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Alien Archaeology')).toBeTruthy();
                    expect(within(tableau).getByText('Alien Rosetta Stone World')).toBeTruthy();
                    expect(getByText('Ship: ' + developmentPowers.ALIEN_ARCHAEOLOGY)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('YellowDie').length).toBe(1);
                });

                it('should render a player with Consumer Markets and Space Mall', () => {
                    gameManager.chooseNextFactionTiles([3]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('4');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('blue-world').length).toBe(1);
                    expect(within(tableau).getByText('Consumer Markets')).toBeTruthy();
                    expect(within(tableau).getByText('Space Mall')).toBeTruthy();
                    expect(getByText('Produce: ' + developmentPowers.CONSUMER_MARKETS)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(cup).queryAllByTestId('BlueDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                });

                it('should render a player with Improved Reconnaissance and Wormhole Station', () => {
                    gameManager.chooseNextFactionTiles([4]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('7');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('brown-world').length).toBe(1);
                    expect(within(tableau).getByText('Improved Reconnaissance')).toBeTruthy();
                    expect(within(tableau).getByText('Wormhole Station')).toBeTruthy();
                    expect(getByText('Explore: ' + developmentPowers.IMPROVED_RECONNAISSANCE)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(cup).queryAllByTestId('BrownDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                });

                it('should render a player with Genetics Lab and The Last of the Gnarssh', () => {
                    gameManager.chooseNextFactionTiles([5]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('4');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('green-world').length).toBe(1);
                    expect(within(tableau).getByText('Genetics Lab')).toBeTruthy();
                    expect(within(tableau).getByText('The Last of the Gnarssh')).toBeTruthy();
                    expect(getByText('Produce: ' + developmentPowers.GENETICS_LAB)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('GreenDie').length).toBe(1);
                });

                it('should render a player with Galactic Religion and Pilgrimage World', () => {
                    gameManager.chooseNextFactionTiles([6]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('7');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('blue-world').length).toBe(1);
                    expect(within(tableau).getByText('Galactic Religion')).toBeTruthy();
                    expect(within(tableau).getByText('Pilgrimage World')).toBeTruthy();
                    expect(getByText('Develop: ' + developmentPowers.GALACTIC_RELIGION)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(tableau).queryAllByTestId('BlueDie').length).toBe(1);
                });

                it('should render a player with Biological Adaptation and Aquatic Uplift World', () => {
                    gameManager.chooseNextFactionTiles([7]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('5');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Biological Adaptation')).toBeTruthy();
                    expect(within(tableau).getByText('Aquatic Uplift World')).toBeTruthy();
                    expect(getByText('Develop: ' + developmentPowers.BIOLOGICAL_ADAPTATION)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(cup).queryAllByTestId('GreenDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                });

                it('should render a player with Mining Industry and Meteorite Planet', () => {
                    gameManager.chooseNextFactionTiles([8]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('5');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('development').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('brown-world').length).toBe(1);
                    expect(within(tableau).getByText('Mining Industry')).toBeTruthy();
                    expect(within(tableau).getByText('Meteorite Planet')).toBeTruthy();
                    expect(getByText('Ship: ' + developmentPowers.MINING_INDUSTRY)).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('BrownDie').length).toBe(1);
                });

                it('should render a player with Destroyed Colony and Awakened Alien Outpost', () => {
                    gameManager.chooseNextFactionTiles([9]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('4');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).queryAllByTestId('yellow-world').length).toBe(1);
                    expect(within(tableau).getByText('Destroyed Colony')).toBeTruthy();
                    expect(within(tableau).getByText('Awakened Alien Outpost')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(cup).queryAllByTestId('PurpleDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
                });
            });

            describe('Homeworld Tiles', () => {
                it('should render a player with New Sparta', () => {
                    gameManager.chooseNextFactionTiles([4]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('7');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('New Sparta')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(2);
                });

                it('should render a player with Doomed World', () => {
                    gameManager.chooseNextFactionTiles([4]);
                    gameManager.chooseNextHomeWorldTiles([2]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('5');
                    expect(getByTestId('credits').textContent).toBe('8');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Doomed World')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                });

                it('should render a player with Alpha Centauri', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([3]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('3');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('brown-world').length).toBe(1);
                    expect(within(tableau).getByText('Alpha Centauri')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(tableau).queryAllByTestId('BrownDie').length).toBe(1);
                });

                it('should render a player with Earth\'s Lost Colony', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([4]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('4');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('blue-world').length).toBe(1);
                    expect(within(tableau).getByText('Earth\'s Lost Colony')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(tableau).queryAllByTestId('BlueDie').length).toBe(1);
                });

                it('should render a player with Ancient Race', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([5]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('2');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('green-world').length).toBe(1);
                    expect(within(tableau).getByText('Ancient Race')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(tableau).queryAllByTestId('GreenDie').length).toBe(1);
                });

                it('should render a player with Damaged Alien Factory', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([6]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('3');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('yellow-world').length).toBe(1);
                    expect(within(tableau).getByText('Damaged Alien Factory')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('YellowDie').length).toBe(1);
                });

                it('should render a player with Old Earth', () => {
                    gameManager.chooseNextFactionTiles([3]);
                    gameManager.chooseNextHomeWorldTiles([7]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('6');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Old Earth')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('PurpleDie').length).toBe(1);
                });

                it('should render a player with Separatist Colony', () => {
                    gameManager.chooseNextFactionTiles([3]);
                    gameManager.chooseNextHomeWorldTiles([8]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('5');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Separatist Colony')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(cup).queryAllByTestId('RedDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                });

                it('should render a player with Epsilon Eridani', () => {
                    gameManager.chooseNextFactionTiles([3]);
                    gameManager.chooseNextHomeWorldTiles([9]);

                    const { queryByText, getByTestId, queryAllByTestId, getByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const cup = getByTestId('cup');
                    const citizenry = getByTestId('citizenry');
                    const tableau = getByTestId('tableau');

                    expect(getByTestId('points').textContent).toBe('5');
                    expect(getByTestId('credits').textContent).toBe('1');
                    expect(within(tableau).queryAllByTestId('gray-world').length).toBe(1);
                    expect(within(tableau).getByText('Epsilon Eridani')).toBeTruthy();
                    expect(within(cup).queryAllByTestId('WhiteDie').length).toBe(3);
                    expect(within(citizenry).queryAllByTestId('WhiteDie').length).toBe(2);
                    expect(within(citizenry).queryAllByTestId('RedDie').length).toBe(1);
                    expect(within(citizenry).queryAllByTestId('BlueDie').length).toBe(1);
                });
            });

            describe('Game Tiles', () => {
                it('should keep tiles in the same order when the lowest build total is achieved', () => {
                    gameManager.chooseNextGameTiles([6, 1]);

                    const { queryByText, getByTestId, queryAllByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const buildQueues = getByTestId('build-queues');

                    expect(within(buildQueues).queryAllByText('1').length).toBe(1);
                    expect(within(buildQueues).queryAllByTestId('development').length).toBe(1);
                    expect(within(buildQueues).getByText('Advanced Logistics')).toBeTruthy();
                    expect(within(buildQueues).queryAllByText('2').length).toBe(1);
                    expect(within(buildQueues).queryAllByTestId('blue-world').length).toBe(1);
                    expect(within(buildQueues).getByText('Gem World')).toBeTruthy();
                });

                it('should swap tiles when the lowest build total is the reverse', () => {
                    gameManager.chooseNextGameTiles([1, 6]);

                    const { queryByText, getByTestId, queryAllByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    getButtons(queryByText);
                    fireEvent.click(playerOneButton);
                    const buildQueues = getByTestId('build-queues');

                    expect(within(buildQueues).queryAllByText('1').length).toBe(1);
                    expect(within(buildQueues).queryAllByTestId('development').length).toBe(1);
                    expect(within(buildQueues).getByText('Advanced Logistics')).toBeTruthy();
                    expect(within(buildQueues).queryAllByText('2').length).toBe(1);
                    expect(within(buildQueues).queryAllByTestId('blue-world').length).toBe(1);
                    expect(within(buildQueues).getByText('Gem World')).toBeTruthy();
                });
            });
        });
    });

    describe('Main Game Loop', () => {
        let mockDataTransferData,
            mockSinglePlayerAssignmentState,
            exploreBox,
            developBox,
            settleBox,
            produceBox,
            shipBox,
            wildBox,
            phasePickerBox,
            scoutBox,
            unassignedBox,
            stockBox,
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

        const getAssignmentDropBoxes = (getByTestId) => {
            exploreBox = getByTestId('explore-drop-box');
            developBox = getByTestId('develop-drop-box');
            settleBox = getByTestId('settle-drop-box');
            produceBox = getByTestId('produce-drop-box');
            shipBox = getByTestId('ship-drop-box');
            wildBox = getByTestId('wild-drop-box');
            phasePickerBox = getByTestId('phase-picker-box');
        };

        const getAssignmentSubmitButtons = (getByText) => {
            exploreButton = getByText('Pick Explore');
            developButton = getByText('Pick Develop');
            settleButton = getByText('Pick Settle');
            produceButton = getByText('Pick Produce');
            shipButton = getByText('Pick Ship');
        };

        const getExploreDropBoxes = (getByTestId) => {
            scoutBox = getByTestId('scout-box');
            unassignedBox = getByTestId('unassigned-box');
            stockBox = getByTestId('stock-box');
        };

        describe('Assignment Phase', () => {
            it('should show the assignment popup', () => {
                const { getByText, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                fireEvent.click(getByText('1'));
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
                const { getByText, queryByText, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                fireEvent.click(getByText('1'));
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

            describe('Submit buttons', () => {
                beforeEach(() => {
                    getDragEvent.mockReturnValue(mockDragEvent);
                    mockDataTransferData = {};
                });

                it('should not hide the start round button when the close button is clicked', () => {
                    const { getByText, queryByText, queryByTestId } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    const closeAssignmentPopupButton = getByText('Close');

                    fireEvent.click(closeAssignmentPopupButton);

                    expect(queryByText('Start Round')).toBeTruthy();
                });

                it('should hide the start round button when the assignment is valid and the explore button is clicked', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    getAssignmentDropBoxes(getByTestId);
                    getAssignmentSubmitButtons(getByText);
                    const assignmentPopup = getByTestId('assignment-popup');
                    const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(phasePickerBox);
                    fireEvent.drop(phasePickerBox);

                    fireEvent.click(exploreButton);

                    expect(queryByTestId('assignment-popup')).toBeFalsy();
                    expect(queryByText('Start Round')).toBeFalsy();
                    expect(queryByTestId('active-explore-phase')).toBeTruthy();
                });

                it('should hide the start round button when the assignment is valid and the develop button is clicked', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    getAssignmentDropBoxes(getByTestId);
                    getAssignmentSubmitButtons(getByText);
                    const assignmentPopup = getByTestId('assignment-popup');
                    const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(phasePickerBox);
                    fireEvent.drop(phasePickerBox);
                    fireEvent.click(developButton);

                    expect(queryByTestId('assignment-popup')).toBeFalsy();
                    expect(queryByText('Start Round')).toBeFalsy();
                    expect(queryByTestId('active-develop-phase')).toBeTruthy();
                });

                it('should hide the start round button when the assignment is valid and the settle button is clicked', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    getAssignmentDropBoxes(getByTestId);
                    getAssignmentSubmitButtons(getByText);
                    const assignmentPopup = getByTestId('assignment-popup');
                    const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(phasePickerBox);
                    fireEvent.drop(phasePickerBox);
                    fireEvent.click(settleButton);

                    expect(queryByTestId('assignment-popup')).toBeFalsy();
                    expect(queryByText('Start Round')).toBeFalsy();
                    expect(queryByTestId('active-settle-phase')).toBeTruthy();
                });

                it('should hide the start round button when the assignment is valid and the produce button is clicked', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    getAssignmentDropBoxes(getByTestId);
                    getAssignmentSubmitButtons(getByText);
                    const assignmentPopup = getByTestId('assignment-popup');
                    const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(phasePickerBox);
                    fireEvent.drop(phasePickerBox);
                    fireEvent.click(produceButton);

                    expect(queryByTestId('assignment-popup')).toBeFalsy();
                    expect(queryByText('Start Round')).toBeFalsy();
                    expect(queryByTestId('active-produce-phase')).toBeTruthy();
                });

                it('should hide the start round button when the assignment is valid and the ship button is clicked', () => {
                    gameManager.chooseNextFactionTiles([1]);
                    gameManager.chooseNextHomeWorldTiles([1]);

                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);
                    fireEvent.click(getByText('1'));
                    const startRoundButton = getByText('Start Round');

                    fireEvent.click(startRoundButton);
                    getAssignmentDropBoxes(getByTestId);
                    getAssignmentSubmitButtons(getByText);
                    const assignmentPopup = getByTestId('assignment-popup');
                    const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(phasePickerBox);
                    fireEvent.drop(phasePickerBox);
                    fireEvent.click(shipButton);

                    expect(queryByTestId('assignment-popup')).toBeFalsy();
                    expect(queryByText('Start Round')).toBeFalsy();
                    expect(queryByTestId('active-ship-phase')).toBeTruthy();
                });
            });
        });

        describe('Explore Phase', () => {
            beforeEach(() => {
                gameManager.chooseNextFactionTiles([1]);
                gameManager.chooseNextHomeWorldTiles([1]);
            });

            const finishAssignmentPhase = (getByText, getByTestId) => {
                fireEvent.click(getByText('1'));
                const startRoundButton = getByText('Start Round');

                fireEvent.click(startRoundButton);
                getAssignmentDropBoxes(getByTestId);
                getAssignmentSubmitButtons(getByText);
                const assignmentPopup = getByTestId('assignment-popup');
                const dieToDrag = within(assignmentPopup).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);
                fireEvent.click(exploreButton);
            };

            it('should display the Explore Phase popup', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                finishAssignmentPhase(getByText, getByTestId);
                fireEvent.click(getByText('Explore Phase'));

                expect(getByTestId('explore-popup')).toBeTruthy();
                expect(queryByTestId('scout-box')).toBeTruthy();
                expect(queryByTestId('unassigned-box')).toBeTruthy();
                expect(queryByTestId('stock-box')).toBeTruthy();
            });

            it('should close the Explore Phase popup when the close button is clicked', () => {
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                finishAssignmentPhase(getByText, getByTestId);
                fireEvent.click(getByText('Explore Phase'));
                fireEvent.click(getByText('Close'));

                expect(queryByTestId('explore-popup')).toBeFalsy();
                expect(queryByTestId('scout-box')).toBeFalsy();
                expect(queryByTestId('unassigned-box')).toBeFalsy();
                expect(queryByTestId('stock-box')).toBeFalsy();
            });

            it('should have all dice in the assign pool on load', () => {
                gameManager.chooseNextGameTiles([1, 2, 3]);
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                finishAssignmentPhase(getByText, getByTestId);
                fireEvent.click(getByText('Explore Phase'));
                getExploreDropBoxes(getByTestId);

                expect(within(unassignedBox).queryAllByTestId('WhiteDie').length).toBeGreaterThan(0);
                expect(within(scoutBox).queryAllByTestId('WhiteDie').length).toBe(0);
                expect(within(stockBox).queryAllByTestId('WhiteDie').length).toBe(0);
            });

            it('should allow a die to be dragged from unassigned to scout and back', () => {
                gameManager.chooseNextGameTiles([1, 2, 3]);
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                finishAssignmentPhase(getByText, getByTestId);
                fireEvent.click(getByText('Explore Phase'));

                getExploreDropBoxes(getByTestId);
                const numberOfUnassignedDiceBeforeDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie').length;
                let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(scoutBox);
                fireEvent.drop(scoutBox);

                expect(within(unassignedBox).queryAllByTestId('WhiteDie').length).toBe(numberOfUnassignedDiceBeforeDrag - 1);
                expect(within(scoutBox).queryAllByTestId('WhiteDie').length).toBe(1);

                dieToDrag = within(getByTestId('scout-box')).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(unassignedBox);
                fireEvent.drop(unassignedBox);

                expect(within(unassignedBox).queryAllByTestId('WhiteDie').length).toBe(numberOfUnassignedDiceBeforeDrag);
                expect(within(scoutBox).queryAllByTestId('WhiteDie').length).toBe(0);
            });

            it('should allow a die to be dragged from unassigned to stock and back', () => {
                gameManager.chooseNextGameTiles([1, 2, 3]);
                const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                finishAssignmentPhase(getByText, getByTestId);
                fireEvent.click(getByText('Explore Phase'));

                getExploreDropBoxes(getByTestId);
                const numberOfUnassignedDiceBeforeDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie').length;
                let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(stockBox);
                fireEvent.drop(stockBox);

                expect(within(unassignedBox).queryAllByTestId('WhiteDie').length).toBe(numberOfUnassignedDiceBeforeDrag - 1);
                expect(within(stockBox).queryAllByTestId('WhiteDie').length).toBe(1);

                dieToDrag = within(getByTestId('stock-box')).queryAllByTestId('WhiteDie')[0];
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(unassignedBox);
                fireEvent.drop(unassignedBox);

                expect(within(unassignedBox).queryAllByTestId('WhiteDie').length).toBe(numberOfUnassignedDiceBeforeDrag);
                expect(within(stockBox).queryAllByTestId('WhiteDie').length).toBe(0);
            });

            describe('Scouting', () => {
                it('should display the send scout button', () => {
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);

                    expect(within(explorePopup).queryByText('Send Scout')).toBeTruthy();
                });

                it('should return the die to the citizenry when the scout button is clicked', () => {
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    const citizenry = getByTestId('citizenry');
                    const beforeNumberOfWhiteDiceInCitizenry = within(citizenry).getAllByTestId('WhiteDie').length;
                    fireEvent.click(getByText('Send Scout'));
                    const afterNumberOfWhiteDiceInCitizenry = within(citizenry).getAllByTestId('WhiteDie').length;

                    expect(within(scoutBox).queryAllByTestId('WhiteDie').length).toBe(0);
                    expect(afterNumberOfWhiteDiceInCitizenry).toBe(beforeNumberOfWhiteDiceInCitizenry + 1);
                });

                it('should display the correct tile choice when scout button is clicked and tile has assignment power', () => {
                    gameManager.chooseNextGameTiles([7, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Colonial Affinity')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Assignment: You may Reassign one worker to become a settler.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Malevolent Lifeforms')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain a Genes (green) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has explore power', () => {
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Advanced Logistics')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Explore: You may rearrange all tiles in your construction zone (including turning them over).')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Designer Species, Ultd.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Genes (green) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has develop power', () => {
                    gameManager.chooseNextGameTiles([18, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Galactic Investors')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Develop: +$2 at the end of this phase, including the phase in which you complete this.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('New Vinland')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain a Novelty (blue) die into your cup when you place this world.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has settle power', () => {
                    gameManager.chooseNextGameTiles([4, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Alien Uplift Blueprints')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Settle: Genes (green) and Alien Technology (yellow) worlds require one fewer settler to complete.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Information Hub')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain a Novelty (blue) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has produce power', () => {
                    gameManager.chooseNextGameTiles([33, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Merchant Guild')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Produce: +$2 at the end of this phase.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Jumpdrive Fuel Refinery')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain a Rare Elements (brown) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has ship power', () => {
                    gameManager.chooseNextGameTiles([10, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Export Duties')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Ship: +$1 for each good you Trade this phase.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Silicon World')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Rare Elements (brown) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should display the correct tile choice when scout button is clicked and tile has end game power', () => {
                    gameManager.chooseNextGameTiles([11, 1, 2]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Free Trade Association')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Ship: +$2 at the end of this phase.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('End Game: Add half of your total Novelty (blue) world cost (rounded up).')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Sentient Robots')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain a Military (red) die into your cup when you place this world.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);
                });

                it('should remove the tile choice when first select tile button is clicked', () => {
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Advanced Logistics')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Explore: You may rearrange all tiles in your construction zone (including turning them over).')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Designer Species, Ultd.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Genes (green) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);

                    fireEvent.click(queryAllByText('Select Tile')[0]);

                    expect(within(explorePopup).queryByText('Advanced Logistics')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Explore: You may rearrange all tiles in your construction zone (including turning them over).')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Designer Species, Ultd.')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Genes (green) good on this world when you place it.')).toBeFalsy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(0);
                });

                it('should remove the tile choice when second select tile button is clicked', () => {
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    const explorePopup = getByTestId('explore-popup');
                    const dieToDrag = within(explorePopup).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(scoutBox);
                    fireEvent.drop(scoutBox);
                    fireEvent.click(getByText('Send Scout'));

                    expect(within(explorePopup).queryByText('Advanced Logistics')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Explore: You may rearrange all tiles in your construction zone (including turning them over).')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Designer Species, Ultd.')).toBeTruthy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Genes (green) good on this world when you place it.')).toBeTruthy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(2);

                    fireEvent.click(queryAllByText('Select Tile')[1]);

                    expect(within(explorePopup).queryByText('Advanced Logistics')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Explore: You may rearrange all tiles in your construction zone (including turning them over).')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Designer Species, Ultd.')).toBeFalsy();
                    expect(within(explorePopup).queryByText('Bonus: Gain $1 and a Genes (green) good on this world when you place it.')).toBeFalsy();
                    expect(within(explorePopup).queryAllByText('Select Tile').length).toBe(0);
                });
            });

            describe('Stocking', () => {
                it('should display the get credits button when a die is dragged to the stock box', () => {
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(stockBox);
                    fireEvent.drop(stockBox);

                    expect(within(stockBox).queryByText('Get Credits')).toBeTruthy();
                });

                it('should send the die to the player\'s citizenry and add two credits to the player\'s total credits when the get credits button is clicked', () => {
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
                    fireEvent.dragStart(dieToDrag);
                    fireEvent.dragOver(stockBox);
                    fireEvent.drop(stockBox);
                    const startingCredits = parseInt(getByTestId('credits'));
                    const citizenry = getByTestId('citizenry');
                    const beforeNumberOfWhiteDiceInCitizenry = within(citizenry).getAllByTestId('WhiteDie').length;
                    fireEvent.click(within(stockBox).getByText('Get Credits'));
                    const afterNumberOfWhiteDiceInCitizenry = within(citizenry).getAllByTestId('WhiteDie').length;


                    expect(afterNumberOfWhiteDiceInCitizenry).toBe(beforeNumberOfWhiteDiceInCitizenry + 1);
                    expect(parseInt(getByTestId('credits'))).toBe(startingCredits + 2);
                });
            });

            describe('Ending Explore Phase', () => {
                it('should end the explore phase if there are no actions left to perform and the close button is clicked', () => {
                    let dieToDrag, numberOfUnassignedDiceBeforeDrag;
                    gameManager.chooseNextGameTiles([1, 2, 3]);
                    const { getByText, getByTestId, queryAllByTestId, queryByTestId, queryByText, queryAllByText } = render(<Game gameManager={gameManager} diceManager={diceManager} />);

                    finishAssignmentPhase(getByText, getByTestId);
                    fireEvent.click(getByText('Explore Phase'));

                    getExploreDropBoxes(getByTestId);
                    do {
                        dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
                        fireEvent.dragStart(dieToDrag);
                        fireEvent.dragOver(stockBox);
                        fireEvent.drop(stockBox);
                        numberOfUnassignedDiceBeforeDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie').length;
                    } while (numberOfUnassignedDiceBeforeDrag > 0);

                    fireEvent.click(within(stockBox).getByText('Get Credits'));
                    fireEvent.click(getByText('Close'));

                    expect(queryByText('Explore Phase')).toBeFalsy();
                });
            });
        });
    });
});
