import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssignmentPopup from './AssignmentPopup';
import { getMockDie } from '../test-utilities/mock-object-generators'
import { dieFace } from '../enums';

describe('Popup', () => {
    let mockPhaseDice, closePopupEventFired = false;

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
            }
        };
        mockPhaseDice.selectorDice.dice[0].id = '0';
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
            const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} />);

            expect(closePopupEventFired).toBe(false);
            fireEvent.click(getByText('Close'));

            expect(closePopupEventFired).toBe(true);
        });
    });

    describe('Drag Methods', () => {
        let mockAssignmentPopup, idOfDiceToDrop = '0';

        const instantiateMockAssignmentPopup = (initialState) => {
            mockAssignmentPopup = new AssignmentPopup({
                initialState,
                closePopup: mockClosePopupEvent
            });
            mockAssignmentPopup.setStateOnThis = (state) => {
                mockAssignmentPopup.state = { ...state };
            };
            mockAssignmentPopup.setStateOnThis(initialState);
        };

        const mockDropInContainerEvent = {
            dataTransfer: {
                getData: () => {
                    return idOfDiceToDrop;
                }
            }
        }

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
                instantiateMockAssignmentPopup(mockPhaseDice);

                mockAssignmentPopup.onDragStart(mockOnDragStartEvent, id);

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
                instantiateMockAssignmentPopup(mockPhaseDice);

                mockAssignmentPopup.dragOverContainer(mockDragOverEvent);

                expect(eventFired).toBe(true);
            });
        });

        describe('dropInContainer', () => {
            describe('Explore Box', () => {
                it('should allow an explore die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;

                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the explore box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.EXPLORE);

                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });
            });

            describe('Develop Box', () => {
                it('should not allow an explore die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should allow a develop die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the develop box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.DEVELOP);

                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });
            });

            describe('Settle Box', () => {
                it('should not allow an explore die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should allow a settle die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the settle box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SETTLE);

                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });
            });

            describe('Produce Box', () => {
                it('should not allow an explore die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should allow a produce die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the produce box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.PRODUCE);

                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });
            });

            describe('Ship Box', () => {
                it('should not allow an explore die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should allow a ship die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the ship box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.SHIP);

                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });
            });

            describe('Wild Box', () => {
                it('should not allow an explore die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.EXPLORE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(1);
                });

                it('should not allow a develop die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.DEVELOP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(1);
                });

                it('should not allow a settle die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SETTLE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(1);
                });

                it('should not allow a produce die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.PRODUCE;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(1);
                });

                it('should not allow a ship die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.SHIP;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(1);
                });

                it('should allow a wild die to be moved to the wild box', () => {
                    mockPhaseDice.selectorDice.dice[0].face = dieFace.WILD;
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, dieFace.WILD);

                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(1);
                });
            });

            describe('Selector Box', () => {
                it('should take die of any face when the selector box is empty', () => {
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, 'Selector');

                    expect(mockAssignmentPopup.state.selectorDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.exploreDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.developDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.settleDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.produceDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.shipDice.dice.length).toBe(0);
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(0);
                });

                it('should reject die if the selector box contains a die', () => {
                    mockPhaseDice.wildDice.dice.push(getMockDie());
                    mockPhaseDice.wildDice.dice[0].face = dieFace.WILD;
                    mockPhaseDice.wildDice.dice[0].id = '1';
                    instantiateMockAssignmentPopup(mockPhaseDice);

                    idOfDiceToDrop = '0';
                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, 'Selector');
                    idOfDiceToDrop = '1';
                    mockAssignmentPopup.dropInContainer(mockDropInContainerEvent, 'Selector');

                    expect(mockAssignmentPopup.state.selectorDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.selectorDice.dice[0].id).toBe('0');
                    expect(mockAssignmentPopup.state.wildDice.dice.length).toBe(1);
                    expect(mockAssignmentPopup.state.wildDice.dice[0].id).toBe('1');
                });
            });
        });
    });

    describe('Submit Buttons', () => {
        let assignDiceCalled,
            phasePicked,
            finalState,
            exploreButton,
            developButton,
            settleButton,
            produceButton,
            shipButton;

        beforeEach(() => {
            assignDiceCalled = false;
        });

        const mockAssignDice = (pickedPhase, assignmentState) => {
            assignDiceCalled = true;
            phasePicked = pickedPhase;
            finalState = assignmentState;
        };

        const getSubmitButtons = (getByText) => {
            exploreButton = getByText('Pick Explore');
            developButton = getByText('Pick Develop');
            settleButton = getByText('Pick Settle');
            produceButton = getByText('Pick Produce');
            shipButton = getByText('Pick Ship');
        };

        describe('Explore Button', () => {
            it('should submit with explore picked and selector die in explore pool when explore button is clicked', () => {
                mockPhaseDice.selectorDice.dice[0].id = '7';
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.EXPLORE);
                expect(finalState.selectorDice.dice.length).toBe(0);
                expect(finalState.exploreDice.dice.length).toBe(1);
                expect(finalState.exploreDice.dice[0].id).toBe('7');
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when explore button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when explore button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(exploreButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Develop Button', () => {
            it('should submit with develop picked and selector die in develop pool when develop button is clicked', () => {
                mockPhaseDice.selectorDice.dice[0].id = '7';
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.DEVELOP);
                expect(finalState.selectorDice.dice.length).toBe(0);
                expect(finalState.developDice.dice.length).toBe(1);
                expect(finalState.developDice.dice[0].id).toBe('7');
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when develop button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when develop button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(developButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Settle Button', () => {
            it('should submit with settle picked and selector die in settle pool when settle button is clicked', () => {
                mockPhaseDice.selectorDice.dice[0].id = '7';
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.SETTLE);
                expect(finalState.selectorDice.dice.length).toBe(0);
                expect(finalState.settleDice.dice.length).toBe(1);
                expect(finalState.settleDice.dice[0].id).toBe('7');
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when settle button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when settle button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Produce Button', () => {
            it('should submit with produce picked and selector die in produce pool when produce button is clicked', () => {
                mockPhaseDice.selectorDice.dice[0].id = '7';
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(produceButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.PRODUCE);
                expect(finalState.selectorDice.dice.length).toBe(0);
                expect(finalState.produceDice.dice.length).toBe(1);
                expect(finalState.produceDice.dice[0].id).toBe('7');
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when produce button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(settleButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when produce button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(produceButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });
        });

        describe('Ship Button', () => {
            it('should submit with ship picked and selector die in ship pool when ship button is clicked', () => {
                mockPhaseDice.selectorDice.dice[0].id = '7';
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(shipButton);

                expect(assignDiceCalled).toBe(true);
                expect(phasePicked).toBe(dieFace.SHIP);
                expect(finalState.selectorDice.dice.length).toBe(0);
                expect(finalState.shipDice.dice.length).toBe(1);
                expect(finalState.shipDice.dice[0].id).toBe('7');
                expect(closePopupEventFired).toBe(true);
            });

            it('should not submit with dice in wild pool when ship button is clicked', () => {
                mockPhaseDice.wildDice.dice.push(getMockDie());
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
                getSubmitButtons(getByText);
                fireEvent.click(shipButton);

                expect(assignDiceCalled).toBe(false);
                expect(closePopupEventFired).toBe(false);
            });

            it('should not submit with no selector dice when ship button is clicked', () => {
                mockPhaseDice.selectorDice.dice = [];
                const { getByText } = render(<AssignmentPopup closePopup={mockClosePopupEvent} initialState={mockPhaseDice} assignDice={mockAssignDice} />);

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
