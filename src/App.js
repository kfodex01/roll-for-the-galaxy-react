import React from 'react';
import Start from "./components/Game";
import {Provider} from "react-redux";
import {initializeStore} from "./store.js";

class App extends React.Component {
    render() {
        return (
            <Provider store={initializeStore()}>
                <Start/>
            </Provider>
        );
    }
};

export default App;
