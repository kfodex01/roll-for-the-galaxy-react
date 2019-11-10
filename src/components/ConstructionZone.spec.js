import React from 'react';
import ConstructionZone from './ConstructionZone';
import Chance from 'chance';
import { initialState } from "../enums";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const chance = new Chance();

describe('ConstructionZone', () => {
    let expectedDevelopBuildQueue, expectedSettleBuildQueue;

    beforeEach(() => {
        expectedDevelopBuildQueue = chance.pickset(initialState.game.gameTiles, chance.d6());
        expectedSettleBuildQueue = chance.pickset(initialState.game.gameTiles, chance.d6());
    });

    afterEach(cleanup);

    describe('Development Stack', () => {
        it('should render only the points and text of the top tile\'s development side, but not the settle side', () => {
            expectedDevelopBuildQueue = [
                {
                    tileId: 10000,
                    tiles: [
                        {
                            points: 2001,
                            name: 'ima dev tile',
                            tileType: 'Development'
                        },
                        {
                            points: 2002,
                            name: 'ima settle tile',
                            tileType: 'Blue World'
                        }
                    ]
                },
                {
                    tileId: 10001,
                    tiles: [
                        {
                            points: 3001,
                            name: 'dev tile underneath',
                            tileType: 'Development'
                        },
                        {
                            points: 3002,
                            name: 'settle tile underneath',
                            tileType: 'Blue World'
                        }
                    ]
                }
            ];

            const { queryByText } = render(<ConstructionZone developBuildQueue={expectedDevelopBuildQueue} settleBuildQueue={expectedSettleBuildQueue} />);

            expect(queryByText('2001')).toBeTruthy();
            expect(queryByText('ima dev tile')).toBeTruthy();
            expect(queryByText('2002')).toBeFalsy();
            expect(queryByText('ima settle tile')).toBeFalsy();
            expect(queryByText('3001')).toBeFalsy();
            expect(queryByText('dev tile underneath')).toBeFalsy();
            expect(queryByText('3002')).toBeFalsy();
            expect(queryByText('settle tile underneath')).toBeFalsy();
        });

        it('should **not** render the development queue when there isn\'t one', () => {
            expectedDevelopBuildQueue = [];

            const { queryByText } = render(<ConstructionZone developBuildQueue={expectedDevelopBuildQueue} settleBuildQueue={expectedSettleBuildQueue} />);

            expect(queryByText('No tiles in development build queue')).toBeTruthy();
        });
    });

    describe('Settle Stack', () => {
        it('should render only the points and text of the top tile\'s settle side, but not the development side', () => {
            expectedSettleBuildQueue = [
                {
                    tileId: 10000,
                    tiles: [
                        {
                            points: 2001,
                            name: 'ima dev tile',
                            tileType: 'Development'
                        },
                        {
                            points: 2002,
                            name: 'ima settle tile',
                            tileType: 'Blue World'
                        }
                    ]
                },
                {
                    tileId: 10001,
                    tiles: [
                        {
                            points: 3001,
                            name: 'dev tile underneath',
                            tileType: 'Development'
                        },
                        {
                            points: 3002,
                            name: 'settle tile underneath',
                            tileType: 'Blue World'
                        }
                    ]
                }
            ];

            const { queryByText } = render(<ConstructionZone developBuildQueue={expectedDevelopBuildQueue} settleBuildQueue={expectedSettleBuildQueue} />);

            expect(queryByText('2002')).toBeTruthy();
            expect(queryByText('ima settle tile')).toBeTruthy();
            expect(queryByText('2001')).toBeFalsy();
            expect(queryByText('ima dev tile')).toBeFalsy();
            expect(queryByText('3001')).toBeFalsy();
            expect(queryByText('dev tile underneath')).toBeFalsy();
            expect(queryByText('3002')).toBeFalsy();
            expect(queryByText('settle tile underneath')).toBeFalsy();
        });

        it('should **not** render the settlement queue when there isn\'t one', () => {
            expectedSettleBuildQueue = [];

            const { queryByText } = render(<ConstructionZone developBuildQueue={expectedDevelopBuildQueue} settleBuildQueue={expectedSettleBuildQueue} />);

            expect(queryByText('No tiles in settlement build queue')).toBeTruthy();
        });
    });
});
