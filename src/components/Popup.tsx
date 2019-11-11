import React from 'react';
import styled from 'styled-components';
import { BigText, FlexMaxRowDiv, FlexDropBoxRowDiv, DropBoxDiv } from '../styled-components';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    closePopup(): void;
};

export class Popup extends React.Component<PopupProps> {
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
                        <DropBoxDiv data-testid='explore-drop-box'>Explore</DropBoxDiv>
                        <DropBoxDiv data-testid='develop-drop-box'>Develop</DropBoxDiv>
                        <DropBoxDiv data-testid='settle-drop-box'>Settle</DropBoxDiv>
                        <DropBoxDiv data-testid='produce-drop-box'>Produce</DropBoxDiv>
                        <DropBoxDiv data-testid='ship-drop-box'>Ship</DropBoxDiv>
                    </FlexDropBoxRowDiv>
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    }
}
