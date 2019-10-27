import React from "react";
import {faEye, faSatellite, faGlobe, faIndustry, faRocket, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {gameColors, dieColors, phases} from "../enums";

const DieDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 1px #000000 solid;
`;

const BlueDie = styled(DieDiv)`
  background: ${gameColors.BLUE};
`;

const BrownDie = styled(DieDiv)`
  background: ${gameColors.BROWN};
`;

const GreenDie = styled(DieDiv)`
  background: ${gameColors.GREEN};
`;

const PurpleDie = styled(DieDiv)`
  background: ${gameColors.PURPLE};
`;

const RedDie = styled(DieDiv)`
  background: ${gameColors.RED};
`;

const WhiteDie = styled(DieDiv)`
  background: ${gameColors.WHITE};
`;

const YellowDie = styled(DieDiv)`
  background: ${gameColors.YELLOW};
`;

class Die extends React.Component {
    getDieFace = (dieFace) => {
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

    render() {
        switch (this.props.color) {
            case dieColors.BLUE:
                return (
                    <BlueDie data-testid='BlueDie'>
                        {this.getDieFace(this.props.face)}
                    </BlueDie>
                );
            case dieColors.BROWN:
                return (
                    <BrownDie data-testid='BrownDie'>
                        {this.getDieFace(this.props.face)}
                    </BrownDie>
                );
            case dieColors.GREEN:
                return (
                    <GreenDie data-testid='GreenDie'>
                        {this.getDieFace(this.props.face)}
                    </GreenDie>
                );
            case dieColors.PURPLE:
                return (
                    <PurpleDie data-testid='PurpleDie'>
                        {this.getDieFace(this.props.face)}
                    </PurpleDie>
                );
            case dieColors.RED:
                return (
                    <RedDie data-testid='RedDie'>
                        {this.getDieFace(this.props.face)}
                    </RedDie>
                );
            case dieColors.WHITE:
                return (
                    <WhiteDie data-testid='WhiteDie'>
                        {this.getDieFace(this.props.face)}
                    </WhiteDie>
                );
            case dieColors.YELLOW:
                return (
                    <YellowDie data-testid='YellowDie'>
                        {this.getDieFace(this.props.face)}
                    </YellowDie>
                );
            default:
                return null;
        }
    }
}

export default Die;
