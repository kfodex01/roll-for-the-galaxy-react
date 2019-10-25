import React from "react";
import StartForm from "./StartForm";
import {BigText, FlexColumnDiv} from "../styled-components";
import PlayerBoard from "./PlayerBoard";
import {bonuses, dieColors, initialGameState, phases} from "../enums";
import Chance from "chance";

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
            addDieToPool(tile.dice = [], dieColors.BLUE, phases.EXPLORE);
            break;
        case bonuses.ONE_BROWN_DIE_TO_WORLD:
            addDieToPool(tile.dice = [], dieColors.BROWN, phases.EXPLORE);
            break;
        case bonuses.ONE_GREEN_DIE_TO_WORLD:
            addDieToPool(tile.dice = [], dieColors.GREEN, phases.EXPLORE);
            break;
        default:
            break;
    }
};

const getLowestConstructionQueueTotal = (tiles) => {
    if (tiles[0].tiles[0].points + tiles[1].tiles[1].points > tiles[0].tiles[1].points + tiles[1].tiles[0].points) {
        return [tiles[1], tiles[0]];
    }
    return (tiles);
};

const createPlayers = (state, numberOfPlayers) => {
    const victoryPointPool = 12 * numberOfPlayers;
    const players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const factionTile = chance.pickone(state.factionTiles);
        state.factionTiles = state.factionTiles.filter(tile => tile.tileId !== factionTile.tileId);
        const homeWorldTile = chance.pickone(state.homeWorldTiles);
        state.homeWorldTiles = state.homeWorldTiles.filter(tile => tile.tileId !== homeWorldTile.tileId);
        let buildQueueTiles = [];
        buildQueueTiles.push(chance.pickone(state.gameTiles));
        state.gameTiles = state.gameTiles.filter(tile => tile.tileId !== buildQueueTiles[0].tileId);
        buildQueueTiles.push(chance.pickone(state.gameTiles));
        state.gameTiles = state.gameTiles.filter(tile => tile.tileId !== buildQueueTiles[1].tileId);
        buildQueueTiles = getLowestConstructionQueueTotal(buildQueueTiles);
        const credits = homeWorldTile.tileId !== 2 ? 1 : 8;
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
        visibility: true
    };

    hideBeginGameForm = () => {
        this.setState({
            visibility: false
        });
    };

    createPlayers = (numberOfPlayers) => {
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
                        <BigText data-testid='victory-point-pool'>Victory Point
                            Pool: {this.state.game.victoryPointPool}</BigText>
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
