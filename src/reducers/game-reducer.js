import Chance from 'chance';
import {CREATE_PLAYERS} from '../action-types.js';
import {dieColors, initialGameState, phases, bonuses} from "../enums";

const chance = new Chance();

const addDieToPool = (dicePool, dieColor, dieFace) => {
    dicePool.push({
       color: dieColor,
       value: dieFace
    });
};

const addBonus = (tile, citizenry, cup) => {
    switch (tile.bonus) {
        case bonuses.ONE_BROWN_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_YELLOW_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.YELLOW, phases.DEVELOP);
            break;
        case bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.BLUE, phases.EXPLORE);
            addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
            break;
        case bonuses.TWO_RED_DICE_TO_CITIZENRY:
            addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
            addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_CUP:
            addDieToPool(cup, dieColors.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_CUP:
            addDieToPool(cup, dieColors.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_CUP:
            addDieToPool(cup, dieColors.GREEN, phases.EXPLORE);
            break;
        case bonuses.ONE_PURPLE_DIE_TO_CUP:
            addDieToPool(cup, dieColors.PURPLE, phases.EXPLORE);
            break;
        case bonuses.ONE_RED_DIE_TO_CUP:
            addDieToPool(cup, dieColors.RED, phases.EXPLORE);
            break;
        case bonuses.ONE_BLUE_DIE_TO_WORLD:
            addDieToPool(tile.die = [], dieColors.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_WORLD:
            addDieToPool(tile.die = [], dieColors.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_WORLD:
            addDieToPool(tile.die = [], dieColors.GREEN, phases.EXPLORE);
            break;
        default:
            break;
    }
};

const createPlayers = (state, data) => {
    const victoryPointPool = 12 * data;
    const players = [];
    for (let i = 0; i < data; i++) {
        const factionTile = chance.pickone(state.factionTiles);
        state.factionTiles = state.factionTiles.filter(tile => tile.tileId !== factionTile.tileId);
        const homeWorldTile = chance.pickone(state.homeWorldTiles);
        state.homeWorldTiles = state.homeWorldTiles.filter(tile => tile.tileId !== homeWorldTile.tileId);
        const credits = homeWorldTile.tileId !== 2 ? 1 : 8;
        const tiles = [
            {
                ...factionTile.tiles[0],
                tileId: 1
            },
            {
                ...factionTile.tiles[1],
                tileId: 2
            },
            {
                ...homeWorldTile.tile,
                tileId: 3
            }
        ];
        const phasePowers = {
            [phases.ASSIGNMENT]: [],
            [phases.EXPLORE]: [],
            [phases.DEVELOP]: [],
            [phases.SETTLE]: [],
            [phases.PRODUCE]: [],
            [phases.SHIP]: [],
            [phases.ENDGAME]: []
        };
        const citizenry = [
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            }
        ];
        const cup = [
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            }
        ];
        tiles.forEach((tile) => {
            for (let phase in phases) {
                if (tile[phases[phase]]) {
                    phasePowers[phases[phase]].push(tile[phases[phase]]);
                }
            }

            addBonus(tile, citizenry, cup);
        });
        players.push(
            {
                id: i + 1,
                credits,
                citizenry,
                cup,
                nextTileId: 4,
                phasePowers,
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

const reducerMap = {
    [CREATE_PLAYERS]: createPlayers
};

export default (state = {...initialGameState}, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
