import React from "react";
import {
    BigText,
    FlexRowDiv,
    PlayerColumnDiv
} from "../styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckAlt, faStar, faWrench} from "@fortawesome/free-solid-svg-icons";
import {phases} from "../enums";
import Tile from "./Tile";
import DicePool from "./DicePool";

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
                        <Tile key={this.props.developBuildQueue[0].tiles[0].tileId} {...this.props.developBuildQueue[0].tiles[0]} />
                        <BigText>{this.props.settleBuildQueue[0].tiles[1].points}</BigText>
                        <Tile key={this.props.settleBuildQueue[0].tiles[1].tileId} {...this.props.settleBuildQueue[0].tiles[1]} />
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Citizenry: </BigText>
                        <DicePool dice={this.props.citizenry} />
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Cup: </BigText>
                        <DicePool dice={this.props.cup} />
                    </FlexRowDiv>
                </FlexRowDiv>
                <FlexRowDiv>
                    {this.props.tiles.map((tile) => {
                        return (
                            <Tile key={tile.tileId} {...tile} />
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
