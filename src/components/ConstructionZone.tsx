import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { BigText, FlexRowDiv } from "../styled-components";
import Tile, { TileProps } from "./Tile";

export interface Tiles {
    tileId: number;
    tiles: Array<TileProps>;
}

interface ConstructionZoneProps {
    developBuildQueue: Array<Tiles>;
    settleBuildQueue: Array<Tiles>;
}

class ConstructionZone extends React.Component<ConstructionZoneProps> {
    renderBuildQueue = (queue: Array<Tiles>, isDevelopQueue: boolean): JSX.Element => {
        if (queue.length === 0) {
            let queueName: string = isDevelopQueue ? 'development' : 'settlement';
            return (
                <>
                    <FontAwesomeIcon icon={faTimesCircle} size='2x' />
                    <BigText>{`No tiles in ${queueName} build queue`}</BigText>
                </>
            );
        };

        let tileIndex: number = isDevelopQueue ? 0 : 1;

        return (
            <>
                <BigText>{queue[0].tiles[tileIndex].points}</BigText>
                <Tile key={queue[0].tiles[tileIndex].tileId} {...queue[0].tiles[tileIndex]} />
            </>
        );
    };

    render() {
        return (
            <FlexRowDiv data-testid='build-queues'>
                <FontAwesomeIcon icon={faWrench} size='2x' />
                {this.renderBuildQueue(this.props.developBuildQueue, true)}
                {this.renderBuildQueue(this.props.settleBuildQueue, false)}
            </FlexRowDiv>
        )
    }
}

export default ConstructionZone;
