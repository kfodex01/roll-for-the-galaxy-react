import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Start from "./components/Start";

const { createBrowserHistory } = require('history');

const App = () => {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/start" component={Start} />
            </Switch>
        </Router>
    );
};

export default App;
