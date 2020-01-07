import React from 'react';
import ExplorePopup from './ExplorePopup';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import { getDragEvent } from './utils/drag-event-utility';

jest.mock('./utils/drag-event-utility');

describe('ExplorePopup', () => {
    let mockDataTransferData,
        mockExplorePhase,
        mockModifyExplorePhase,
        scoutBox,
        unassignedBox,
        stockBox;

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

    const getExploreDropBoxes = (getByTestId) => {
        scoutBox = getByTestId('scout-box');
        unassignedBox = getByTestId('unassigned-box');
        stockBox = getByTestId('stock-box');
    };

    beforeEach(() => {
        getDragEvent.mockReturnValue(mockDragEvent);
        mockDataTransferData = {};
        mockModifyExplorePhase = jest.fn();
    });

    afterEach(() => {
        cleanup();
    });

    it('should allow a player to move a die from the unassigned pool to the scout pool when the scout pool is empty', () => {
        mockExplorePhase = {
            scoutPool: {
                dice: []
            },
            stockPool: {
                dice: []
            },
            tiles: [],
            unassignedPool: {
                dice: [
                    {
                        color: "White",
                        face: "Explore",
                        id: "0"
                    },
                    {
                        color: "White",
                        face: "Explore",
                        id: "1"
                    }
                ]
            }
        };
        const { getByTestId } = render(<ExplorePopup explorePhase={mockExplorePhase} modifyExplorePhase={mockModifyExplorePhase} />);
        getExploreDropBoxes(getByTestId);

        let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
        fireEvent.dragStart(dieToDrag);
        fireEvent.dragOver(scoutBox);
        fireEvent.drop(scoutBox);

        expect(mockModifyExplorePhase.mock.calls.length).toBe(1);
        expect(mockModifyExplorePhase.mock.calls[0][0]).toStrictEqual(
            {
                "scoutPool": {
                    "dice": [
                        {
                            "color": "White",
                            "face": "Explore",
                            "id": "0"
                        }
                    ]
                },
                "stockPool": {
                    "dice": []
                },
                "tiles": [],
                "unassignedPool": {
                    "dice": [
                        {
                            "color": "White",
                            "face": "Explore",
                            "id": "1"
                        }
                    ]
                }
            }
        );
    });

    it('should not allow a player to move a die from the unassigned pool to the scout pool when the scout pool has a die', () => {
        mockExplorePhase = {
            scoutPool: {
                dice: [
                    {
                        color: "White",
                        face: "Explore",
                        id: "0"
                    }
                ]
            },
            stockPool: {
                dice: []
            },
            tiles: [],
            unassignedPool: {
                dice: [
                    {
                        color: "White",
                        face: "Explore",
                        id: "1"
                    }
                ]
            }
        };
        const { getByTestId } = render(<ExplorePopup explorePhase={mockExplorePhase} modifyExplorePhase={mockModifyExplorePhase} />);
        getExploreDropBoxes(getByTestId);

        let dieToDrag = within(getByTestId('unassigned-box')).queryAllByTestId('WhiteDie')[0];
        fireEvent.dragStart(dieToDrag);
        fireEvent.dragOver(scoutBox);
        fireEvent.drop(scoutBox);

        expect(mockModifyExplorePhase.mock.calls.length).toBe(1);
        expect(mockModifyExplorePhase.mock.calls[0][0]).toStrictEqual(
            {
                "scoutPool": {
                    "dice": [
                        {
                            "color": "White",
                            "face": "Explore",
                            "id": "0"
                        }
                    ]
                },
                "stockPool": {
                    "dice": []
                },
                "tiles": [],
                "unassignedPool": {
                    "dice": [
                        {
                            "color": "White",
                            "face": "Explore",
                            "id": "1"
                        }
                    ]
                }
            }
        );
    });
});
