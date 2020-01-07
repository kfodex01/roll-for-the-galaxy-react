import React from 'react';
import Game from './components/Game';
import GameManager from './components/utils/GameManager';
import DiceManager from './components/utils/DiceManager';

class App extends React.Component {
    render() {
        return (
            <Game gameManager={new GameManager()} diceManager={new DiceManager()} />
        );
    }
}

export default App;
