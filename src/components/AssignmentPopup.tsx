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
    modifyPhaseDice(phaseDice: AssignmentState): void,
    phaseDice: AssignmentState
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

class AssignmentPopup extends React.Component<AssignmentPopupProps> {
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
        let phaseDice: AssignmentState = {...this.props.phaseDice};
        let die: DieProps = findDieByIdInAssignmentState(phaseDice, id);
        phaseDice = removeDieByIdFromAssignmentState(phaseDice, id);
        phaseDice = moveDieToPool(phaseDice, die, containerToDropIn);
        this.props.modifyPhaseDice(phaseDice);
    };

    submitPhaseStrip = (pickedPhase: string): void => {
        let phaseDice: AssignmentState = {...this.props.phaseDice};
        if (phaseDice.wildDice.dice.length > 0) {
            return;
        }
        let selectorDie: DieProps | undefined = phaseDice.selectorDice.dice.pop();
        if (selectorDie) {
            switch (pickedPhase) {
                case dieFace.EXPLORE:
                    phaseDice.exploreDice.dice.push(selectorDie);
                    break;
                case dieFace.DEVELOP:
                    phaseDice.developDice.dice.push(selectorDie);
                    break;
                case dieFace.SETTLE:
                    phaseDice.settleDice.dice.push(selectorDie);
                    break;
                case dieFace.PRODUCE:
                    phaseDice.produceDice.dice.push(selectorDie);
                    break;
                case dieFace.SHIP:
                    phaseDice.shipDice.dice.push(selectorDie);
                    break;
            }
        } else {
            return;
        }

        this.props.modifyPhaseDice(phaseDice);
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
                                <DicePool {...this.props.phaseDice.selectorDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv
                            data-testid='explore-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.EXPLORE)}>
                            {'Explore'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.exploreDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='develop-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.DEVELOP)}>
                            {'Develop'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.developDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='settle-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.SETTLE)}>
                            {'Settle'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.settleDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='produce-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.PRODUCE)}>
                            {'Produce'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.produceDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='ship-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.SHIP)}>
                            {'Ship'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.shipDice} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='wild-drop-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, dieFace.WILD)}>
                            {'Wild'}
                            <FlexRowDiv>
                                <DicePool {...this.props.phaseDice.wildDice} draggable={true} onDragStart={this.onDragStart} />
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
