import React from "react";
import { BigText, FlexRowDiv, PlayerColumnDiv } from "../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import Tile, { TileProps } from "./Tile";
import DicePool, { DicePoolProps } from "./DicePool";
import ConstructionZone, { Tiles } from "./ConstructionZone";

export interface PhasePowersProps {
    assignment: Array<string>;
    develop: Array<string>;
    endGame: Array<string>;
    explore: Array<string>;
    produce: Array<string>;
    settle: Array<string>;
    ship: Array<string>;
}

export interface PlayerBoardProps {
    citizenry: DicePoolProps;
    credits: number;
    cup: DicePoolProps;
    developBuildQueue: Array<Tiles>;
    id: number;
    nextTileId: number;
    phasePowers: PhasePowersProps;
    phaseStripDice?: DicePoolProps;
    points: number;
    settleBuildQueue: Array<Tiles>;
    tiles: Array<TileProps>;
}

class PlayerBoard extends React.Component<PlayerBoardProps> {
    displayPowers = (phasePowers: PhasePowersProps): Array<Array<JSX.Element>> => {
        let powerList = [];
        powerList.push(phasePowers.assignment.map((phasePower, id) => {
            return (<p key={id}>{'Assignment: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.explore.map((phasePower, id) => {
            return (<p key={id}>{'Explore: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.develop.map((phasePower, id) => {
            return (<p key={id}>{'Develop: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.settle.map((phasePower, id) => {
            return (<p key={id}>{'Settle: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.produce.map((phasePower, id) => {
            return (<p key={id}>{'Produce: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.ship.map((phasePower, id) => {
            return (<p key={id}>{'Ship: '}{phasePower}</p>);
        }));
        powerList.push(phasePowers.endGame.map((phasePower, id) => {
            return (<p key={id}>{'End Game: '}{phasePower}</p>);
        }));
        return powerList;
    };

    render() {
        return (
            <PlayerColumnDiv>
                <FlexRowDiv>
                    <FontAwesomeIcon icon={faStar} size='2x' />
                    <BigText data-testid='points'>{this.props.points}</BigText>
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size='2x' />
                    <BigText data-testid='credits'>{this.props.credits}</BigText>
                    <ConstructionZone
                        developBuildQueue={this.props.developBuildQueue}
                        settleBuildQueue={this.props.settleBuildQueue}
                    />
                    <FlexRowDiv data-testid='citizenry'>
                        <BigText>Citizenry: </BigText>
                        <DicePool {...this.props.citizenry} />
                    </FlexRowDiv>
                    <FlexRowDiv data-testid='cup'>
                        <BigText>Cup: </BigText>
                        <DicePool {...this.props.cup} />
                    </FlexRowDiv>
                </FlexRowDiv>
                <FlexRowDiv>
                    <BigText>Tableau: </BigText>
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
