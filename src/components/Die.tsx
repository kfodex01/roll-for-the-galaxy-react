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
  margin: 0px 2px;
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
        ColoredDie: BlueDie,
        name: "BlueDie"
    },
    [dieColor.BROWN]: {
        ColoredDie: BrownDie,
        name: "BrownDie"
    },
    [dieColor.GREEN]: {
        ColoredDie: GreenDie,
        name: "GreenDie"
    },
    [dieColor.PURPLE]: {
        ColoredDie: PurpleDie,
        name: "PurpleDie"
    },
    [dieColor.RED]: {
        ColoredDie: RedDie,
        name: "RedDie"
    },
    [dieColor.WHITE]: {
        ColoredDie: WhiteDie,
        name: "WhiteDie"
    },
    [dieColor.YELLOW]: {
        ColoredDie: YellowDie,
        name: "YellowDie"
    }
};

export interface DieProps {
    color: string;
    face: string;
    draggable?: boolean;
    id?: string;
    onDragStart?(event: React.DragEvent<HTMLDivElement>, id: string): void;
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

    handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
        if(this.props.id && this.props.onDragStart) {
            this.props.onDragStart(event, this.props.id);
        }
    }

    render() {
        const { ColoredDie, name } = colorMap[this.props.color];
        if(this.props.draggable) {
            return (
                <ColoredDie data-testid={name} onDragStart={this.handleDragStart} draggable>
                    {this.getDieFace(this.props.face)}
                </ColoredDie>
            );
        }

        return (
            <ColoredDie data-testid={name}>
                {this.getDieFace(this.props.face)}
            </ColoredDie>
        );
    }
}

export default Die;
