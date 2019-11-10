import React from 'react';
import Game from "./components/Game";
import {initialState} from "./enums";

class App extends React.Component {
    render() {
        return (
            <Game initialState={JSON.parse(JSON.stringify(initialState))} />
        );
    }
}

export default App;
