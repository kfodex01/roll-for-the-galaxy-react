import React from 'react';
import StartForm from './StartForm';
import { BigText, FlexColumnDiv } from '../styled-components';
import PlayerBoard, { PhasePowersProps, PlayerBoardProps } from './PlayerBoard';
import { bonuses, dieColor, phases, dieFace } from '../enums';
import Chance from 'chance';
import { TileProps } from './Tile';
import { Tiles } from './ConstructionZone';
import { DicePoolProps } from './DicePool';
import AssignmentPopup, { AssignmentState } from './AssignmentPopup';
import { DieProps } from './Die';

const chance = new Chance();

const addDieToPool = (dicePool: DicePoolProps, dieColor: string, dieFace: string): void => {
    dicePool.dice.push({
        color: dieColor,
        face: dieFace
    });
};

const addBonus = (tile: TileProps, citizenry: DicePoolProps, cup: DicePoolProps): void => {
    switch (tile.bonus) {
        case bonuses.ONE_BROWN_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_YELLOW_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.YELLOW, phases.DEVELOP);
            break;
        case bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.BLUE, phases.EXPLORE);
            addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.TWO_RED_DICE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_CUP:
            addDieToPool(cup, dieColor.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_CUP:
            addDieToPool(cup, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CUP:
            addDieToPool(cup, dieColor.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CUP:
            addDieToPool(cup, dieColor.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CUP:
            addDieToPool(cup, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_WORLD:
            addDieToPool(tile.dicePool = { dice: [] }, dieColor.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_WORLD:
            addDieToPool(tile.dicePool = { dice: [] }, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_WORLD:
            addDieToPool(tile.dicePool = { dice: [] }, dieColor.GREEN, phases.EXPLORE);
            break;
        default:
            break;
    }
};

const getLowestConstructionQueueTotal = (tiles: Array<Tiles>): Array<Tiles> => {
    if (tiles[0].tiles[0].points + tiles[1].tiles[1].points > tiles[0].tiles[1].points + tiles[1].tiles[0].points) {
        return [tiles[1], tiles[0]];
    }
    return (tiles);
};

export interface gameState {
    factionTiles: Array<Tiles>,
    gameTiles: Array<Tiles>,
    homeWorldTiles: Array<Tiles>,
    players: Array<PlayerBoardProps>,
    victoryPointPool: number
}

const createPlayers = (state: gameState, numberOfPlayers: number): gameState => {
    const victoryPointPool = 12 * numberOfPlayers;
    const players: Array<PlayerBoardProps> = [];
    const factionTiles: Array<Tiles> = chance.pickset(state.factionTiles, numberOfPlayers);
    const homeWorldTiles: Array<Tiles> = chance.pickset(state.homeWorldTiles, numberOfPlayers);
    const gameTiles: Array<Tiles> = chance.pickset(state.gameTiles, numberOfPlayers * 2);
    state.factionTiles = state.factionTiles.filter((tile: Tiles) => !factionTiles.includes(tile));
    state.homeWorldTiles = state.homeWorldTiles.filter((tile: Tiles) => !homeWorldTiles.includes(tile));
    state.gameTiles = state.gameTiles.filter((tile: Tiles) => !gameTiles.includes(tile));
    for (let i = 0; i < numberOfPlayers; i++) {
        const factionTile: Tiles = factionTiles[i];
        const homeWorldTile: Tiles = homeWorldTiles[i];
        let buildQueueTiles: Array<Tiles> = [];
        buildQueueTiles.push(gameTiles[i * 2]);
        buildQueueTiles.push(gameTiles[(i * 2) + 1]);
        buildQueueTiles = getLowestConstructionQueueTotal(buildQueueTiles);
        const credits = homeWorldTile.tiles[0].bonus === bonuses.EIGHT_CREDITS ? 8 : 1;
        let points = 0;
        const tiles: Array<TileProps> = [
            {
                ...factionTile.tiles[0],
                tileId: 1
            },
            {
                ...factionTile.tiles[1],
                tileId: 2
            },
            {
                ...homeWorldTile.tiles[0],
                tileId: 3
            }
        ];
        const phasePowers: PhasePowersProps = {
            assignment: [],
            explore: [],
            develop: [],
            settle: [],
            produce: [],
            ship: [],
            endGame: []
        };
        const citizenry: DicePoolProps = {
            dice: [
                {
                    color: dieColor.WHITE,
                    face: phases.EXPLORE
                },
                {
                    color: dieColor.WHITE,
                    face: phases.EXPLORE
                }
            ]
        };
        const cup: DicePoolProps = {
            dice: [
                {
                    color: dieColor.WHITE,
                    face: phases.EXPLORE
                },
                {
                    color: dieColor.WHITE,
                    face: phases.EXPLORE
                },
                {
                    color: dieColor.WHITE,
                    face: phases.EXPLORE
                }
            ]
        };
        tiles.forEach((tile) => {
            if (tile.assignment) { phasePowers.assignment.push(tile.assignment) };
            if (tile.explore) { phasePowers.explore.push(tile.explore) };
            if (tile.develop) { phasePowers.develop.push(tile.develop) };
            if (tile.settle) { phasePowers.settle.push(tile.settle) };
            if (tile.produce) { phasePowers.produce.push(tile.produce) };
            if (tile.ship) { phasePowers.ship.push(tile.ship) };
            if (tile.endGame) { phasePowers.endGame.push(tile.endGame) };

            points = points + tile.points;
            addBonus(tile, citizenry, cup);
        });
        players.push(
            {
                id: i + 1,
                credits,
                citizenry,
                cup,
                developBuildQueue: [buildQueueTiles[0]],
                nextTileId: 4,
                phasePowers,
                points,
                settleBuildQueue: [buildQueueTiles[1]],
                tiles
            }
        );
    }

    return (
        {
            ...state,
            players,
            victoryPointPool
        }
    )
};

const getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<DieProps> => {
    return dice.filter((die: DieProps) => {
        return die.face === dieFace;
    });
}

const sortDiceByFaceInAssignmentState = (phaseStripDicePool: DicePoolProps): AssignmentState => {
    const newState: AssignmentState = {
        exploreDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.EXPLORE)
        },
        developDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.DEVELOP)
        },
        settleDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.SETTLE)
        },
        produceDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.PRODUCE)
        },
        shipDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.SHIP)
        },
        wildDice: {
            dice: getDiceOfOneFace(phaseStripDicePool.dice, dieFace.WILD)
        },
        selectorDice: {
            dice: []
        }
    }

    return newState;
}

const rollDice = (dicePool: DicePoolProps): DicePoolProps => {
    let rolledDicePool: DicePoolProps = {
        dice: []
    };
    dicePool.dice.forEach((die: DieProps, id: number) => {
        switch (die.color) {
            case dieColor.BLUE:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.PRODUCE,
                        dieFace.PRODUCE,
                        dieFace.SHIP,
                        dieFace.SHIP,
                        dieFace.WILD
                    ])
                });
                break;
            case dieColor.BROWN:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.DEVELOP,
                        dieFace.DEVELOP,
                        dieFace.PRODUCE,
                        dieFace.SHIP,
                        dieFace.WILD
                    ])
                });
                break;
            case dieColor.GREEN:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.SETTLE,
                        dieFace.SETTLE,
                        dieFace.PRODUCE,
                        dieFace.WILD,
                        dieFace.WILD
                    ])
                });
                break;
            case dieColor.PURPLE:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.DEVELOP,
                        dieFace.SHIP,
                        dieFace.SHIP,
                        dieFace.SHIP,
                        dieFace.WILD
                    ])
                });
                break;
            case dieColor.RED:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.DEVELOP,
                        dieFace.DEVELOP,
                        dieFace.SETTLE,
                        dieFace.SETTLE,
                        dieFace.WILD
                    ])
                });
                break;
            case dieColor.WHITE:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.EXPLORE,
                        dieFace.EXPLORE,
                        dieFace.DEVELOP,
                        dieFace.SETTLE,
                        dieFace.PRODUCE,
                        dieFace.SHIP
                    ])
                });
                break;
            case dieColor.YELLOW:
                rolledDicePool.dice.push({
                    color: die.color,
                    id: id.toString(),
                    face: chance.pickone([
                        dieFace.DEVELOP,
                        dieFace.SETTLE,
                        dieFace.PRODUCE,
                        dieFace.WILD,
                        dieFace.WILD,
                        dieFace.WILD
                    ])
                });
                break;
        }
    });
    return rolledDicePool;
}

const rollHumanPlayerDice = (game: gameState): gameState => {
    if (game.players && !game.players[0].phaseDice) {
        const phaseStripDice: DicePoolProps = rollDice(game.players[0].cup);

        game.players[0].phaseDice = sortDiceByFaceInAssignmentState(phaseStripDice);
    };
    return game;
};

export interface state {
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
}

interface gameProps {
    initialState: state
}

class Game extends React.Component<gameProps, state> {
    state: state = {
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
    }

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

    addPickedPhaseToList = (pickedPhase: string): void => {
        let state = this.state;
        switch (pickedPhase) {
            default:
                state.pickedPhases.explore = true;
                break;
            case dieFace.DEVELOP:
                state.pickedPhases.develop = true;
                break;
            case dieFace.SETTLE:
                state.pickedPhases.settle = true;
                break;
            case dieFace.PRODUCE:
                state.pickedPhases.produce = true;
                break;
            case dieFace.SHIP:
                state.pickedPhases.ship = true;
                break;
        }
        this.setState({...state});
    }

    assignAiPlayersDice = (players: Array<PlayerBoardProps>): Array<PlayerBoardProps> => {
        for (let i = 1; i < players.length; i++) {
            let phaseStripDice: DicePoolProps = rollDice(players[i].cup);
            let aiPlayerAssignmentState: AssignmentState = sortDiceByFaceInAssignmentState(phaseStripDice);
            for(let j = 0; j < aiPlayerAssignmentState.wildDice.dice.length; j++) {
                aiPlayerAssignmentState.exploreDice.dice.push(aiPlayerAssignmentState.wildDice.dice[j]);
            }
            aiPlayerAssignmentState.wildDice.dice = [];

            if (aiPlayerAssignmentState.exploreDice.dice.length === 0) {
                let selectorDie: DieProps | undefined;

                if(aiPlayerAssignmentState.developDice.dice.length > 0) {
                    selectorDie = aiPlayerAssignmentState.developDice.dice.pop();
                } else if(aiPlayerAssignmentState.settleDice.dice.length > 0) {
                    selectorDie = aiPlayerAssignmentState.settleDice.dice.pop();
                } else if(aiPlayerAssignmentState.produceDice.dice.length > 0) {
                    selectorDie = aiPlayerAssignmentState.produceDice.dice.pop();
                } else if(aiPlayerAssignmentState.shipDice.dice.length > 0) {
                    selectorDie = aiPlayerAssignmentState.shipDice.dice.pop();
                }

                if (selectorDie) {
                    aiPlayerAssignmentState.exploreDice.dice.push(selectorDie);
                }
            };
            players[i].phaseDice = aiPlayerAssignmentState;
            this.addPickedPhaseToList(dieFace.EXPLORE);
        };
        return players;
    };

    assignDice = (pickedPhase: string): void => {
        let state = this.state;
        this.addPickedPhaseToList(pickedPhase);
        let randomPhaseRolls = 3 - state.game.players.length;
        if (randomPhaseRolls > 0) {
            let whiteDicePool: DicePoolProps = {
                dice: [
                    {
                        color: dieColor.WHITE,
                        face: dieFace.EXPLORE
                    }
                ]
            }

            for (let i = 0; i < randomPhaseRolls; i++) {
                whiteDicePool = rollDice(whiteDicePool);
                this.addPickedPhaseToList(whiteDicePool.dice[0].face);
            }
        }
        state.game.players = this.assignAiPlayersDice(state.game.players);

        let currentPhase = pickedPhase + ' Phase';
        this.setState({
            ...state,
            currentPhase
        })
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
}

export default Game;
