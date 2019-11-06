import React from "react";

class StartForm extends React.Component {
    buildPlayersAndHideForm = (numberOfPlayers) => {
        this.props.hideBeginGameForm();
        this.props.createPlayers(numberOfPlayers);
    };

    render() {
        return (
            <div data-testid='start-form'>
                <p>I was changed</p>
                <p>{'Please select number of players'}</p>
                <div>
                    <button onClick={() => this.buildPlayersAndHideForm(1)}>{'1'}</button>
                    <button onClick={() => this.buildPlayersAndHideForm(2)}>{'2'}</button>
                    <button onClick={() => this.buildPlayersAndHideForm(3)}>{'3'}</button>
                    <button onClick={() => this.buildPlayersAndHideForm(4)}>{'4'}</button>
                    <button onClick={() => this.buildPlayersAndHideForm(5)}>{'5'}</button>
                </div>
            </div>
        );
    }
}

export default StartForm;
