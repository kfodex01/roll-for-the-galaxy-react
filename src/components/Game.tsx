import React from 'react';
import StartForm from './StartForm';
import { BigText, FlexColumnDiv } from '../styled-components';
import PlayerBoard, { PlayerBoardProps } from './PlayerBoard';
import { PhaseDice } from './PhaseDice';
import { Tiles } from './ConstructionZone';
import AssignmentPopup from './AssignmentPopup';
import { rollHumanPlayerDice, createPlayers, finishAssignmentPhase } from './utils/game-utilities';

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
        const game = createPlayers(this.state.game, numberOfPlayers);
        this.setState({ game });
    };

    toggleAssignmentPopup = (): void => {
        const gameWithRolledDice = rollHumanPlayerDice(this.state.game);
        this.setState({ assignmentPopupVisibility: !this.state.assignmentPopupVisibility, game: gameWithRolledDice });
    };

    assignDice = (pickedPhase: string): void => {
        let state = {...this.state};
        state = finishAssignmentPhase(state, pickedPhase);
        this.setState({
            ...state
        });
    };

    fireActionButton = () => {
        switch (this.state.currentPhase) {
            default:
                this.toggleAssignmentPopup();
                break;
        }
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
                    this.state.assignmentPopupVisibility === true && this.state.game.players[0].phaseDice ?
                        (
                            <AssignmentPopup closePopup={this.toggleAssignmentPopup} assignDice={this.assignDice} initialState={this.state.game.players[0].phaseDice} />
                        ) : null
                }
            </>
        )
    }
};

export default Game;
