import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StartForm from "./StartForm.js";

describe('StartForm', () => {
    let formText,
        playerOneButton,
        playerTwoButton,
        playerThreeButton,
        playerFourButton,
        playerFiveButton,
        hideBeginGameFormEventFired,
        createPlayerEventFired,
        createPlayerEventFiredEventCalledWith;

    const getFormElements = (queryByText) => {
        formText = queryByText('Please select number of players');
        playerOneButton = queryByText('1');
        playerTwoButton = queryByText('2');
        playerThreeButton = queryByText('3');
        playerFourButton = queryByText('4');
        playerFiveButton = queryByText('5');
    };

    const mockVisibilityEvent = () => {
        hideBeginGameFormEventFired = true;
    };

    const mockPlayerCreationEvent = (numberOfPlayers) => {
        createPlayerEventFired = true;
        createPlayerEventFiredEventCalledWith = numberOfPlayers;
    };

    beforeEach(() => {
        hideBeginGameFormEventFired = false;
        createPlayerEventFired = false;
        createPlayerEventFiredEventCalledWith = undefined;
    });

    afterEach(cleanup);

    it('should render the start form correctly', () => {
        const {queryByText, queryByTestId} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        expect(queryByTestId('start-form')).toBeTruthy();
        expect(formText).toBeTruthy();
        expect(playerOneButton).toBeTruthy();
        expect(playerTwoButton).toBeTruthy();
        expect(playerThreeButton).toBeTruthy();
        expect(playerFourButton).toBeTruthy();
        expect(playerFiveButton).toBeTruthy();
    });

    it('should fire both events with the correct parameters when playerOneButton is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        fireEvent.click(playerOneButton);

        expect(hideBeginGameFormEventFired).toBe(true);
        expect(createPlayerEventFired).toBe(true);
        expect(createPlayerEventFiredEventCalledWith).toBe(1);
    });

    it('should fire both events with the correct parameters when playerTwoButton is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        fireEvent.click(playerTwoButton);

        expect(hideBeginGameFormEventFired).toBe(true);
        expect(createPlayerEventFired).toBe(true);
        expect(createPlayerEventFiredEventCalledWith).toBe(2);
    });

    it('should fire both events with the correct parameters when playerThreeButton is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        fireEvent.click(playerThreeButton);

        expect(hideBeginGameFormEventFired).toBe(true);
        expect(createPlayerEventFired).toBe(true);
        expect(createPlayerEventFiredEventCalledWith).toBe(3);
    });

    it('should fire both events with the correct parameters when playerFourButton is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        fireEvent.click(playerFourButton);

        expect(hideBeginGameFormEventFired).toBe(true);
        expect(createPlayerEventFired).toBe(true);
        expect(createPlayerEventFiredEventCalledWith).toBe(4);
    });

    it('should fire both events with the correct parameters when playerFiveButton is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        fireEvent.click(playerFiveButton);

        expect(hideBeginGameFormEventFired).toBe(true);
        expect(createPlayerEventFired).toBe(true);
        expect(createPlayerEventFiredEventCalledWith).toBe(5);
    });

    it('should not fire events when no button is clicked', () => {
        const {queryByText} = render(<StartForm hideBeginGameForm={mockVisibilityEvent} createPlayers={mockPlayerCreationEvent} />);
        getFormElements(queryByText);

        expect(hideBeginGameFormEventFired).toBe(false);
        expect(createPlayerEventFired).toBe(false);
        expect(createPlayerEventFiredEventCalledWith).toBeUndefined();
    });
});
