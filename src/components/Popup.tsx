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

interface PopupProps {
    closePopup(): void,
    dice: DicePoolProps
};
export class Popup extends React.Component<PopupProps> {
    getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<JSX.Element> => {
        let diceOfCorrectFace: Array<DieProps> = dice.filter((die: DieProps) => {
            return die.face === dieFace;
        });

        return diceOfCorrectFace.map((die: DieProps, id: number) => {
            return (<Die key={id} color={die.color} face={die.face} />);
        })
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
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.EXPLORE)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='develop-drop-box'>
                            {'Develop'}
                            <FlexRowDiv>
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.DEVELOP)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='settle-drop-box'>
                            {'Settle'}
                            <FlexRowDiv>
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.SETTLE)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='produce-drop-box'>
                            {'Produce'}
                            <FlexRowDiv>
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.PRODUCE)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv data-testid='ship-drop-box'>
                            {'Ship'}
                            <FlexRowDiv>
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.SHIP)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                    </FlexDropBoxRowDiv>
                    <FlexDropBoxRowDiv>
                        <DropBoxDiv>
                            {'Wild'}
                            <FlexRowDiv>
                                {this.getDiceOfOneFace(this.props.dice.dice, dieFace.WILD)}
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv>Re-Assign</DropBoxDiv>
                    </FlexDropBoxRowDiv>
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    }
}
