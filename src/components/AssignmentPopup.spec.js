import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssignmentPopup, { dragOverContainer, onDragStart, dropInContainer } from './AssignmentPopup';
import { getMockDie } from '../test-utilities/mock-object-generators'
import { dieFace } from '../enums';

describe('Popup', () => {
    let mockPhaseStripDicePool, closePopupEventFired = false;

    beforeEach(() => {
        mockPhaseStripDicePool = {
            dice: [
                getMockDie()
            ]
        };
        mockPhaseStripDicePool.dice[0].id = '0';
    });

    afterEach(() => {
        cleanup();
        closePopupEventFired = false;
    });

    const mockClosePopupEvent = () => {
        closePopupEventFired = true;
    };

    describe('Setup', () => {
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

        describe('dropInContainer', () => {
            let mockAssignmentPopup, id = '0';

            const instantiateMockAssignmentPopup = (phaseStripDicePool) => {
                mockAssignmentPopup = new AssignmentPopup({
                    phaseStripDicePool,
                    closePopup: mockClosePopupEvent
                });
                mockAssignmentPopup.setStateOnThis = (state) => {
                    mockAssignmentPopup.state = {...state};
                };
                mockAssignmentPopup.sortDiceByFaceInState();
            };

            const mockDropInContainerEvent = {
                dataTransfer: {
                    getData: () => {
                        return id;
                    }
                }
            }

            describe('Explore Box', () => {
                it('should allow an explore die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the explore box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });
            });

            describe('Develop Box', () => {
                it('should not allow an explore die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should allow a develop die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the develop box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });
            });

            describe('Settle Box', () => {
                it('should not allow an explore die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should allow a settle die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the settle box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SETTLE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });
            });

            describe('Produce Box', () => {
                it('should not allow an explore die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should allow a produce die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the produce box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });
            });

            describe('Ship Box', () => {
                it('should not allow an explore die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should allow a ship die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the ship box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.SHIP, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });
            });

            describe('Wild Box', () => {
                it('should not allow an explore die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the wild box', () => {
                    mockPhaseStripDicePool.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseStripDicePool);

                    dropInContainer(mockDropInContainerEvent, dieFace.WILD, mockAssignmentPopup);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(1);
                });
            });
        });
    });
});
