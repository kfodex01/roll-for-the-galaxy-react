import React from 'react';
import styled from 'styled-components';
import { BigText, FlexMaxRowDiv, FlexDropBoxRowDiv, DropBoxDiv, FlexRowDiv } from '../styled-components';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DicePoolProps } from './DicePool';
import Die, { DieProps } from './Die';
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
    dice: DicePoolProps
};

interface state {
    rolledDice: DicePoolProps,
    exploreDice: DicePoolProps,
    developDice: DicePoolProps,
    settleDice: DicePoolProps,
    produceDice: DicePoolProps,
    shipDice: DicePoolProps,
    wildDice: DicePoolProps
}

export class Popup extends React.Component<popupProps, state> {
    state: state = {
        rolledDice: this.props.dice,
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
        }
    }

    // getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<JSX.Element> => {
    //     let diceOfCorrectFace: Array<DieProps> = dice.filter((die: DieProps) => {
    //         return die.face === dieFace;
    //     });

        // return diceOfCorrectFace.map((die: DieProps, id: number) => {
        //     return (<Die key={id} color={die.color} face={die.face} />);
        // })
    // }

    getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<DieProps> => {
        return dice.filter((die: DieProps) => {
            return die.face === dieFace;
        });
    }

    displayDice = (dicePool: DicePoolProps): Array<JSX.Element> => {
        return dicePool.dice.map((die: DieProps, id: number) => {
            return (<Die key={id} color={die.color} face={die.face} />);
        })
    }

    componentDidMount() {
        const newState: state = {
            rolledDice: this.state.rolledDice,
            exploreDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.EXPLORE)
            },
            developDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.DEVELOP)
            },
            settleDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.SETTLE)
            },
            produceDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.PRODUCE)
            },
            shipDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.SHIP)
            },
            wildDice: {
                dice: this.getDiceOfOneFace(this.state.rolledDice.dice, dieFace.WILD)
            }
        }

        this.setState({
            ...newState
        });
    }

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
                        <DropBoxDiv data-testid='explore-drop-box'>
                            {'Explore'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.exploreDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='develop-drop-box'>
                            {'Develop'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.developDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='settle-drop-box'>
                            {'Settle'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.settleDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='produce-drop-box'>
                            {'Produce'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.produceDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='ship-drop-box'>
                            {'Ship'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.shipDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                    </FlexDropBoxRowDiv>
                    <FlexDropBoxRowDiv>
                        <DropBoxDiv>
                            {'Wild'}
                            <FlexRowDiv>
                                {this.displayDice(this.state.wildDice)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv>Re-Assign</DropBoxDiv>
                    </FlexDropBoxRowDiv>
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    }
}
