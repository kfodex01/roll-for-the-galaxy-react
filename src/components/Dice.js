import React from "react";
import {faEye, faSatellite, faGlobe, faIndustry, faRocket, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {gameColors} from "../enums";

const BlueDie = styled.div`
  background: ${gameColors.BLUE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const BrownDie = styled.div`
  background: ${gameColors.BROWN};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const GreenDie = styled.div`
  background: ${gameColors.GREEN};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const PurpleDie = styled.div`
  background: ${gameColors.PURPLE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const RedDie = styled.div`
  background: ${gameColors.RED};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const WhiteDie = styled.div`
  background: ${gameColors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const YellowDie = styled.div`
  background: ${gameColors.YELLOW};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const Dice = () => {
    return (
        <>
            <WhiteDie>
                <FontAwesomeIcon icon={faEye}/>
            </WhiteDie>
            <RedDie>
                <FontAwesomeIcon icon={faSatellite}/>
            </RedDie>
            <PurpleDie>
                <FontAwesomeIcon icon={faGlobe}/>
            </PurpleDie>
            <BlueDie>
                <FontAwesomeIcon icon={faIndustry}/>
            </BlueDie>
            <BrownDie>
                <FontAwesomeIcon icon={faRocket}/>
            </BrownDie>
            <GreenDie>
                <FontAwesomeIcon icon={faStarOfLife}/>
            </GreenDie>
            <YellowDie>
                <FontAwesomeIcon icon={faEye}/>
            </YellowDie>
        </>
    );
};

export default Dice;
