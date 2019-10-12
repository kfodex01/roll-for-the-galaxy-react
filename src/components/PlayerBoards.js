import React from "react";
import {faSatellite, faGlobe, faMoneyCheckAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {phases, tileTypes} from "../enums";

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayerColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #dddddd;
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
  color: #00aadd;
`;

const BrownWorld = styled(FontAwesomeIcon)`
  color: #8b4513;
`;

const Development = styled(FontAwesomeIcon)`
  color: #000000;
`;

const GrayWorld = styled(FontAwesomeIcon)`
  color: #808080;
`;

const GreenWorld = styled(FontAwesomeIcon)`
  color: #008000;
`;

const YellowWorld = styled(FontAwesomeIcon)`
  color: #dddd00;
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
    let powerList = [], id = 0;
    for (let phase in phases) {
        if(phasePowers[phases[phase]].length > 0){
            powerList.push(phasePowers[phases[phase]].map((phasePower) => {
                id++;
                return (<p key={id}>{phases[phase]}: {phasePower}</p>);
            }));
        }
    }
    return powerList;
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
                            </FlexRowDiv>
                            <FlexRowDiv>
                                {player.tiles.map((tile) => {
                                    return (
                                        <FlexRowDiv key={tile.tileId}>
                                            {getCorrectIcon(tile)}
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
