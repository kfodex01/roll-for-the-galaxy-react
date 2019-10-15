import Chance from 'chance';
import {CREATE_PLAYERS} from '../action-types.js';
import {dieColors, initialGameState, phases, worldBonuses} from "../enums";

const chance = new Chance();

const addBonus = (tile, citizenry, cup) => {
    switch (tile.bonus) {
        case worldBonuses.ONE_BROWN_DIE_TO_CITIZENRY:
            citizenry.push({
                color: dieColors.BROWN,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_GREEN_DIE_TO_CITIZENRY:
            citizenry.push({
                color: dieColors.GREEN,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_RED_DIE_TO_CITIZENRY:
            citizenry.push({
                color: dieColors.RED,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_YELLOW_DIE_TO_CITIZENRY:
            citizenry.push({
                color: dieColors.YELLOW,
                value: phases.DEVELOP
            });
            break;
        case worldBonuses.ONE_BLUE_DIE_TO_CUP:
            cup.push({
                color: dieColors.BlUE,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_BROWN_DIE_TO_CUP:
            cup.push({
                color: dieColors.BROWN,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_GREEN_DIE_TO_CUP:
            cup.push({
                color: dieColors.GREEN,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_PURPLE_DIE_TO_CUP:
            cup.push({
                color: dieColors.PURPLE,
                value: phases.EXPLORE
            });
            break;
        case worldBonuses.ONE_BLUE_DIE_TO_WORLD:
            tile.die = [{
                color: dieColors.BlUE,
                value: phases.EXPLORE
            }];
            break;
        default:
            break;
    }
};

const createPlayers = (state, data) => {
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
            [phases.SHIP]: []
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
            players
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
