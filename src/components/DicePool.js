import React from "react";
import Die from "./Die";

class DicePool extends React.Component {
    getDicePool = (dicePool) => {
        if (dicePool) {
            return dicePool.map((die, id) => {
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
