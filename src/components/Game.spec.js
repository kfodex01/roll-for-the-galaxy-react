import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';
import {initialGameState} from '../enums';

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

    afterEach(cleanup);

    describe('Setup', () => {
        it('should display the start form', () => {
            const {queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            expect(queryByTestId('start-form')).toBeTruthy();
        });

        it('should hide the start form, create a victory point pool with 12 points, and create 1 player', () => {
            const {queryByText, queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            getButtons(queryByText);
            fireEvent.click(playerOneButton);
            const playerBoards = queryByTestId('player-boards');

            expect(queryByTestId('start-form')).toBeFalsy();
            expect(queryByText('Victory Point Pool: 12')).toBeTruthy();
            expect(playerBoards).toBeTruthy();
            expect(playerBoards.children.length).toBe(1);
        });

        it('should hide the start form, create a victory point pool with 24 points, and create 2 players', () => {
            const {queryByText, queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            getButtons(queryByText);
            fireEvent.click(playerTwoButton);
            const playerBoards = queryByTestId('player-boards');

            expect(queryByTestId('start-form')).toBeFalsy();
            expect(queryByText('Victory Point Pool: 24')).toBeTruthy();
            expect(playerBoards).toBeTruthy();
            expect(playerBoards.children.length).toBe(2);
        });

        it('should hide the start form, create a victory point pool with 36 points, and create 3 players', () => {
            const {queryByText, queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            getButtons(queryByText);
            fireEvent.click(playerThreeButton);
            const playerBoards = queryByTestId('player-boards');

            expect(queryByTestId('start-form')).toBeFalsy();
            expect(queryByText('Victory Point Pool: 36')).toBeTruthy();
            expect(playerBoards).toBeTruthy();
            expect(playerBoards.children.length).toBe(3);
        });

        it('should hide the start form, create a victory point pool with 48 points, and create 4 players', () => {
            const {queryByText, queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            getButtons(queryByText);
            fireEvent.click(playerFourButton);
            const playerBoards = queryByTestId('player-boards');

            expect(queryByTestId('start-form')).toBeFalsy();
            expect(queryByText('Victory Point Pool: 48')).toBeTruthy();
            expect(playerBoards).toBeTruthy();
            expect(playerBoards.children.length).toBe(4);
        });

        it('should hide the start form, create a victory point pool with 60 points, and create 5 players', () => {
            const {queryByText, queryByTestId} = render(<Game initialGameState={{...initialGameState}} />);

            getButtons(queryByText);
            fireEvent.click(playerFiveButton);
            const playerBoards = queryByTestId('player-boards');

            expect(queryByTestId('start-form')).toBeFalsy();
            expect(queryByText('Victory Point Pool: 60')).toBeTruthy();
            expect(playerBoards).toBeTruthy();
            expect(playerBoards.children.length).toBe(5);
        });
    });
});
