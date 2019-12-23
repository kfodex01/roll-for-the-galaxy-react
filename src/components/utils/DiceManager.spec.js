import DiceManager from './DiceManager';
import { dieColor, dieFace } from '../../enums';
import Chance from 'chance';

jest.mock('chance');

describe('DiceManager', () => {
    let diceManager, diePoolToRoll;

    beforeEach(() => {
        diceManager = new DiceManager();

        diePoolToRoll = {
            dice: [
                {
                    face: dieFace.EXPLORE
                }
            ]
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('rollDice', () => {
        it('should call chance with the correct distribution of a blue die', () => {
            diePoolToRoll.dice[0].color = dieColor.BLUE;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.PRODUCE,
                dieFace.PRODUCE,
                dieFace.SHIP,
                dieFace.SHIP,
                dieFace.WILD
            ]);
        });

        it('should call chance with the correct distribution of a brown die', () => {
            diePoolToRoll.dice[0].color = dieColor.BROWN;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.DEVELOP,
                dieFace.DEVELOP,
                dieFace.PRODUCE,
                dieFace.SHIP,
                dieFace.WILD
            ]);
        });

        it('should call chance with the correct distribution of a green die', () => {
            diePoolToRoll.dice[0].color = dieColor.GREEN;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.SETTLE,
                dieFace.SETTLE,
                dieFace.PRODUCE,
                dieFace.WILD,
                dieFace.WILD
            ]);
        });

        it('should call chance with the correct distribution of a purple die', () => {
            diePoolToRoll.dice[0].color = dieColor.PURPLE;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.DEVELOP,
                dieFace.SHIP,
                dieFace.SHIP,
                dieFace.SHIP,
                dieFace.WILD
            ]);
        });

        it('should call chance with the correct distribution of a red die', () => {
            diePoolToRoll.dice[0].color = dieColor.RED;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.DEVELOP,
                dieFace.DEVELOP,
                dieFace.SETTLE,
                dieFace.SETTLE,
                dieFace.WILD
            ]);
        });

        it('should call chance with the correct distribution of a white die', () => {
            diePoolToRoll.dice[0].color = dieColor.WHITE;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.EXPLORE,
                dieFace.EXPLORE,
                dieFace.DEVELOP,
                dieFace.SETTLE,
                dieFace.PRODUCE,
                dieFace.SHIP
            ]);
        });

        it('should call chance with the correct distribution of a yellow die', () => {
            diePoolToRoll.dice[0].color = dieColor.YELLOW;

            diceManager.rollDice(diePoolToRoll);

            expect(Chance.prototype.pickone).toHaveBeenCalledWith([
                dieFace.DEVELOP,
                dieFace.SETTLE,
                dieFace.PRODUCE,
                dieFace.WILD,
                dieFace.WILD,
                dieFace.WILD
            ]);
        });
    });
});
