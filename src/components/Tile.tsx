import React from 'react';
import {
    BigText,
    BlueWorld,
    BrownWorld,
    Development,
    FlexRowDiv,
    GrayWorld,
    GreenWorld,
    YellowWorld
} from "../styled-components";
import {tileTypes} from "../enums";
import {faGlobe, faSatellite} from "@fortawesome/free-solid-svg-icons";
import DicePool, {DicePoolProps} from "./DicePool";

export interface TileProps {
    dicePool: DicePoolProps;
    name: string;
    points: number;
    tileId: number;
    bonus: string;
    assignment: string;
    explore: string;
    develop: string;
    settle: string;
    produce: string;
    ship: string;
    endGame: string;
}

class Tile extends React.Component<TileProps> {
    getCorrectIcon = (tile: any) => {
        switch (tile.tileType) {
            case tileTypes.BLUE_WORLD:
                return <BlueWorld icon={faGlobe} size='2x'/>;
            case tileTypes.BROWN_WORLD:
                return <BrownWorld icon={faGlobe} size='2x'/>;
            case tileTypes.DEVELOPMENT:
                return <Development icon={faSatellite} size='2x'/>;
            case tileTypes.GRAY_WORLD:
                return <GrayWorld icon={faGlobe} size='2x'/>;
            case tileTypes.GREEN_WORLD:
                return <GreenWorld icon={faGlobe} size='2x'/>;
            case tileTypes.YELLOW_WORLD:
                return <YellowWorld icon={faGlobe} size='2x'/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <FlexRowDiv key={this.props.tileId}>
                {this.getCorrectIcon(this.props)}
                {this.props.dicePool ? <DicePool dice={this.props.dicePool.dice} /> : null}
                <BigText>{this.props.name}</BigText>
            </FlexRowDiv>
        );
    }
}

export default Tile;
