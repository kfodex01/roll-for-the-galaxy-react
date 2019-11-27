import React from 'react';
import StartForm from './StartForm';
import { BigText, FlexColumnDiv } from '../styled-components';
import PlayerBoard, { PhasePowersProps, PlayerBoardProps } from './PlayerBoard';
import { bonuses, dieColor, phases, dieFace } from '../enums';
import Chance from 'chance';
import { TileProps } from './Tile';
import { Tiles } from './ConstructionZone';
import { DicePoolProps } from './DicePool';
import AssignmentPopup from './AssignmentPopup';
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

const rollDice = (game: gameState): gameState => {
    if (game.players && !game.players[0].phaseStripDice) {
        const cupDice = game.players[0].cup.dice;
        const phaseStripDice: DicePoolProps = {
            dice: []
        };
        cupDice.forEach((die: DieProps, id: number) => {
            switch (die.color) {
                case dieColor.BLUE:
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                    phaseStripDice.dice.push({
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
                default:
                    break;
            }
        });

        game.players[0].phaseStripDice = phaseStripDice;
    };
    return game;
};

export interface state {
    game: gameState,
    startFormVisibility: boolean,
    assignmentPopupVisibility: boolean
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
        assignmentPopupVisibility: false
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

    toggleAssignmentPopup = () => {
        const gameWithRolledDice = rollDice(this.state.game);
        this.setState({ assignmentPopupVisibility: !this.state.assignmentPopupVisibility, game: gameWithRolledDice });
    }

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
                            <button onClick={this.toggleAssignmentPopup} >Start Round</button>
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
                    this.state.assignmentPopupVisibility === true && this.state.game.players[0].phaseStripDice ?
                        (
                            <AssignmentPopup closePopup={this.toggleAssignmentPopup} phaseStripDicePool={this.state.game.players[0].phaseStripDice} />
                        ) : null
                }
            </>
        )
    }
}

export default Game;
