import { DicePoolProps } from '../DicePool';
import { DieProps } from '../Die';
import { dieColor, dieFace } from '../../enums';
import Chance from 'chance';

class DiceManager {
    chance = new Chance();

    rollDice = (dicePool: DicePoolProps): DicePoolProps => {
        let rolledDicePool: DicePoolProps = {
            dice: []
        };
        dicePool.dice.forEach((die: DieProps, id: number) => {
            switch (die.color) {
                case dieColor.BLUE:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.PRODUCE,
                            dieFace.PRODUCE,
                            dieFace.SHIP,
                            dieFace.SHIP,
                            dieFace.WILD
                        ])
                    });
                    break;
                case dieColor.BROWN:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.DEVELOP,
                            dieFace.DEVELOP,
                            dieFace.PRODUCE,
                            dieFace.SHIP,
                            dieFace.WILD
                        ])
                    });
                    break;
                case dieColor.GREEN:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.SETTLE,
                            dieFace.SETTLE,
                            dieFace.PRODUCE,
                            dieFace.WILD,
                            dieFace.WILD
                        ])
                    });
                    break;
                case dieColor.PURPLE:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.DEVELOP,
                            dieFace.SHIP,
                            dieFace.SHIP,
                            dieFace.SHIP,
                            dieFace.WILD
                        ])
                    });
                    break;
                case dieColor.RED:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.DEVELOP,
                            dieFace.DEVELOP,
                            dieFace.SETTLE,
                            dieFace.SETTLE,
                            dieFace.WILD
                        ])
                    });
                    break;
                case dieColor.WHITE:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.EXPLORE,
                            dieFace.EXPLORE,
                            dieFace.DEVELOP,
                            dieFace.SETTLE,
                            dieFace.PRODUCE,
                            dieFace.SHIP
                        ])
                    });
                    break;
                case dieColor.YELLOW:
                    rolledDicePool.dice.push({
                        color: die.color,
                        id: id.toString(),
                        face: this.chance.pickone([
                            dieFace.DEVELOP,
                            dieFace.SETTLE,
                            dieFace.PRODUCE,
                            dieFace.WILD,
                            dieFace.WILD,
                            dieFace.WILD
                        ])
                    });
                    break;
            };
        });
        return rolledDicePool;
    };
};

export default DiceManager;