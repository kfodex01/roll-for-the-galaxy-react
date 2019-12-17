import React from 'react';
import StartForm from './StartForm';
import { BigText, FlexColumnDiv } from '../styled-components';
import PlayerBoard, { PlayerBoardProps } from './PlayerBoard';
import { PhaseDice } from './PhaseDice';
import { Tiles } from './ConstructionZone';
import AssignmentPopup from './AssignmentPopup';
import ExplorePopup from './ExplorePopup';
import { rollHumanPlayerDice, createPlayers, finishAssignmentPhase } from './utils/game-utilities';
import { DicePoolProps } from './DicePool';
import { DieProps } from './Die';
import Chance from 'chance';

const chance = new Chance();

export interface gameState {
    factionTiles: Array<Tiles>,
    gameTiles: Array<Tiles>,
    homeWorldTiles: Array<Tiles>,
    players: Array<PlayerBoardProps>,
    victoryPointPool: number
}

export interface fullState {
    game: gameState,
    startFormVisibility: boolean,
    assignmentPopupVisibility: boolean,
    explorePopupVisibility: boolean,
    currentPhase: string,
    pickedPhases: {
        explore: boolean,
        develop: boolean,
        settle: boolean,
        produce: boolean,
        ship: boolean
    }
};

interface gameProps {
    initialState: fullState
};

class Game extends React.Component<gameProps, fullState> {
    state: fullState = {
        game: {
            factionTiles: [],
            gameTiles: [],
            homeWorldTiles: [],
            victoryPointPool: 0,
            players: []
        },
        startFormVisibility: true,
        assignmentPopupVisibility: false,
        explorePopupVisibility: false,
        currentPhase: 'Start Round',
        pickedPhases: {
            explore: false,
            develop: false,
            settle: false,
            produce: false,
            ship: false
        }
    };

    componentDidMount() {
        this.setState({
            ...this.props.initialState
        });
    };

    hideBeginGameForm = (): void => {
        this.setState({
            startFormVisibility: false
        });
    };

    createPlayers = (numberOfPlayers: number): void => {
        let gameState: gameState = { ...this.state.game };
        const game = createPlayers(gameState, numberOfPlayers);
        this.setState({ game });
    };

    toggleAssignmentPopup = (): void => {
        let state: fullState = { ...this.state };
        const gameWithRolledDice = rollHumanPlayerDice(state.game);
        this.setState({ assignmentPopupVisibility: !state.assignmentPopupVisibility, game: gameWithRolledDice });
    };

    toggleExplorePopup = (): void => {
        let state: fullState = { ...this.state };
        this.setState({ explorePopupVisibility: !state.explorePopupVisibility });
    };

    assignDice = (pickedPhase: string): void => {
        let state = { ...this.state };
        state = finishAssignmentPhase(state, pickedPhase);
        this.setState({
            ...state
        });
    };

    assignDiceToStock = (dicePool: DicePoolProps): void => {
        let state: fullState = { ...this.state };
        state.game.players[0].credits = state.game.players[0].credits + (dicePool.dice.length * 2);
        state.game.players[0].citizenry.dice = state.game.players[0].citizenry.dice.concat(dicePool.dice);
        this.setState({ ...state });
    };

    assignDieToScout = (die: DieProps): Tiles => {
        let state: fullState = { ...this.state };
        let pickedTile: Tiles = chance.pickone(state.game.gameTiles);
        state.game.gameTiles = state.game.gameTiles.filter((tile: Tiles) => tile !== pickedTile);
        state.game.players[0].citizenry.dice.push(die);
        this.setState({ ...state });
        return pickedTile;
    };

    assignTileToQueue = (tile: Tiles, isDevelopmentQueue: boolean): void => {
        let state: fullState = { ...this.state };
        if (isDevelopmentQueue) {
            state.game.players[0].developBuildQueue.push(tile);
        } else {
            state.game.players[0].settleBuildQueue.push(tile);
        };
        this.setState({ ...state });
    };

    fireActionButton = () => {
        let state = { ...this.state };
        switch (state.currentPhase) {
            default:
                this.toggleAssignmentPopup();
                break;
            case 'Explore Phase':
                this.toggleExplorePopup();
                break;
        };
    };

    render() {
        return (
            <>
                {
                    this.state.startFormVisibility === true ?
                        (
                            <StartForm hideBeginGameForm={this.hideBeginGameForm} createPlayers={this.createPlayers} />
                        ) :
                        <>
                            <BigText>Victory Point Pool: {this.state.game.victoryPointPool}</BigText>
                            <button onClick={this.fireActionButton} >{this.state.currentPhase}</button>
                            <PhaseDice {...this.state.pickedPhases}></PhaseDice>
                            <FlexColumnDiv data-testid='player-boards'>
                                {this.state.game.players.map((player: PlayerBoardProps) => {
                                    return (
                                        <PlayerBoard key={player.id} {...player} />
                                    );
                                })}
                            </FlexColumnDiv>
                        </>
                }
                {
                    this.state.assignmentPopupVisibility === true ?
                        (
                            <AssignmentPopup closePopup={this.toggleAssignmentPopup} assignDice={this.assignDice} initialState={this.state.game.players[0].phaseDice} />
                        ) : null
                }
                {
                    this.state.explorePopupVisibility === true ?
                        (
                            <ExplorePopup
                                closePopup={this.toggleExplorePopup}
                                exploreDice={this.state.game.players[0].phaseDice.exploreDice}
                                assignDiceToStock={this.assignDiceToStock}
                                assignDieToScout={this.assignDieToScout}
                                assignTileToQueue={this.assignTileToQueue}
                            />
                        ) : null
                }
            </>
        );
    };
};

export default Game;
