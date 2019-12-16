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

interface ExplorePopupProps {
    closePopup(): void,
    exploreDice: DicePoolProps
};

interface ExploreState {
    scoutPool: DicePoolProps,
    stockPool: DicePoolProps,
    unassignedPool: DicePoolProps
};

class ExplorePopup extends React.Component<ExplorePopupProps, ExploreState> {
    state = {
        scoutPool: {
            dice: []
        },
        stockPool: {
            dice: []
        },
        unassignedPool: {
            dice: []
        }
    };

    dragOverContainer = (event: React.DragEvent<HTMLDivElement>): void => {

    };

    dropInContainer = (event: React.DragEvent<HTMLDivElement>, containerToDropIn: string): void => {

    };

    onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string): void => {

    };
    
    componentDidMount() {
        this.setState({
            unassignedPool: this.props.exploreDice
        });
    };

    render() {
        return (
            <PopupFullPageCoverDiv>
                <PopupOnlyDiv>
                    <FlexMaxRowDiv>
                        <BigText>Explore Phase</BigText>
                        <button onClick={this.props.closePopup}>
                            <div>
                                {'Close '}
                                <FontAwesomeIcon icon={faTimesCircle} size='1x' />
                            </div>
                        </button>
                    </FlexMaxRowDiv>
                    <FlexDropBoxRowDiv>
                        <DropBoxDiv
                            data-testid='scout-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, "Scout")}>
                            {'Scout'}
                            <FlexRowDiv>
                                <DicePool {...this.state.scoutPool} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv
                            data-testid='unassigned-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, "Unassigned")}>
                            {'Unassigned'}
                            <FlexRowDiv>
                                <DicePool {...this.state.unassignedPool} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                        <DropBoxDiv
                            data-testid='stock-box'
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => this.dragOverContainer(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropInContainer(event, "Stock")}>
                            {'Stock'}
                            <FlexRowDiv>
                                <DicePool {...this.state.stockPool} draggable={true} onDragStart={this.onDragStart} />
                            </FlexRowDiv>
                        </DropBoxDiv>
                    </FlexDropBoxRowDiv>
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    };
};

export default ExplorePopup;
