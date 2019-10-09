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

afterEach(cleanup);

describe('Game', () => {
    it('should load properly', () => {
        const {getByTestId} = renderWithRedux(<Game />);

        expect(getByTestId('message').textContent).toBe('Hi');
    });

    it('changes when button is clicked', () => {
        const {getByTestId} = renderWithRedux(<Game />);
        fireEvent.click(getByTestId('button'));

        expect(getByTestId('message').textContent).toBe('Thing done');
    });

    it('can have state other than initial', () => {
        const {getByTestId} = renderWithRedux(<Game />, {initialState: {startForm: {message: "Ima different"}}});

        expect(getByTestId('message')).toHaveTextContent('Ima different');
    })
});
