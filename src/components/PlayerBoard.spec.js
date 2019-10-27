import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chance from 'chance';
import {dieColors, initialGameState, phases} from "../enums";
import PlayerBoard from "./PlayerBoard";

const chance = new Chance();

describe('PlayerBoard', () => {
    let playerState,
        factionTile,
        homeWorldTile;

    factionTile = chance.pickone(initialGameState.factionTiles);
    homeWorldTile = chance.pickone(initialGameState.homeWorldTiles);

    playerState = {
        citizenry: chance.unique(() => {
            return ({
                color: dieColors.WHITE,
                value: phases.EXPLORE
            });
        }, chance.d6(), null),
        credits: chance.integer({min: 1, max: 10}),
        cup: chance.unique(() => {
            return ({
                color: dieColors.WHITE,
                value: phases.EXPLORE
            });
        }, chance.d6(), null),
        developBuildQueue: chance.pickset(initialGameState.gameTiles, chance.d6()),
        id: chance.integer({min: 1, max: 5}),
        nextTileId: chance.integer({min: 1, max: 20}),
        phasePowers: {
            [phases.ASSIGNMENT]: [],
            [phases.EXPLORE]: [],
            [phases.DEVELOP]: [],
            [phases.SETTLE]: [],
            [phases.PRODUCE]: [],
            [phases.SHIP]: [],
            [phases.ENDGAME]: []
        },
        points: chance.integer({min: 0, max: 100}),
        settleBuildQueue: chance.pickset(initialGameState.gameTiles, chance.d6()),
        tiles: [
            {
                ...factionTile.tiles[0],
                tileId: 1
            },
            {
                ...factionTile.tiles[1],
                tileId: 2
            },
            {
                ...homeWorldTile.tile,
                tileId: 3
            }
        ]
    };

    afterEach(cleanup);

    describe('Setup', () => {
        it('should render points image and display correct number of points', () => {
            playerState.points = 7;

            const {getByTestId} = render(<PlayerBoard {...playerState} />);
            const points = getByTestId('points');

            expect(getByTestId('points-icon')).toBeTruthy();
            expect(points).toBeTruthy();
            expect(points.textContent).toBe('7');
        });
    });
});
