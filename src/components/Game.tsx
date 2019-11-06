import React from "react";
import StartForm from "./StartForm";
import {BigText, FlexColumnDiv} from "../styled-components";
import PlayerBoard from "./PlayerBoard";
import {bonuses, dieColor, initialGameState, phases} from "../enums";
import Chance from "chance";
import {DieProps} from "./Die";
import Tile, {TileProps} from "./Tile";
import { Tiles } from "./ConstructionZone";

const chance = new Chance();

const addDieToPool = (dicePool: Array<DieProps>, dieColor: string, dieFace: string) => {
    dicePool.push({
        color: dieColor,
        face: dieFace
    });
};

const addBonus = (tile: TileProps, citizenry: Array<DieProps>, cup: Array<DieProps>) => {
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
            addDieToPool(tile.dice = [], dieColor.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_WORLD:
            addDieToPool(tile.dice = [], dieColor.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_WORLD:
            addDieToPool(tile.dice = [], dieColor.GREEN, phases.EXPLORE);
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

const createPlayers = (state : any, numberOfPlayers: number) => {
    const victoryPointPool = 12 * numberOfPlayers;
    const players = [];
    const factionTiles = chance.pickset(state.factionTiles, numberOfPlayers);
    const homeWorldTiles = chance.pickset(state.homeWorldTiles, numberOfPlayers);
    const gameTiles = chance.pickset(state.gameTiles, numberOfPlayers * 2);
    state.factionTiles = state.factionTiles.filter(tile => !factionTiles.includes(tile));
    state.homeWorldTiles = state.homeWorldTiles.filter(tile => !homeWorldTiles.includes(tile));
    state.gameTiles = state.gameTiles.filter(tile => !gameTiles.includes(tile));
    for (let i = 0; i < numberOfPlayers; i++) {
        const factionTile = factionTiles[i];
        const homeWorldTile = homeWorldTiles[i];
        let buildQueueTiles = [];
        buildQueueTiles.push(gameTiles[i * 2]);
        buildQueueTiles.push(gameTiles[(i * 2) + 1]);
        buildQueueTiles = getLowestConstructionQueueTotal(buildQueueTiles);
        const credits = homeWorldTile.tile.bonus === bonuses.EIGHT_CREDITS ? 8 : 1;
        let points = 0;
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
                color: dieColor.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColor.WHITE,
                value: phases.EXPLORE
            }
        ];
        const cup = [
            {
                color: dieColor.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColor.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColor.WHITE,
                value: phases.EXPLORE
            }
        ];
        tiles.forEach((tile) => {
            for (let phase in phases) {
                if (tile[phases[phase]]) {
                    phasePowers[phases[phase]].push(tile[phases[phase]]);
                }
            }

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

class Game extends React.Component {
    state = {
        game: {...initialGameState},
        victoryPointPool: 0,
        visibility: true
    };

    hideBeginGameForm = () => {
        this.setState({
            visibility: false
        });
    };

    createPlayers = (numberOfPlayers: number) => {
        const game = createPlayers(this.state.game, numberOfPlayers);
        this.setState({game});
    };

    render() {
        return (
            <>
                {this.state.visibility === true ?
                    (
                        <StartForm hideBeginGameForm={this.hideBeginGameForm} createPlayers={this.createPlayers} />
                    ) :
                    <>
                        <BigText>Victory Point Pool: {this.state.victoryPointPool}</BigText>
                        <FlexColumnDiv data-testid='player-boards'>
                            {this.state.game.players.map((player) => {
                                    return (
                                        <PlayerBoard key={player.id} {...player} />
                                    );
                                }
                            )}
                        </FlexColumnDiv>
                    </>
                }
            </>
        )
    }
}

export default Game;
