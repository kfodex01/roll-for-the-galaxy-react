import React from "react";
import {faSatellite, faGlobe, faMoneyCheckAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {phases, tileTypes, gameColors} from "../enums";
import Dice from "./Dice";

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayerColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ededed;
  margin: 3px;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const BigText = styled.p`
  font-family: sans-serif;
  font-size: 20px;
  margin: 0;
  padding: 5px;
`;

const BlueWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.BLUE};
`;

const BrownWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.BROWN};
`;

const Development = styled(FontAwesomeIcon)`
  color: ${gameColors.BLACK};
`;

const GrayWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.GRAY};
`;

const GreenWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.GREEN};
`;

const YellowWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.YELLOW};
`;

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
