import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chance from 'chance';
import Tile from './Tile';
import { tileTypes } from '../enums';

const chance = new Chance();

describe('Tile', () => {
    let expectedTileProps = {
        name: chance.word(),
        points: chance.integer({ min: 1, max: 100 }),
    };
    afterEach(cleanup);

    it('should render a blue world tile', () => {
        expectedTileProps.tileType = tileTypes.BLUE_WORLD;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('blue-world')).toBeTruthy();
    });

    it('should render a brown world tile', () => {
        expectedTileProps.tileType = tileTypes.BROWN_WORLD;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('brown-world')).toBeTruthy();
    });

    it('should render a development tile', () => {
        expectedTileProps.tileType = tileTypes.DEVELOPMENT;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('development')).toBeTruthy();
    });

    it('should render a gray world tile', () => {
        expectedTileProps.tileType = tileTypes.GRAY_WORLD;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('gray-world')).toBeTruthy();
    });

    it('should render a green world tile', () => {
        expectedTileProps.tileType = tileTypes.GREEN_WORLD;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('green-world')).toBeTruthy();
    });

    it('should render a yellow world tile', () => {
        expectedTileProps.tileType = tileTypes.YELLOW_WORLD;

        const {getByTestId} = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('yellow-world')).toBeTruthy();
    });
});