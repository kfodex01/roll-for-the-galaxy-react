import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from "../../src/components/Game.js";
import {getReducers} from "../../src/reducers/combine-reducers";

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
            expect(buttonsDiv.children.length).toBe(1);
            expect(buttonsDiv.children[0].textContent).toBe('1');
        });

        describe('Button Actions', () => {
            it('should hide the begin game form when 1 player button is clicked', () => {
                const {queryByTestId} = renderWithRedux(<Game/>);

                const buttonsDiv = queryByTestId('begin-game-form-number-buttons-div');
                const playerOneButton = buttonsDiv.children[0];

                fireEvent.click(playerOneButton);

                expect(queryByTestId('begin-game-form')).toBeNull();
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
