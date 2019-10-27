import React from "react";
import Die, {DieProps} from "./Die";

export type DicePoolProps = {
    dice: Array<DieProps>
}

class DicePool extends React.Component<DicePoolProps, {}> {
    getDicePool = (dicePool: any) => {
        if (dicePool) {
            return dicePool.map((die: any, id: any) => {
                return (<Die key={id} color={die.color} face={die.value}/>);
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
