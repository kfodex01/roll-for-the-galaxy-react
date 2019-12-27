import Chance from 'chance';
import { DieProps } from '../components/Die';
import { dieColor, dieFace, tileTypes } from '../enums';
import { TileProps } from '../components/Tile';

const chance = new Chance();

export const getMockDie = (): DieProps => {
    return {
        color: chance.pickone([
            dieColor.BLUE,
            dieColor.BROWN,
            dieColor.GREEN,
            dieColor.PURPLE,
            dieColor.RED,
            dieColor.WHITE,
            dieColor.YELLOW
        ]),
        face: chance.pickone([
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.SETTLE,
            dieFace.PRODUCE,
            dieFace.SHIP,
            dieFace.WILD
        ])
    }
};

export const getMockTile = (name: string = chance.word(), points: number = chance.integer({ min: 1, max: 100 })): TileProps => {
    return {
        name,
        points,
        tileType: chance.pickone([
            tileTypes.BLUE_WORLD,
            tileTypes.BROWN_WORLD,
            tileTypes.DEVELOPMENT,
            tileTypes.GRAY_WORLD,
            tileTypes.GREEN_WORLD,
            tileTypes.YELLOW_WORLD
        ])
    }
};
