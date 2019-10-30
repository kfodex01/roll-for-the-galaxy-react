import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import {BigText, FlexRowDiv} from "../styled-components";
import Tile, {TileProps} from "./Tile";

export interface Tiles {
    tileId: number;
    tiles: Array<TileProps>;
}

interface ConstructionZoneProps {
    developBuildQueue: Array<Tiles>;
    settleBuildQueue: Array<Tiles>;
}

class ConstructionZone extends React.Component<ConstructionZoneProps> {
    render() {
        return (
            <FlexRowDiv>
                <FontAwesomeIcon icon={faWrench} size='2x' />
                {this.props.developBuildQueue.length > 0 ?
                <>
                    <BigText>{this.props.developBuildQueue[0].tiles[0].points}</BigText>
                    <Tile key={this.props.developBuildQueue[0].tiles[0].tileId} {...this.props.developBuildQueue[0].tiles[0]} />
                </>
                    : null}
                {this.props.settleBuildQueue.length > 0 ?
                    <>
                        <BigText>{this.props.settleBuildQueue[0].tiles[1].points}</BigText>
                        <Tile key={this.props.settleBuildQueue[0].tiles[1].tileId} {...this.props.settleBuildQueue[0].tiles[1]} />
                    </>
                    : null}
            </FlexRowDiv>
        )
    }
}

export default ConstructionZone;
