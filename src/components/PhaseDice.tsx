import React from "react";
import { faEye, faSatellite, faGlobe, faIndustry, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexRowDiv } from "../styled-components";
import styled from 'styled-components';

const PhaseDieDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  border: 10px #000000 solid;
  margin: 0px 2px;
  background-color: #E0E0E0;
`;

const ActivePhaseDieDiv = styled(PhaseDieDiv)`
  background-color: #000000;
`;

interface PhaseDiceProps {
    explore: boolean,
    develop: boolean,
    settle: boolean,
    produce: boolean,
    ship: boolean
};

export class PhaseDice extends React.Component<PhaseDiceProps> {
    render() {
        return (
            <FlexRowDiv>
                {this.props.explore ?
                    <ActivePhaseDieDiv data-testid="active-explore-phase">
                        <FontAwesomeIcon icon={faEye} size="2x" color="white" />
                    </ActivePhaseDieDiv>
                    :
                    <PhaseDieDiv>
                        <FontAwesomeIcon icon={faEye} size="2x" color="white" />
                    </PhaseDieDiv>
                }
                {this.props.develop ?
                    <ActivePhaseDieDiv data-testid="active-develop-phase">
                        <FontAwesomeIcon icon={faSatellite} size="2x" color="white" />
                    </ActivePhaseDieDiv>
                    :
                    <PhaseDieDiv>
                        <FontAwesomeIcon icon={faSatellite} size="2x" color="white" />
                    </PhaseDieDiv>
                }
                {this.props.settle ?
                    <ActivePhaseDieDiv data-testid="active-settle-phase">
                        <FontAwesomeIcon icon={faGlobe} size="2x" color="white" />
                    </ActivePhaseDieDiv>
                    :
                    <PhaseDieDiv>
                        <FontAwesomeIcon icon={faGlobe} size="2x" color="white" />
                    </PhaseDieDiv>
                }
                {this.props.produce ?
                    <ActivePhaseDieDiv data-testid="active-produce-phase">
                        <FontAwesomeIcon icon={faIndustry} size="2x" color="white" />
                    </ActivePhaseDieDiv>
                    :
                    <PhaseDieDiv>
                        <FontAwesomeIcon icon={faIndustry} size="2x" color="white" />
                    </PhaseDieDiv>
                }
                {this.props.ship ?
                    <ActivePhaseDieDiv data-testid="active-ship-phase">
                        <FontAwesomeIcon icon={faRocket} size="2x" color="white" />
                    </ActivePhaseDieDiv>
                    :
                    <PhaseDieDiv>
                        <FontAwesomeIcon icon={faRocket} size="2x" color="white" />
                    </PhaseDieDiv>
                }
            </FlexRowDiv>
        );
    };
};