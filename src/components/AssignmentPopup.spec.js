import React from 'react';
import { render, fireEvent, cleanup, within, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssignmentPopup from './AssignmentPopup';
import { getMockDie } from '../test-utilities/mock-object-generators'
import { dieFace, dieColor } from '../enums';
import { getDragEvent } from './utils/drag-event-utility';

jest.mock('./utils/drag-event-utility');

describe('AssignmentPopup', () => {
    let mockPhaseDice, phaseDiceResult, closePopupEventFired = false;

    const mockModifyPhaseDice = (phaseDice) => {
        phaseDiceResult = phaseDice;
    };

    beforeEach(() => {
        mockPhaseDice = {
            exploreDice: {
                dice: []
            },
            developDice: {
                dice: []
            },
            settleDice: {
                dice: []
            },
            produceDice: {
                dice: []
            },
            shipDice: {
                dice: []
            },
            wildDice: {
                dice: []
            },
            selectorDice: {
                dice: [getMockDie()]
            },
            phaseDiceRolled: true
        };
        mockPhaseDice.selectorDice.dice[0].id = '0';
        phaseDiceResult = undefined;
    });

    afterEach(() => {
        cleanup();
        closePopupEventFired = false;
    });

    const mockClosePopupEvent = () => {
        closePopupEventFired = true;
    };

    describe('Setup', () => {
        it('should fire a close event when the close button is clicked', () => {
            const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

            expect(closePopupEventFired).toBe(false);
            fireEvent.click(getByText('Close'));

            expect(closePopupEventFired).toBe(true);
        });
    });

    describe('Drag and Drop', () => {
        let mockDataTransferData,
        exploreBox,
        developBox,
        settleBox,
        produceBox,
        shipBox,
        wildBox,
        phasePickerBox;

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

        const getDropBoxes = (getByTestId) => {
            exploreBox = getByTestId('explore-drop-box');
            developBox = getByTestId('develop-drop-box');
            settleBox = getByTestId('settle-drop-box');
            produceBox = getByTestId('produce-drop-box');
            shipBox = getByTestId('ship-drop-box');
            wildBox = getByTestId('wild-drop-box');
            phasePickerBox = getByTestId('phase-picker-box');
        }

        beforeEach(() => {
            getDragEvent.mockReturnValue(mockDragEvent);
            mockDataTransferData = {};
        });

        describe('Explore Box', () => {
            it('should allow an explore die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should not allow a develop die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(0);
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should not allow a settle die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(0);
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should not allow a produce die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(0);
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should not allow a ship die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(0);
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the explore box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
            });
        });

        describe('Develop Box', () => {
            it('should not allow an explore die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should allow a develop die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should not allow a settle die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(0);
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should not allow a produce die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(0);
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should not allow a ship die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(0);
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the develop box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(developBox);
                fireEvent.drop(developBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
            });
        });

        describe('Settle Box', () => {
            it('should not allow an explore die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should not allow a develop die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(0);
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should allow a settle die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should not allow a produce die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(0);
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should not allow a ship die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(0);
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the settle box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(settleBox);
                fireEvent.drop(settleBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
            });
        });

        describe('Produce Box', () => {
            it('should not allow an explore die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should not allow a develop die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(0);
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should not allow a settle die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(0);
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should allow a produce die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should not allow a ship die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(0);
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the produce box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(produceBox);
                fireEvent.drop(produceBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
            });
        });

        describe('Ship Box', () => {
            it('should not allow an explore die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should not allow a develop die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(0);
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should not allow a settle die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(0);
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should not allow a produce die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(0);
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should allow a ship die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the ship box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(shipBox);
                fireEvent.drop(shipBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
            });
        });

        describe('Wild Box', () => {
            it('should not allow an explore die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(1);
            });

            it('should not allow a develop die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
                expect(phaseDiceResult.developDice.dice.length).toBe(1);
            });

            it('should not allow a settle die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
                expect(phaseDiceResult.settleDice.dice.length).toBe(1);
            });

            it('should not allow a produce die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
                expect(phaseDiceResult.produceDice.dice.length).toBe(1);
            });

            it('should not allow a ship die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(0);
                expect(phaseDiceResult.shipDice.dice.length).toBe(1);
            });

            it('should allow a wild die to be moved to the wild box', () => {
                mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(wildBox);
                fireEvent.drop(wildBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.wildDice.dice.length).toBe(1);
            });
        });

        describe('Selector Box', () => {
            it('should take die of any face when the selector box is empty', () => {
                const die = mockPhaseDice.selectorDice.dice.pop();
                die.color = dieColor.WHITE;
                mockPhaseDice.wildDice.dice.push(die);

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('WhiteDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.selectorDice.dice.length).toBe(1);
            });

            it('should reject die if the selector box contains a die', () => {
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;
                mockPhaseDice.wildDice.dice.push({
                    color: dieColor.RED,
                    face: dieFace.WILD,
                    id: '1'
                });

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                const dieToDrag = getByTestId('RedDie');
                getDropBoxes(getByTestId);
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(phasePickerBox);
                fireEvent.drop(phasePickerBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.selectorDice.dice.length).toBe(1);
                expect(phaseDiceResult.wildDice.dice.length).toBe(1);
            });
        });

        describe('Dice Finder', () => {
            it('should move the right dice when there are many dice', () => {
                mockPhaseDice.selectorDice.dice[0].color = dieColor.WHITE;
                mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                mockPhaseDice.exploreDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.EXPLORE,
                    id: '1'
                });
                mockPhaseDice.developDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.DEVELOP,
                    id: '2'
                });
                mockPhaseDice.settleDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.SETTLE,
                    id: '3'
                });
                mockPhaseDice.produceDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.PRODUCE,
                    id: '4'
                });
                mockPhaseDice.shipDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.SHIP,
                    id: '5'
                });
                mockPhaseDice.wildDice.dice.push({
                    color: dieColor.WHITE,
                    face: dieFace.WILD,
                    id: '6'
                });

                const { getByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} modifyPhaseDice={mockModifyPhaseDice} />);

                getDropBoxes(getByTestId);
                const dieToDrag = within(phasePickerBox).getByTestId('WhiteDie');
                fireEvent.dragStart(dieToDrag);
                fireEvent.dragOver(exploreBox);
                fireEvent.drop(exploreBox);

                expect(mockDragEvent.preventDefault).toBeCalled();
                expect(phaseDiceResult.selectorDice.dice.length).toBe(0);
                expect(phaseDiceResult.exploreDice.dice.length).toBe(2);
            });
        });
    });

    describe('Submit Buttons', () => {
        let assignDiceCalled,
            phasePicked,
            exploreButton,
            developButton,
            settleButton,
            produceButton,
            shipButton;

        beforeEach(() => {
            assignDiceCalled = false;
        });

        const mockAssignDice = (pickedPhase) => {
            assignDiceCalled = true;
            phasePicked = pickedPhase;
        };

        const getSubmitButtons = (getByText) => {
            exploreButton = getByText('Pick Explore');
            developButton = getByText('Pick Develop');
            settleButton = getByText('Pick Settle');
            produceButton = getByText('Pick Produce');
            shipButton = getByText('Pick Ship');
        };

        describe('Explore Button', () => {
            it('should submit with explore picked when explore button is clicked', () => {
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.EXPLORE);
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when explore button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when explore button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Develop Button', () => {
            it('should submit with develop picked when develop button is clicked', () => {
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.DEVELOP);
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when develop button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when develop button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Settle Button', () => {
            it('should submit with settle picked when settle button is clicked', () => {
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.SETTLE);
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when settle button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when settle button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Produce Button', () => {
            it('should submit with produce picked when produce button is clicked', () => {
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(produceButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.PRODUCE);
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when produce button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when produce button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(produceButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Ship Button', () => {
            it('should submit with ship picked when ship button is clicked', () => {
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(shipButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.SHIP);
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when ship button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(shipButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when ship button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseDice={mockPhaseDice} assignDice={mockAssignDice} modifyPhaseDice={mockModifyPhaseDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(shipButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });
    });
});
