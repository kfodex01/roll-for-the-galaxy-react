import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssignmentPopup from './AssignmentPopup';
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

        it('should render a die of the correct color in the explore field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('explore-drop-box')).queryAllByTestId('explore-face').length).toBe(1);
        });

        it('should render a die of the correct color in the develop field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('develop-drop-box')).queryAllByTestId('develop-face').length).toBe(1);
        });

        it('should render a die of the correct color in the settle field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('settle-drop-box')).queryAllByTestId('settle-face').length).toBe(1);
        });

        it('should render a die of the correct color in the produce field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('produce-drop-box')).queryAllByTestId('produce-face').length).toBe(1);
        });

        it('should render a die of the correct color in the ship field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<Popup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('ship-drop-box')).queryAllByTestId('ship-face').length).toBe(1);
        });

        it('should render a die of the correct color in the wild field', () => {
            mockPhaseStripDicePool.dice[0].face = dieFace.WILD;

            console.log('closePopup', mockClosePopupEvent);
            console.log('mockPhaseStripDicePool', mockPhaseStripDicePool);

            const { queryByTestId, queryAllByTestId } = render(<AssignmentPopup closePopup={mockClosePopupEvent} phaseStripDicePool={mockPhaseStripDicePool} />);
            
            expect(within(queryByTestId('wild-drop-box')).queryAllByTestId('wild-face').length).toBe(1);
        });
    });
});
