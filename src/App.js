import React from 'react';
import Game from './components/Game';
import GameManager from './components/utils/GameManager';

class App extends React.Component {
    render() {
        return (
            <Game gameManager={new GameManager()} />
        );
    }
}

export default App;
