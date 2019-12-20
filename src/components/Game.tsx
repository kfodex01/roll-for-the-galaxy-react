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
import GameManager from './utils/GameManager';
import DiceManager from './utils/DiceManager';

export interface gameState {
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
    gameManager: GameManager,
    diceManager: DiceManager
};

class Game extends React.Component<gameProps, fullState> {
    state: fullState = {
        game: {
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

    hideBeginGameForm = (): void => {
        this.setState({
            startFormVisibility: false
        });
    };

    createPlayers = (numberOfPlayers: number): void => {
        let gameState: gameState = { ...this.state.game };
        const game = createPlayers(this.props.gameManager, gameState, numberOfPlayers);
        this.setState({ game });
    };

    toggleAssignmentPopup = (): void => {
        let state: fullState = { ...this.state };
        const gameWithRolledDice = rollHumanPlayerDice(state.game, this.props.diceManager);
        this.setState({ assignmentPopupVisibility: !state.assignmentPopupVisibility, game: gameWithRolledDice });
    };

    toggleExplorePopup = (): void => {
        let state: fullState = { ...this.state };
        this.setState({ explorePopupVisibility: !state.explorePopupVisibility });
    };

    assignDice = (pickedPhase: string): void => {
        let state = { ...this.state };
        state = finishAssignmentPhase(state, pickedPhase, this.props.diceManager);
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
        let pickedTile: Tiles = this.props.gameManager.popRandomGameTile();
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
