import React from "react";

const StartForm = (props) => {
    const buildPlayersAndHideForm = (numberOfPlayers) => {
        props.actions.hideBeginGameForm();

        const players = [];
        for(let i = 0; i < numberOfPlayers; i++) {
            players.push({id: i + 1});
        }

        props.actions.createPlayers(players);
    };

    return (
        <div data-testid='begin-game-form'>
            <p>{'Please select number of players'}</p>
            <div data-testid='begin-game-form-number-buttons-div'>
                <button onClick={() => buildPlayersAndHideForm(1)}>{'1'}</button>
            </div>
        </div>
    );
};

export default StartForm;
