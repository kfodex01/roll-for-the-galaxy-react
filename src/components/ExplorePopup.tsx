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
import { getDragEvent } from './utils/drag-event-utility';
import { DieProps } from './Die';
import { Tiles } from './ConstructionZone';
import Tile, { TileProps } from './Tile';
import styled from "styled-components";

const TileSideDiv = styled.div`
    background-color: #ededed;
`;

interface ExplorePopupProps {
    closePopup(): void,
    assignDiceToStock(dicePool: DicePoolProps): void,
    assignDieToScout(die: DieProps): Tiles,
    assignTileToQueue(tile: Tiles, isDevelopQueue: boolean): void,
    exploreDice: DicePoolProps
};

interface ExploreState {
    scoutPool: DicePoolProps,
    stockPool: DicePoolProps,
    unassignedPool: DicePoolProps,
    tiles: Array<Tiles>
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
        },
        tiles: Array<Tiles>()
    };

    findDieByIdInExploreState = (state: ExploreState, id: string): DieProps => {
        let die: DieProps[] = [];
        die.push(state.scoutPool.dice.filter(die => die.id === id)[0]);
        die.push(state.stockPool.dice.filter(die => die.id === id)[0]);
        die.push(state.unassignedPool.dice.filter(die => die.id === id)[0]);
        return die.filter(die => die)[0];
    }

    removeDieByIdFromExploreState = (state: ExploreState, id: string): ExploreState => {
        state.scoutPool.dice = state.scoutPool.dice.filter(die => die.id !== id);
        state.stockPool.dice = state.stockPool.dice.filter(die => die.id !== id);
        state.unassignedPool.dice = state.unassignedPool.dice.filter(die => die.id !== id);
        return state;
    };

    moveDieToPool = (state: ExploreState, die: DieProps, containerToDropIn: string): ExploreState => {
        switch (containerToDropIn) {
            default:
                state.unassignedPool.dice.push(die);
                break;
            case 'Scout':
                if (state.scoutPool.dice.length > 0) {
                    state.unassignedPool.dice.push(die);
                } else {
                    state.scoutPool.dice.push(die);
                }
                break;
            case 'Stock':
                state.stockPool.dice.push(die);
                break;
        };
        return state;
    };

    initiateStock = (): void => {
        let state = { ...this.state };
        this.props.assignDiceToStock(state.stockPool);
        state.stockPool.dice = [];
        this.setState({ ...state });
    };

    initiateScout = (): void => {
        let state = { ...this.state };
        state.tiles.push(this.props.assignDieToScout(state.scoutPool.dice[0]));
        state.scoutPool.dice = [];
        this.setState({ ...state });
    };

    initiateTileSelection = (isDevelopQueue: boolean): void => {
        let state = { ...this.state };
        this.props.assignTileToQueue(state.tiles[0], isDevelopQueue);
        state.tiles = [];
        this.setState({...state});
    };

    getListOfTilePowers = (tile: TileProps): Array<JSX.Element> => {
        let powerList: Array<JSX.Element> = [];
        if (tile.bonus) {
            powerList.push(<p>{'Bonus: '}{tile.bonus}</p>);
        };
        if (tile.assignment) {
            powerList.push(<p>{'Assignment: '}{tile.assignment}</p>);
        };
        if (tile.explore) {
            powerList.push(<p>{'Explore: '}{tile.explore}</p>);
        };
        if (tile.develop) {
            powerList.push(<p>{'Develop: '}{tile.develop}</p>);
        };
        if (tile.settle) {
            powerList.push(<p>{'Settle: '}{tile.settle}</p>);
        };
        if (tile.produce) {
            powerList.push(<p>{'Produce: '}{tile.produce}</p>);
        };
        if (tile.ship) {
            powerList.push(<p>{'Assignment: '}{tile.ship}</p>);
        };
        if (tile.endGame) {
            powerList.push(<p>{'End Game: '}{tile.endGame}</p>);
        };
        return powerList;
    };

    onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.dataTransfer.setData('id', id);
    };

    dragOverContainer = (event: React.DragEvent<HTMLDivElement>): void => {
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        dragEvent.preventDefault();
    };

    dropInContainer = (event: React.DragEvent<HTMLDivElement>, containerToDropIn: string): void => {
        let state: ExploreState = { ...this.state };
        let dragEvent: React.DragEvent<HTMLDivElement> = getDragEvent(event);
        let id: string = dragEvent.dataTransfer.getData('id');
        let die: DieProps = this.findDieByIdInExploreState(state, id);
        state = this.removeDieByIdFromExploreState(state, id);
        state = this.moveDieToPool(state, die, containerToDropIn);
        this.setState({ ...state });
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
                            {
                                this.state.scoutPool.dice.length > 0 && this.state.tiles.length === 0 ? <button onClick={this.initiateScout}>{'Send Scout'}</button> : null
                            }
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
                            {
                                this.state.stockPool.dice.length > 0 ? <button onClick={this.initiateStock}>{'Get Credits'}</button> : null
                            }
                        </DropBoxDiv>
                    </FlexDropBoxRowDiv>
                    {
                        this.state.tiles.length > 0 ?
                            <>
                                <TileSideDiv>
                                    <FlexRowDiv>
                                        <BigText>{this.state.tiles[0].tiles[0].points}</BigText>
                                        <Tile key={this.state.tiles[0].tileId} {...this.state.tiles[0].tiles[0]} />
                                    </FlexRowDiv>
                                    {this.getListOfTilePowers(this.state.tiles[0].tiles[0])}
                                    <button onClick={() => this.initiateTileSelection(true)}>Select Tile</button>
                                </TileSideDiv>
                                <BigText>{'- OR -'}</BigText>
                                <TileSideDiv>
                                    <FlexRowDiv>
                                        <BigText>{this.state.tiles[0].tiles[1].points}</BigText>
                                        <Tile key={this.state.tiles[0].tileId + 1} {...this.state.tiles[0].tiles[1]} />
                                    </FlexRowDiv>
                                    {this.getListOfTilePowers(this.state.tiles[0].tiles[1])}
                                    <button onClick={() => this.initiateTileSelection(false)}>Select Tile</button>
                                </TileSideDiv>
                            </>
                            : null
                    }
                </PopupOnlyDiv>
            </PopupFullPageCoverDiv>
        );
    };
};

export default ExplorePopup;
