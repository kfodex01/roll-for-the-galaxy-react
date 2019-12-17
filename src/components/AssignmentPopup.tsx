import React from 'react';
import {
    BigText,
    FlexMaxRowDiv,
    FlexDropBoxRowDiv,
    DropBoxDiv,
    FlexRowDiv,
    PopupFullPageCoverDiv,
    PopupOnlyDiv
} from '../styled-components';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DicePool, { DicePoolProps } from './DicePool';
import { DieProps } from './Die';
import { dieFace } from '../enums';
import { getDragEvent } from './utils/drag-event-utility';
import {
    findDieByIdInAssignmentState,
    removeDieByIdFromAssignmentState,
    moveDieToPool
} from './utils/assignment-utilities';

interface AssignmentPopupProps {
    closePopup(): void,
    assignDice(pickedPhase: string): void,
    initialState: AssignmentState
};

export interface AssignmentState {
    exploreDice: DicePoolProps,
    developDice: DicePoolProps,
    settleDice: DicePoolProps,
    produceDice: DicePoolProps,
    shipDice: DicePoolProps,
    wildDice: DicePoolProps,
    selectorDice: DicePoolProps,
    phaseDiceRolled: boolean
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
        },
        phaseDiceRolled: false
    }

    onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.dataTransfer.setData('id', id);
    }

    dragOverContainer = (event: React.DragEvent<HTMLDivElement>): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.preventDefault();
    };

    dropInContainer = (event: React.DragEvent<HTMLDivElement>, containerToDropIn: string): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        let id: string = dragEvent.dataTransfer.getData('id');
        let state: AssignmentState = { ...this.state };
        let die: DieProps = findDieByIdInAssignmentState(state, id);
        state = removeDieByIdFromAssignmentState(state, id);
        state = moveDieToPool(state, die, containerToDropIn);
        this.setState({
            ...state
        });
    };

    componentDidMount() {
        this.setState({
            ...this.props.initialState
        });
    }

    submitPhaseStrip = (pickedPhase: string): void => {
        let state: AssignmentState = {...this.state};
        if (state.wildDice.dice.length > 0) {
            return;
        }
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

        this.setState({...state});
        this.props.assignDice(pickedPhase);
        this.props.closePopup();
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
