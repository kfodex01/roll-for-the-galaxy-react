import React from "react";

const StartForm = (props) => {
    const buildPlayersAndHideForm = (numberOfPlayers) => {
        props.hideBeginGameForm();
        props.createPlayers(numberOfPlayers);
    };

    return (
        <div>
            <p>{'Please select number of players'}</p>
            <div>
                <button onClick={() => buildPlayersAndHideForm(1)}>{'1'}</button>
                <button onClick={() => buildPlayersAndHideForm(2)}>{'2'}</button>
                <button onClick={() => buildPlayersAndHideForm(3)}>{'3'}</button>
                <button onClick={() => buildPlayersAndHideForm(4)}>{'4'}</button>
                <button onClick={() => buildPlayersAndHideForm(5)}>{'5'}</button>
            </div>
        </div>
    );
};

export default StartForm;
