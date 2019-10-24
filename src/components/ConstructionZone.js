import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import {BigText, FlexRowDiv} from "../styled-components";
import Tile from "./Tile";

class ConstructionZone extends React.Component {
    render() {
        return (
            <FlexRowDiv>
                <FontAwesomeIcon icon={faWrench} size='2x' />
                <BigText>{this.props.developBuildQueue[0].tiles[0].points}</BigText>
                <Tile key={this.props.developBuildQueue[0].tiles[0].tileId} {...this.props.developBuildQueue[0].tiles[0]} />
                <BigText>{this.props.settleBuildQueue[0].tiles[1].points}</BigText>
                <Tile key={this.props.settleBuildQueue[0].tiles[1].tileId} {...this.props.settleBuildQueue[0].tiles[1]} />
            </FlexRowDiv>
        )
    }
}

export default ConstructionZone;
