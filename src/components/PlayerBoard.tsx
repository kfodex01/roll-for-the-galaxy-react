import React from "react";
import {BigText, FlexRowDiv, PlayerColumnDiv} from "../styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import Tile, {TileProps} from "./Tile";
import DicePool, {DicePoolProps} from "./DicePool";
import ConstructionZone, {Tiles} from "./ConstructionZone";

interface PhasePowersProps {
    Assignment: Array<string>;
    Develop: Array<string>;
    EndGame: Array<string>;
    Explore: Array<string>;
    Produce: Array<string>;
    Settle: Array<string>;
    Ship: Array<string>;
}

interface PlayerBoardProps {
    citizenry: DicePoolProps;
    credits: number;
    cup: DicePoolProps;
    developBuildQueue: Array<Tiles>;
    id: number;
    nextTileId: number;
    phasePowers: PhasePowersProps;
    points: number;
    settleBuildQueue: Array<Tiles>;
    tiles: Array<TileProps>;
}

class PlayerBoard extends React.Component<PlayerBoardProps> {
    displayPowers = (phasePowers: PhasePowersProps) => {
        let powerList = [];
        powerList.push(phasePowers.Assignment.map((phasePower, id) => {
            return (<p key={id}>{'Assignment: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.Explore.map((phasePower, id) => {
            return (<p key={id}>{'Explore: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.Develop.map((phasePower, id) => {
            return (<p key={id}>{'Develop: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.Settle.map((phasePower, id) => {
            return (<p key={id}>{'Settle: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.Produce.map((phasePower, id) => {
            return (<p key={id}>{'Produce: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.Ship.map((phasePower, id) => {
            return (<p key={id}>{'Ship: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.EndGame.map((phasePower, id) => {
            return (<p key={id}>{'End Game: '}{phasePower}</p>);
        }));
        return powerList;
    };

    render() {
        return (
            <PlayerColumnDiv>
                <FlexRowDiv>
                    <FontAwesomeIcon data-testid='points-icon' icon={faStar} size='2x'/>
                    <BigText data-testid='points'>{this.props.points}</BigText>
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size='2x'/>
                    <BigText>{this.props.credits}</BigText>
                    <ConstructionZone
                        developBuildQueue={this.props.developBuildQueue}
                        settleBuildQueue={this.props.settleBuildQueue}
                     />
                    <FlexRowDiv>
                        <BigText>Citizenry: </BigText>
                        <DicePool {...this.props.citizenry}/>
                    </FlexRowDiv>
                    <FlexRowDiv>
                        <BigText>Cup: </BigText>
                        <DicePool {...this.props.cup}/>
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
