import React from "react";
import StartForm from "./StartForm";
import {BigText, FlexColumnDiv} from "../styled-components";
import PlayerBoard from "./PlayerBoard";
import {initialGameState} from "../enums";
import Chance from "chance";

const chance = new Chance();

class Game extends React.Component {
    state = {
        game: {...initialGameState},
        visibility: true
    };

    hideBeginGameForm = () => {
        this.setState((state) => {
            return({
                ...state,
                visibility: false
            })
        });
    };

    createPlayers = (numberOfPlayers) => {
        this.setState((state) => {
            const victoryPointPool = 12 * numberOfPlayers;
            const players = [];
            const factionTiles = chance.pickset(state.game.factionTiles, numberOfPlayers);
            const homeWorldTiles = chance.pickset(state.game.homeWorldTiles, numberOfPlayers);
            const gameTiles = chance.pickset(state.game.gameTiles, numberOfPlayers * 2);
            for (let i = 0; i < numberOfPlayers; i++) {
                players.push(
                    {
                        id: i + 1,
                        startingTiles: {
                            factionTile: factionTiles[i],
                            homeWorldTile: homeWorldTiles[i],
                            gameTiles: [
                                gameTiles[i * 2],
                                gameTiles[(i * 2) + 1]
                            ]
                        }
                    }
                );
            }
            state.game.victoryPointPool = victoryPointPool;
            state.game.players = players;
            for (let i = 0; i < numberOfPlayers; i++) {
                state.game.factionTiles = state.game.factionTiles.filter(tile => tile.tileId !== factionTiles[i].tileId);
                state.game.homeWorldTiles = state.game.homeWorldTiles.filter(tile => tile.tileId !== homeWorldTiles[i].tileId);
                state.game.gameTiles = state.game.gameTiles.filter(tile => tile.tileId !== gameTiles[i * 2].tileId);
                state.game.gameTiles = state.game.gameTiles.filter(tile => tile.tileId !== gameTiles[(i * 2) + 1].tileId);
            }
            return({
                ...state
            })
        });
    };

    render() {
        return (
            <>
                {this.state.visibility === true ?
                    (
                        <StartForm hideBeginGameForm={this.hideBeginGameForm} createPlayers={this.createPlayers} />
                    ) :
                    <>
                        <BigText data-testid='victory-point-pool'>Victory Point
                            Pool: {this.state.game.victoryPointPool}</BigText>
                        <FlexColumnDiv data-testid='player-boards'>
                            {this.state.game.players.map((player) => {
                                    return (
                                        <PlayerBoard key={player.id} {...player} />
                                    );
                                }
                            )}
                        </FlexColumnDiv>
                    </>
                }
            </>
        )
    }
}

export default Game;
