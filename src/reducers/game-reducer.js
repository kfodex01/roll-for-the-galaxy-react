import Chance from 'chance';
import {CREATE_PLAYERS} from '../action-types.js';
import {initialGameState, phases} from "../enums";

const chance = new Chance();

const createPlayers = (state, data) => {
    const players = [];
    for (let i = 0; i < data; i++) {
        const factionTile = chance.pickone(state.factionTiles);
        state.factionTiles = state.factionTiles.filter(tile => tile.tileId !== factionTile.tileId);
        const homeWorldTile = chance.pickone(state.homeWorldTiles);
        state.homeWorldTiles = state.homeWorldTiles.filter(tile => tile.tileId !== homeWorldTile.tileId);
        const credits = homeWorldTile.tileId !==2 ? 1 : 8;
        const tiles = [
            {...factionTile.tiles[0],
            tileId: 1},
            {...factionTile.tiles[1],
                tileId: 2},
            {...homeWorldTile.tile,
                tileId: 3}
        ];
        const phasePowers = {
            [phases.ASSIGNMENT]: [],
            [phases.EXPLORE]: [],
            [phases.DEVELOP]: [],
            [phases.SETTLE]: [],
            [phases.PRODUCE]: [],
            [phases.SHIP]: []
        };
        tiles.map((tile) => {
            for (let phase in phases) {
                if (tile[phases[phase]]) {
                    phasePowers[phases[phase]].push(tile[phases[phase]]);
                }
            }
            return tile;
        });
        players.push(
            {
                id: i + 1,
                credits,
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
