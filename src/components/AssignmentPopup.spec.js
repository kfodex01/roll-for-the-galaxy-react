import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssignmentPopup, { dragOverContainer, onDragStart } from './AssignmentPopup';
import { getMockDie } from '../test-utilities/mock-object-generators'
import { dieFace } from '../enums';

describe('Popup', () => {
    let closePopupEventFired = false;

    afterEach(() => {
        cleanup();
        closePopupEventFired = false;
    });

    const mockClosePopupEvent = () => {
        closePopupEventFired = true;
    };

    describe('Setup', () => {
        let mockPhaseStripDicePool;

        beforeEach(() => {
            mockPhaseStripDicePool = {
                dice: [
                    getMockDie()
                ]
            };
        });

        it('should only render a die in the explore field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(1);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the develop field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(1);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the settle field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(1); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the produce field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(1);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die in the ship field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(1);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(0);
        });

        it('should only render a die of in the wild field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.WILD;

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(0);
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(0);
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(0); 
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(0);
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(0);
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(1);
        });

        it('should fire a close event when the close button is clicked', () => {
            const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);

            expect(closePopupEventFired).toBe(false);
            fireEvent.click(getByText('Close'));

            expect(closePopupEventFired).toBe(true);
        });
    });

    describe('Drag methods', () => {
        describe('onDragStart', () => {
            it('should store the id in the dataTransfer of the event', () => {
                let mockData = {};
                const id = '7';
                const mockOnDragStartEvent = {
                    dataTransfer: {
                        setData: (key, value) => {
                            mockData = {
                                [key]: value
                            }
                        }
                    }
                }

                onDragStart(mockOnDragStartEvent, id);

                expect(mockData.id).toEqual(id);
            });
        });

        describe('dragOverContainer', () => {
            it('should prevent default on event', () => {
                let eventFired = false;
                const mockDragOverEvent = {
                    preventDefault: () => {
                        eventFired = true;
                    }
                };

                dragOverContainer(mockDragOverEvent);

                expect(eventFired).toBe(true);
            });
        });
    });
});
