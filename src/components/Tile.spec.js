import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tile from './Tile';
import { tileTypes, dieColor, dieFace } from '../enums';
import { getMockTile } from '../test-utilities/mock-object-generators';

describe('Tile', () => {
    let expectedTileProps;

    beforeEach(() => {
        expectedTileProps = getMockTile();
    });

    afterEach(cleanup);

    it('should render a blue world tile', () => {
        expectedTileProps.tileType = tileTypes.BLUE_WORLD;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('blue-world')).toBeTruthy();
    });

    it('should render a brown world tile', () => {
        expectedTileProps.tileType = tileTypes.BROWN_WORLD;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('brown-world')).toBeTruthy();
    });

    it('should render a development tile', () => {
        expectedTileProps.tileType = tileTypes.DEVELOPMENT;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('development')).toBeTruthy();
    });

    it('should render a gray world tile', () => {
        expectedTileProps.tileType = tileTypes.GRAY_WORLD;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('gray-world')).toBeTruthy();
    });

    it('should render a green world tile', () => {
        expectedTileProps.tileType = tileTypes.GREEN_WORLD;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('green-world')).toBeTruthy();
    });

    it('should render a yellow world tile', () => {
        expectedTileProps.tileType = tileTypes.YELLOW_WORLD;

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('yellow-world')).toBeTruthy();
    });

    it('should render an error when the tile type is invalid', () => {
        expectedTileProps.name = 'Broken Tile';
        expectedTileProps.tileType = 'WAT';

        const { getByText } = render(<Tile {...expectedTileProps} />);

        expect(getByText('Invalid tile type: WAT for tile: Broken Tile')).toBeTruthy();
    });

    it('should render a die when a dicePool is provided', () => {
        expectedTileProps.dicePool = {
            dice: [
                {
                    color: dieColor.WHITE,
                    face: dieFace.EXPLORE
                }
            ]
        };

        const { getByTestId } = render(<Tile {...expectedTileProps} />);

        expect(getByTestId('WhiteDie')).toBeTruthy();
    });
});