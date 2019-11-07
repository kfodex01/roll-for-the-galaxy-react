import React from "react";
import Die, {DieProps} from "./Die";

export interface DicePoolProps {
    dice: Array<DieProps>;
}

class DicePool extends React.Component<DicePoolProps> {
    getDicePool = (dicePool: Array<DieProps>) => {
        if (dicePool) {
            return dicePool.map((die: DieProps, id: number) => {
                return (<Die key={id} color={die.color} face={die.face}/>);
            });
        }
        return null;
    };

    render() {
        return(
            this.getDicePool(this.props.dice)
        );
    }
}
export default DicePool;
