import React from "react";
import {faEye, faSatellite, faGlobe, faIndustry, faRocket, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import {dieColor, dieFace, gameColors} from "../enums";

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

export type DieProps = {
    color: string,
    face: string
}

class Die extends React.Component<DieProps, {}> {
    getDieFace = (face: string) => {
        switch (face) {
            case dieFace.EXPLORE:
                return (<FontAwesomeIcon icon={faEye}/>);
            case dieFace.DEVELOP:
                return (<FontAwesomeIcon icon={faSatellite}/>);
            case dieFace.SETTLE:
                return (<FontAwesomeIcon icon={faGlobe}/>);
            case dieFace.PRODUCE:
                return (<FontAwesomeIcon icon={faIndustry}/>);
            case dieFace.SHIP:
                return (<FontAwesomeIcon icon={faRocket}/>);
            case dieFace.WILD:
                return (<FontAwesomeIcon icon={faStarOfLife}/>);
            default:
                return null;
        }
    };

    render() {
        switch (this.props.color) {
            case dieColor.BLUE:
                return (
                    <BlueDie data-testid='BlueDie'>
                        {this.getDieFace(this.props.face)}
                    </BlueDie>
                );
            case dieColor.BROWN:
                return (
                    <BrownDie data-testid='BrownDie'>
                        {this.getDieFace(this.props.face)}
                    </BrownDie>
                );
            case dieColor.GREEN:
                return (
                    <GreenDie data-testid='GreenDie'>
                        {this.getDieFace(this.props.face)}
                    </GreenDie>
                );
            case dieColor.PURPLE:
                return (
                    <PurpleDie data-testid='PurpleDie'>
                        {this.getDieFace(this.props.face)}
                    </PurpleDie>
                );
            case dieColor.RED:
                return (
                    <RedDie data-testid='RedDie'>
                        {this.getDieFace(this.props.face)}
                    </RedDie>
                );
            case dieColor.WHITE:
                return (
                    <WhiteDie data-testid='WhiteDie'>
                        {this.getDieFace(this.props.face)}
                    </WhiteDie>
                );
            case dieColor.YELLOW:
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
