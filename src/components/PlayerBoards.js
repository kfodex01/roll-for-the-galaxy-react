import React from "react";
import {faSatellite, faGlobe, faMoneyCheckAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {phases, tileTypes} from "../enums";
import Dice from "./Dice";
import {
    BigText,
    BlueWorld,
    BrownWorld,
    Development,
    FlexColumnDiv,
    FlexRowDiv,
    GrayWorld,
    GreenWorld,
    PlayerColumnDiv,
    YellowWorld
} from "../styled-components";

const getCorrectIcon = (tile) => {
    switch (tile.tileType) {
        case tileTypes.BLUE_WORLD:
            return <BlueWorld icon={faGlobe} size='2x'/>;
        case tileTypes.BROWN_WORLD:
            return <BrownWorld icon={faGlobe} size='2x'/>;
        case tileTypes.DEVELOPMENT:
            return <Development icon={faSatellite} size='2x'/>;
        case tileTypes.GRAY_WORLD:
            return <GrayWorld icon={faGlobe} size='2x'/>;
        case tileTypes.GREEN_WORLD:
            return <GreenWorld icon={faGlobe} size='2x'/>;
        case tileTypes.YELLOW_WORLD:
            return <YellowWorld icon={faGlobe} size='2x'/>;
        default:
            return null;
    }
};

const displayPowers = (phasePowers) => {
    let powerList = [];
    for (let phase in phases) {
        if(phasePowers[phases[phase]].length > 0){
            powerList.push(phasePowers[phases[phase]].map((phasePower, id) => {
                return (<p key={id}>{phases[phase]}: {phasePower}</p>);
            }));
        }
    }
    return powerList;
};

const getDicePool = (dicePool) => {
    if (dicePool) {
        return dicePool.map((die, id) => {
            return (<Dice key={id} color={die.color} face={die.value} />);
        });
    }
    return null;
};

const PlayerBoards = (props) => {
    return (
        <FlexColumnDiv data-testid='player-boards'>
            {props.game.players.map((player) => {
                    return (
                        <PlayerColumnDiv key={player.id}>
                            <FlexRowDiv>
                                <FontAwesomeIcon icon={faMoneyCheckAlt} size='2x'/>
                                <BigText>{player.credits}</BigText>
                                <FlexRowDiv>
                                    <BigText>Citizenry: </BigText>{getDicePool(player.citizenry)}
                                </FlexRowDiv>
                                <FlexRowDiv>
                                    <BigText>Cup: </BigText>{getDicePool(player.cup)}
                                </FlexRowDiv>
                            </FlexRowDiv>
                            <FlexRowDiv>
                                {player.tiles.map((tile) => {
                                    return (
                                        <FlexRowDiv key={tile.tileId}>
                                            {getCorrectIcon(tile)}
                                            {getDicePool(tile.die)}
                                            <BigText>{tile.name}</BigText>
                                        </FlexRowDiv>
                                    );
                                })}
                            </FlexRowDiv>
                            <div>
                                {displayPowers(player.phasePowers)}
                            </div>
                        </PlayerColumnDiv>
                    );
                }
            )}
        </FlexColumnDiv>
    );
};

export default PlayerBoards;
