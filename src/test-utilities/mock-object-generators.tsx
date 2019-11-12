import Chance from 'chance';
import { DieProps } from '../components/Die';
import { dieColor, dieFace, tileTypes } from '../enums';
import { TileProps } from '../components/Tile';
import { Tiles } from '../components/ConstructionZone';

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

export const getArrayOfRandomDice = (): Array<DieProps> => {
    let numberOfDice: number = chance.d10();
    let result: Array<DieProps> = [];

    for(let i: number = 0; i < numberOfDice; i++) {
        result.push(getMockDie());
    };

    return result;
}

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

export const getMockFullTile = (names: Array<string> = [chance.word(), chance.word()], points: Array<number> = [chance.integer({ min: 1, max: 100 }), chance.integer({ min: 1, max: 100 })]): Tiles => {
    return {
        tileId: chance.integer({ min: 1, max: 100 }),
        tiles: [
            getMockTile(names[0], points[0]),
            getMockTile(names[1], points[1])
        ]
    };
};

export const getArrayOfRandomTiles = (): Array<Tiles> => {
    let numberOfTiles: number = chance.d10();
    let result: Array<Tiles> = [];

    for(let i: number = 0; i < numberOfTiles; i++) {
        result.push(getMockFullTile());
    };

    return result;
}
