import { DicePoolProps } from '../DicePool';
import { TileProps } from '../Tile';
import { Tiles } from '../ConstructionZone';
import { bonuses, dieColor, phases, dieFace } from '../../enums';
import { DieProps } from '../Die';
import { AssignmentState } from '../AssignmentPopup';
import { gameState, fullState } from '../Game';
import { PhasePowersProps, PlayerBoardProps } from '../PlayerBoard';
import { assignAiPlayersDice } from './ai-components';
import GameManager from './GameManager';
import DiceManager from './DiceManager';
import { ExploreState } from '../ExplorePopup';

const addDieToPool = (dicePool: DicePoolProps, dieColor: string, dieFace: string): DicePoolProps => {
    dicePool.dice.push({
        color: dieColor,
        face: dieFace
    });

    return dicePool;
};

const getDiceOfOneFace = (dice: Array<DieProps>, dieFace: string): Array<DieProps> => {
    return dice.filter((die: DieProps) => {
        return die.face === dieFace;
    });
};

const addBonus = (tile: TileProps, citizenry: DicePoolProps, cup: DicePoolProps): void => {
    switch (tile.bonus) {
        case bonuses.ONE_BROWN_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_YELLOW_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.YELLOW, phases.DEVELOP);
            break;
        case bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.BLUE, phases.EXPLORE);
            citizenry = addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.TWO_RED_DICE_TO_CITIZENRY:
            citizenry = addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            citizenry = addDieToPool(citizenry, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_CUP:
            cup = addDieToPool(cup, dieColor.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_CUP:
            cup = addDieToPool(cup, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CUP:
            cup = addDieToPool(cup, dieColor.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CUP:
            cup = addDieToPool(cup, dieColor.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CUP:
            cup = addDieToPool(cup, dieColor.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_WORLD:
            tile.dicePool = addDieToPool(tile.dicePool = { dice: [] }, dieColor.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_WORLD:
            tile.dicePool = addDieToPool(tile.dicePool = { dice: [] }, dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_WORLD:
            tile.dicePool = addDieToPool(tile.dicePool = { dice: [] }, dieColor.GREEN, phases.EXPLORE);
            break;
        default:
            break;
    };
};

const getLowestConstructionQueueTotal = (tiles: Array<Tiles>): Array<Tiles> => {
    if (tiles[0].tiles[0].points + tiles[1].tiles[1].points > tiles[0].tiles[1].points + tiles[1].tiles[0].points) {
        return [tiles[1], tiles[0]];
    };
    return (tiles);
};

const returnPhaseDiceForInactivePhases = (state: fullState): fullState => {
    let pickedPhases = state.pickedPhases;
    let players = state.game.players;
    for (let i = 0; i < players.length; i++) {
        players[i].cup.dice = [];
        if (!pickedPhases.explore) {
            players[i].cup.dice = players[i].cup.dice.concat(players[i].phaseDice.exploreDice.dice);
            players[i].phaseDice.exploreDice.dice = [];
        }
        if (!pickedPhases.develop) {
            players[i].cup.dice = players[i].cup.dice.concat(players[i].phaseDice.developDice.dice);
            players[i].phaseDice.developDice.dice = [];
        }
        if (!pickedPhases.settle) {
            players[i].cup.dice = players[i].cup.dice.concat(players[i].phaseDice.settleDice.dice);
            players[i].phaseDice.settleDice.dice = [];
        }
        if (!pickedPhases.produce) {
            players[i].cup.dice = players[i].cup.dice.concat(players[i].phaseDice.produceDice.dice);
            players[i].phaseDice.produceDice.dice = [];
        }
        if (!pickedPhases.ship) {
            players[i].cup.dice = players[i].cup.dice.concat(players[i].phaseDice.shipDice.dice);
            players[i].phaseDice.shipDice.dice = [];
        }
    }
    return state;
};

export const setNextPhase = (state: fullState): fullState => {
    if (state.pickedPhases.explore) {
        state.currentPhase = 'Explore Phase';
    } else if (state.pickedPhases.develop) {
        state.currentPhase = 'Develop Phase';
    } else if (state.pickedPhases.settle) {
        state.currentPhase = 'Settle Phase';
    } else if (state.pickedPhases.produce) {
        state.currentPhase = 'Produce Phase';
    } else if (state.pickedPhases.ship) {
        state.currentPhase = 'Ship Phase';
    } else {
        state.currentPhase = 'Start Round';
        state.game.players[0].phaseDice.phaseDiceRolled = false;
    };
    return state;
};

export const addPickedPhaseToList = (pickedPhase: string, state: fullState): fullState => {
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
    return state;
};

export const sortDiceByFaceInAssignmentState = (phaseStripDicePool: DicePoolProps): AssignmentState => {
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
        },
        phaseDiceRolled: true
    };

    return newState;
};

export const rollHumanPlayerDice = (game: gameState, diceManager: DiceManager): gameState => {
    if (game.players && !game.players[0].phaseDice.phaseDiceRolled) {
        const phaseStripDice: DicePoolProps = diceManager.rollDice(game.players[0].cup);

        game.players[0].phaseDice = sortDiceByFaceInAssignmentState(phaseStripDice);
    };
    return game;
};

export const createPlayers = (gameManager: GameManager, state: gameState, numberOfPlayers: number): gameState => {
    const victoryPointPool = 12 * numberOfPlayers;
    const players: Array<PlayerBoardProps> = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const factionTile: Tiles = gameManager.popRandomFactionTile();
        const homeWorldTile: Tiles = gameManager.popRandomHomeWorldTile();
        let buildQueueTiles: Array<Tiles> = [];
        buildQueueTiles.push(gameManager.popRandomGameTile());
        buildQueueTiles.push(gameManager.popRandomGameTile());
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
        let phaseDice: AssignmentState = {
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
            },
            selectorDice: {
                dice: []
            },
            phaseDiceRolled: false
        };
        let explorePhase: ExploreState = {
            scoutPool: {
                dice: []
            },
            stockPool: {
                dice: []
            },
            tiles: [],
            unassignedPool: {
                dice: []
            }
        };
        players.push(
            {
                id: i + 1,
                credits,
                citizenry,
                cup,
                developBuildQueue: [buildQueueTiles[0]],
                explorePhase,
                nextTileId: 4,
                phaseDice,
                phasePowers,
                points,
                settleBuildQueue: [buildQueueTiles[1]],
                tiles
            }
        );
    };

    return (
        {
            ...state,
            players,
            victoryPointPool
        }
    );
};

export const finishAssignmentPhase = (state: fullState, pickedPhase: string, diceManager: DiceManager): fullState => {
    state = addPickedPhaseToList(pickedPhase, state);
    let randomPhaseRolls = 3 - state.game.players.length;
    if (randomPhaseRolls > 0) {
        let whiteDicePool: DicePoolProps = {
            dice: [
                {
                    color: dieColor.WHITE,
                    face: dieFace.EXPLORE
                }
            ]
        };

        for (let i = 0; i < randomPhaseRolls; i++) {
            whiteDicePool = diceManager.rollDice(whiteDicePool);
            state = addPickedPhaseToList(whiteDicePool.dice[0].face, state);
        };
    };
    state = assignAiPlayersDice(state, diceManager);
    state = returnPhaseDiceForInactivePhases(state);
    state = setNextPhase(state);

    return state;
};
