import React from "react";
import {BigText, FlexRowDiv, PlayerColumnDiv} from "../styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import {bonuses, dieColors, phases} from "../enums";
import Tile from "./Tile";
import DicePool from "./DicePool";
import ConstructionZone from "./ConstructionZone";

class PlayerBoard extends React.Component {
    state = {
        credits: 0,
        citizenry: [
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            },
            {
                color: dieColors.WHITE,
                value: phases.EXPLORE
            }
        ],
        cup: [
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
        ],
        developBuildQueue: [],
        nextTileId: 1,
        phasePowers: {
            [phases.ASSIGNMENT]: [],
            [phases.EXPLORE]: [],
            [phases.DEVELOP]: [],
            [phases.SETTLE]: [],
            [phases.PRODUCE]: [],
            [phases.SHIP]: [],
            [phases.ENDGAME]: []
        },
        points: 0,
        settleBuildQueue: [],
        tiles: []
    };

    addDieToPool = (dicePool, dieColor, dieFace) => {
        dicePool.push({
            color: dieColor,
            value: dieFace
        });
    };

    addBonus = (tile, citizenry, cup) => {
        switch (tile.bonus) {
            case bonuses.ONE_BROWN_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.BROWN, phases.EXPLORE);
                break;
            case bonuses.ONE_GREEN_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.GREEN, phases.EXPLORE);
                break;
            case bonuses.ONE_PURPLE_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.PURPLE, phases.EXPLORE);
                break;
            case bonuses.ONE_RED_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
                break;
            case bonuses.ONE_YELLOW_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.YELLOW, phases.DEVELOP);
                break;
            case bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.BLUE, phases.EXPLORE);
                this.addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
                break;
            case bonuses.TWO_RED_DICE_TO_CITIZENRY:
                this.addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
                this.addDieToPool(citizenry, dieColors.RED, phases.EXPLORE);
                break;
            case bonuses.ONE_BLUE_DIE_TO_CUP:
                this.addDieToPool(cup, dieColors.BLUE, phases.EXPLORE);
                break;
            case bonuses.ONE_BROWN_DIE_TO_CUP:
                this.addDieToPool(cup, dieColors.BROWN, phases.EXPLORE);
                break;
            case bonuses.ONE_GREEN_DIE_TO_CUP:
                this.addDieToPool(cup, dieColors.GREEN, phases.EXPLORE);
                break;
            case bonuses.ONE_PURPLE_DIE_TO_CUP:
                this.addDieToPool(cup, dieColors.PURPLE, phases.EXPLORE);
                break;
            case bonuses.ONE_RED_DIE_TO_CUP:
                this.addDieToPool(cup, dieColors.RED, phases.EXPLORE);
                break;
            case bonuses.ONE_BLUE_DIE_TO_WORLD:
                this.addDieToPool(tile.dice = [], dieColors.BLUE, phases.EXPLORE);
                break;
            case bonuses.ONE_BROWN_DIE_TO_WORLD:
                this.addDieToPool(tile.dice = [], dieColors.BROWN, phases.EXPLORE);
                break;
            case bonuses.ONE_GREEN_DIE_TO_WORLD:
                this.addDieToPool(tile.dice = [], dieColors.GREEN, phases.EXPLORE);
                break;
            default:
                break;
        }
    };

    getLowestConstructionQueueTotal = (tiles) => {
        if (tiles[0].tiles[0].points + tiles[1].tiles[1].points > tiles[0].tiles[1].points + tiles[1].tiles[0].points) {
            return [tiles[1], tiles[0]];
        }
        return (tiles);
    };

    componentDidMount() {
        this.setState((state) => {
            const citizenry = state.citizenry;
            const cup = state.cup;
            const buildQueueTiles = this.getLowestConstructionQueueTotal(this.props.startingTiles.gameTiles);
            let points = 0;
            let credits;
            const tiles = [
                {
                    ...this.props.startingTiles.factionTile.tiles[0],
                    tileId: 1
                },
                {
                    ...this.props.startingTiles.factionTile.tiles[1],
                    tileId: 2
                },
                {
                    ...this.props.startingTiles.homeWorldTile.tile,
                    tileId: 3
                }
            ];
            credits = this.props.startingTiles.homeWorldTile.tileId === 2 ? 8 : 1;
            const phasePowers = {
                [phases.ASSIGNMENT]: [],
                [phases.EXPLORE]: [],
                [phases.DEVELOP]: [],
                [phases.SETTLE]: [],
                [phases.PRODUCE]: [],
                [phases.SHIP]: [],
                [phases.ENDGAME]: []
            };
            tiles.forEach((tile) => {
                for (let phase in phases) {
                    if (tile[phases[phase]]) {
                        phasePowers[phases[phase]].push(tile[phases[phase]]);
                    }
                }

                points = points + tile.points;
                this.addBonus(tile, citizenry, cup);
            });

            return ({
                ...state,
                citizenry,
                credits,
                cup,
                developBuildQueue: [buildQueueTiles[0]],
                phasePowers,
                points,
                settleBuildQueue: [buildQueueTiles[1]],
                tiles
            })
        });
    }

    displayPowers = (phasePowers) => {
        let powerList = [];
        for (let phase in phases) {
            if (phasePowers[phases[phase]].length > 0) {
                powerList.push(phasePowers[phases[phase]].map((phasePower, id) => {
                    return (<p key={id}>{phases[phase]}: {phasePower}</p>);
                }));
            }
        }
        return powerList;
    };

    render() {
        return (
            <PlayerColumnDiv>
                <FlexRowDiv>
                    <FontAwesomeIcon icon={faStar} size='2x'/>
                    <BigText>{this.state.points}</BigText>
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size='2x'/>
                    <BigText>{this.state.credits}</BigText>
                    <ConstructionZone developBuildQueue={this.state.developBuildQueue}
                                      settleBuildQueue={this.state.settleBuildQueue}/>
                    <FlexRowDiv>
                        <BigText>Citizenry: </BigText>
                        <DicePool dice={this.state.citizenry}/>
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Cup: </BigText>
                        <DicePool dice={this.state.cup}/>
                    </FlexRowDiv>
                </FlexRowDiv>
                <FlexRowDiv>
                    {this.state.tiles.map((tile) => {
                        return (
                            <Tile key={tile.tileId} {...tile} />
                        );
                    })}
                </FlexRowDiv>
                <div>
                    {this.displayPowers(this.state.phasePowers)}
                </div>
            </PlayerColumnDiv>
        );
    }
}

export default PlayerBoard;
