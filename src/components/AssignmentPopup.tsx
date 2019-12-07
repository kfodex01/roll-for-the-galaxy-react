import React from 'react';
import styled from 'styled-components';
import { BigText, FlexMaxRowDiv, FlexDropBoxRowDiv, DropBoxDiv, FlexRowDiv } from '../styled-components';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DicePool, { DicePoolProps } from './DicePool';
import { DieProps } from './Die';
import { dieFace } from '../enums';
import { getDragEvent } from './utils/drag-event-utility';

const PopupFullPageCoverDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`;

const PopupOnlyDiv = styled.div`
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    padding: 5px;
    background: white;
`;

interface AssignmentPopupProps {
    closePopup(): void,
    assignDice(pickedPhase: string, assignmentState: AssignmentState): void,
    initialState: AssignmentState
};

export interface AssignmentState {
    exploreDice: DicePoolProps,
    developDice: DicePoolProps,
    settleDice: DicePoolProps,
    produceDice: DicePoolProps,
    shipDice: DicePoolProps,
    wildDice: DicePoolProps,
    selectorDice: DicePoolProps
}

class AssignmentPopup extends React.Component<AssignmentPopupProps, AssignmentState> {
    state: AssignmentState = {
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
            dice: []
        }
    }

    onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.dataTransfer.setData('id', id);
    }

    dragOverContainer = (event: React.DragEvent<HTMLDivElement>): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.preventDefault();
    };

    findDie = (state: AssignmentState, id: string): DieProps => {
        let die: DieProps[] = [];
        die.push(state.exploreDice.dice.filter(die => die.id === id)[0]);
        die.push(state.developDice.dice.filter(die => die.id === id)[0]);
        die.push(state.settleDice.dice.filter(die => die.id === id)[0]);
        die.push(state.produceDice.dice.filter(die => die.id === id)[0]);
        die.push(state.shipDice.dice.filter(die => die.id === id)[0]);
        die.push(state.wildDice.dice.filter(die => die.id === id)[0]);
        die.push(state.selectorDice.dice.filter(die => die.id === id)[0]);
        return die.filter(die => die)[0];
    };

    dropInContainer = (event: React.DragEvent<HTMLDivElement>, containerToDropIn: string): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        let id: string = dragEvent.dataTransfer.getData('id');
        let state: AssignmentState = { ...this.state };
        let die: DieProps = this.findDie(state, id);
        state.exploreDice.dice = state.exploreDice.dice.filter(die => die.id !== id);
        state.developDice.dice = state.developDice.dice.filter(die => die.id !== id);
        state.settleDice.dice = state.settleDice.dice.filter(die => die.id !== id);
        state.produceDice.dice = state.produceDice.dice.filter(die => die.id !== id);
        state.shipDice.dice = state.shipDice.dice.filter(die => die.id !== id);
        state.wildDice.dice = state.wildDice.dice.filter(die => die.id !== id);
        state.selectorDice.dice = state.selectorDice.dice.filter(die => die.id !== id);
        switch (containerToDropIn) {
            case dieFace.EXPLORE:
                if (die.face === dieFace.EXPLORE || die.face === dieFace.WILD) {
                    state.exploreDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            case dieFace.DEVELOP:
                if (die.face === dieFace.DEVELOP || die.face === dieFace.WILD) {
                    state.developDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            case dieFace.SETTLE:
                if (die.face === dieFace.SETTLE || die.face === dieFace.WILD) {
                    state.settleDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            case dieFace.PRODUCE:
                if (die.face === dieFace.PRODUCE || die.face === dieFace.WILD) {
                    state.produceDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            case dieFace.SHIP:
                if (die.face === dieFace.SHIP || die.face === dieFace.WILD) {
                    state.shipDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            case dieFace.WILD:
                if (die.face === dieFace.WILD) {
                    state.wildDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            default:
                if (state.selectorDice.dice.length === 0) {
                    state.selectorDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
        };
        this.setStateOnThis(state);
    };

    componentDidMount() {
        this.setStateOnThis(this.props.initialState);
    }

    pushDieBackToDefaultPool = (state: AssignmentState, die: DieProps): void => {
        switch (die.face) {
            case dieFace.EXPLORE:
                state.exploreDice.dice.push(die);
                break;
            case dieFace.DEVELOP:
                state.developDice.dice.push(die);
                break;
            case dieFace.SETTLE:
                state.settleDice.dice.push(die);
                break;
            case dieFace.PRODUCE:
                state.produceDice.dice.push(die);
                break;
            case dieFace.SHIP:
                state.shipDice.dice.push(die);
                break;
            case dieFace.WILD:
                state.wildDice.dice.push(die);
                break;
        }
    }

    submitPhaseStrip = (pickedPhase: string): void => {
        if (this.state.wildDice.dice.length > 0) {
            return;
        }
        let state: AssignmentState = this.state;
        let selectorDie: DieProps | undefined = state.selectorDice.dice.pop();
        if (selectorDie) {
            switch (pickedPhase) {
                case dieFace.EXPLORE:
                    state.exploreDice.dice.push(selectorDie);
                    break;
                case dieFace.DEVELOP:
                    state.developDice.dice.push(selectorDie);
                    break;
                case dieFace.SETTLE:
                    state.settleDice.dice.push(selectorDie);
                    break;
                case dieFace.PRODUCE:
                    state.produceDice.dice.push(selectorDie);
                    break;
                case dieFace.SHIP:
                    state.shipDice.dice.push(selectorDie);
                    break;
            }
        } else {
            return;
        }

        this.props.assignDice(pickedPhase, state);
        this.props.closePopup();
    }

    setStateOnThis = (state: AssignmentState): void => {
        this.setState({
            ...state
        });
    }

    render() {
        return (
            <PopupFullPageCoverDiv>
                <PopupOnlyDiv data-testid='assignment-popup'>
                    <FlexMaxRowDiv>
                        <BigText>Assignment Phase</BigText>
                        <button onClick={this.props.closePopup}>
                            <div>
                                {'Close '}
                                <FontAwesomeIcon icon={faTimesCircle} size='1x' />
                            </div>
                        </button>
                    </FlexMaxRowDiv>
                    <FlexDropBoxRowDiv>
                        <DropBoxDiv
                            data-testid='phase-picker-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, "Selector")}>
                            {'Selector'}
                            <FlexRowDiv>
                                <DicePool {...this.state.selectorDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv
                            data-testid='explore-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.EXPLORE)}>
                            {'Explore'}
                            <FlexRowDiv>
                                <DicePool {...this.state.exploreDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='develop-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.DEVELOP)}>
                            {'Develop'}
                            <FlexRowDiv>
                                <DicePool {...this.state.developDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='settle-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.SETTLE)}>
                            {'Settle'}
                            <FlexRowDiv>
                                <DicePool {...this.state.settleDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='produce-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.PRODUCE)}>
                            {'Produce'}
                            <FlexRowDiv>
                                <DicePool {...this.state.produceDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='ship-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.SHIP)}>
                            {'Ship'}
                            <FlexRowDiv>
                                <DicePool {...this.state.shipDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='wild-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.WILD)}>
                            {'Wild'}
                            <FlexRowDiv>
                                <DicePool {...this.state.wildDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='reassign-drop-box'>
                            {'Re-Assign'}
                        </DropBoxDiv>
                    </FlexDropBoxRowDiv>
                    <div>
                        <button onClick={() => this.submitPhaseStrip(dieFace.EXPLORE)}>{'Pick Explore'}</button>
                        <button onClick={() => this.submitPhaseStrip(dieFace.DEVELOP)}>{'Pick Develop'}</button>
                        <button onClick={() => this.submitPhaseStrip(dieFace.SETTLE)}>{'Pick Settle'}</button>
                        <button onClick={() => this.submitPhaseStrip(dieFace.PRODUCE)}>{'Pick Produce'}</button>
                        <button onClick={() => this.submitPhaseStrip(dieFace.SHIP)}>{'Pick Ship'}</button>
                    </div>
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    }
}

export default AssignmentPopup;
