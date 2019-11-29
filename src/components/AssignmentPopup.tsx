import React from 'react';
import styled from 'styled-components';
import { BigText, FlexMaxRowDiv, FlexDropBoxRowDiv, DropBoxDiv, FlexRowDiv } from '../styled-components';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DicePool, { DicePoolProps } from './DicePool';
import { DieProps } from './Die';
import { dieFace } from '../enums';

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

interface popupProps {
    closePopup(): void,
    phaseStripDicePool: DicePoolProps
};

interface state {
    exploreDice: DicePoolProps,
    developDice: DicePoolProps,
    settleDice: DicePoolProps,
    produceDice: DicePoolProps,
    shipDice: DicePoolProps,
    wildDice: DicePoolProps,
    selectorDice: DicePoolProps
}

class AssignmentPopup extends React.Component<popupProps, state> {
    state: state = {
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

    getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<DieProps> => {
        return dice.filter((die: DieProps) => {
            return die.face === dieFace;
        });
    }

    componentDidMount() {
        const newState: state = {
            exploreDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.EXPLORE)
            },
            developDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.DEVELOP)
            },
            settleDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.SETTLE)
            },
            produceDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.PRODUCE)
            },
            shipDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.SHIP)
            },
            wildDice: {
                dice: this.getDiceOfOneFace(this.props.phaseStripDicePool.dice, dieFace.WILD)
            },
            selectorDice: {
                dice: []
            }
        }

        this.setState({
            ...newState
        });
    }

    onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string): void => {
        event.dataTransfer.setData('id', id);
    }

    dragOverContainer = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    pushDieBackToDefaultPool = (state: state, die: DieProps) => {
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
            default:
                break;
        }
    }

    dropInContainer = (event: React.DragEvent<HTMLDivElement>, containerToDropIn: string): void => {
        let id: string = event.dataTransfer.getData('id');
        let die: DieProps = this.props.phaseStripDicePool.dice.filter(die => die.id === id)[0];
        let state: state = { ...this.state };
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
            case "Selector":
                if (state.selectorDice.dice.length === 0) {
                    state.selectorDice.dice.push(die);
                } else {
                    this.pushDieBackToDefaultPool(state, die);
                }
                break;
            default:
                break;
        };
        this.setState(state);
    };

    render() {
        return (
            <PopupFullPageCoverDiv>
                <PopupOnlyDiv>
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
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    }
}

export default AssignmentPopup;
