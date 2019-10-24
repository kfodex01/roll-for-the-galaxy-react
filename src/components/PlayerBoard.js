import React from "react";
import {
    BigText,
    BlueWorld,
    BrownWorld,
    Development,
    FlexRowDiv,
    GrayWorld, GreenWorld,
    PlayerColumnDiv, YellowWorld
} from "../styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faMoneyCheckAlt, faSatellite, faStar, faWrench} from "@fortawesome/free-solid-svg-icons";
import {phases, tileTypes} from "../enums";
import Die from "./Die";
import Tile from "./Tile";

class PlayerBoard extends React.Component {
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

    getDicePool = (dicePool) => {
        if (dicePool) {
            return dicePool.map((die, id) => {
                return (<Die key={id} color={die.color} face={die.value}/>);
            });
        }
        return null;
    };

    render() {
        return(
            <PlayerColumnDiv>
                <FlexRowDiv>
                    <FontAwesomeIcon icon={faStar} size='2x' />
                    <BigText>{this.props.points}</BigText>
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size='2x' />
                    <BigText>{this.props.credits}</BigText>
                    <FlexRowDiv>
                        <FontAwesomeIcon icon={faWrench} size='2x' />
                        <BigText>{this.props.developBuildQueue[0].tiles[0].points}</BigText>
                        <Tile key={this.props.developBuildQueue[0].tiles[0].tileId} getDicePool={this.getDicePool} {...this.props.developBuildQueue[0].tiles[0]} />
                        <BigText>{this.props.settleBuildQueue[0].tiles[1].points}</BigText>
                        <Tile key={this.props.settleBuildQueue[0].tiles[1].tileId} getDicePool={this.getDicePool} {...this.props.settleBuildQueue[0].tiles[1]} />
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Citizenry: </BigText>{this.getDicePool(this.props.citizenry)}
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Cup: </BigText>{this.getDicePool(this.props.cup)}
                    </FlexRowDiv>
                </FlexRowDiv>
                <FlexRowDiv>
                    {this.props.tiles.map((tile) => {
                        return (
                            <Tile key={tile.tileId} getDicePool={this.getDicePool} {...tile} />
                        );
                    })}
                </FlexRowDiv>
                <div>
                    {this.displayPowers(this.props.phasePowers)}
                </div>
            </PlayerColumnDiv>
        );
    }
}

export default PlayerBoard;
