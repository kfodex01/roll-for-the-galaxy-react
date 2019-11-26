import React from "react";
import Die, { DieProps } from "./Die";

export interface DicePoolProps {
    dice: Array<DieProps>;
}

class DicePool extends React.Component<DicePoolProps> {
    getDicePool = (dicePool: DicePoolProps): JSX.Element[] => {
        return dicePool.dice.map((die: DieProps, id: number) => {
            return (<Die key={id} color={die.color} face={die.face} />);
        });
    };

    render() {
        return (
            this.getDicePool(this.props)
        );
    }
}
export default DicePool;
