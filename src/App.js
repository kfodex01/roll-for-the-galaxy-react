import React from 'react';
import Game from "./components/Game";
import {initialGameState} from "./enums";

class App extends React.Component {
    render() {
        return (
            <Game initialGameState={initialGameState} />
        );
    }
}

export default App;
