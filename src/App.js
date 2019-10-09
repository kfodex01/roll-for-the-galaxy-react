import React from 'react';
import Start from "./components/Start";
import {Provider} from "react-redux";
import store from "./store.js";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Start/>
            </Provider>
        );
    }
};

export default App;
