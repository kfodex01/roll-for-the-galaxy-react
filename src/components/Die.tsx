import React from "react";
import { faEye, faSatellite, faGlobe, faIndustry, faRocket, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import { dieColor, dieFace, gameColors } from "../enums";

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

const colorMap = {
    [dieColor.BLUE]: {
        Die: BlueDie,
        name: "BlueDie"
    },
    [dieColor.BROWN]: {
        Die: BrownDie,
        name: "BrownDie"
    },
    [dieColor.GREEN]: {
        Die: GreenDie,
        name: "GreenDie"
    },
    [dieColor.PURPLE]: {
        Die: PurpleDie,
        name: "PurpleDie"
    },
    [dieColor.RED]: {
        Die: RedDie,
        name: "RedDie"
    },
    [dieColor.WHITE]: {
        Die: WhiteDie,
        name: "WhiteDie"
    },
    [dieColor.YELLOW]: {
        Die: YellowDie,
        name: "YellowDie"
    }
};

export interface DieProps {
    color: string;
    face: string;
    draggable?: boolean;
    poolId?: number;
}

class Die extends React.Component<DieProps> {
    getDieFace = (face: string): JSX.Element => {
        switch (face) {
            case dieFace.EXPLORE:
                return (<FontAwesomeIcon data-testid='explore-face' icon={faEye} />);
            case dieFace.DEVELOP:
                return (<FontAwesomeIcon data-testid='develop-face' icon={faSatellite} />);
            case dieFace.SETTLE:
                return (<FontAwesomeIcon data-testid='settle-face' icon={faGlobe} />);
            case dieFace.PRODUCE:
                return (<FontAwesomeIcon data-testid='produce-face' icon={faIndustry} />);
            case dieFace.SHIP:
                return (<FontAwesomeIcon data-testid='ship-face' icon={faRocket} />);
            case dieFace.WILD:
                return (<FontAwesomeIcon data-testid='wild-face' icon={faStarOfLife} />);
            default:
                return (<p>{`Invalid die face: ${face}`}</p>);
        }
    };

    render() {
        const { Die, name } = colorMap[this.props.color];
        if(this.props.draggable) {
            return (
                <Die data-testid={name} draggable>
                    {this.getDieFace(this.props.face)}
                </Die>
            );
        }

        return (
            <Die data-testid={name}>
                {this.getDieFace(this.props.face)}
            </Die>
        );
    }
}

export default Die;
