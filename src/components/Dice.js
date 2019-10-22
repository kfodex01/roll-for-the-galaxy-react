import React from "react";
import {faEye, faSatellite, faGlobe, faIndustry, faRocket, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {gameColors, dieColors, phases} from "../enums";

const Die = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const BlueDie = styled(Die)`
  background: ${gameColors.BLUE};
`;

const BrownDie = styled(Die)`
  background: ${gameColors.BROWN};
`;

const GreenDie = styled(Die)`
  background: ${gameColors.GREEN};
`;

const PurpleDie = styled(Die)`
  background: ${gameColors.PURPLE};
`;

const RedDie = styled(Die)`
  background: ${gameColors.RED};
`;

const WhiteDie = styled(Die)`
  background: ${gameColors.WHITE};
`;

const YellowDie = styled(Die)`
  background: ${gameColors.YELLOW};
`;

const getDieFace = (dieFace) => {
    switch (dieFace) {
        case phases.EXPLORE:
            return (<FontAwesomeIcon icon={faEye}/>);
        case phases.DEVELOP:
            return (<FontAwesomeIcon icon={faSatellite}/>);
        case phases.SETTLE:
            return (<FontAwesomeIcon icon={faGlobe}/>);
        case phases.PRODUCE:
            return (<FontAwesomeIcon icon={faIndustry}/>);
        case phases.SHIP:
            return (<FontAwesomeIcon icon={faRocket}/>);
        case phases.ASSIGNMENT:
            return (<FontAwesomeIcon icon={faStarOfLife}/>);
        default:
            return null;
    }
};

const Dice = (props) => {
    switch (props.color) {
        case dieColors.BLUE:
            return (
                <BlueDie data-testid='BlueDie'>
                    {getDieFace(props.face)}
                </BlueDie>
            );
        case dieColors.BROWN:
            return (
                <BrownDie data-testid='BrownDie'>
                    {getDieFace(props.face)}
                </BrownDie>
            );
        case dieColors.GREEN:
            return (
                <GreenDie data-testid='GreenDie'>
                    {getDieFace(props.face)}
                </GreenDie>
            );
        case dieColors.PURPLE:
            return (
                <PurpleDie data-testid='PurpleDie'>
                    {getDieFace(props.face)}
                </PurpleDie>
            );
        case dieColors.RED:
            return (
                <RedDie data-testid='RedDie'>
                    {getDieFace(props.face)}
                </RedDie>
            );
        case dieColors.WHITE:
            return (
                <WhiteDie data-testid='WhiteDie'>
                    {getDieFace(props.face)}
                </WhiteDie>
            );
        case dieColors.YELLOW:
            return (
                <YellowDie data-testid='YellowDie'>
                    {getDieFace(props.face)}
                </YellowDie>
            );
        default:
            return null;
    }
};

export default Dice;
