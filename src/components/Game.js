import React from "react";
import {connect} from "react-redux";
import * as ActionCreators from '../action-creators/index.js'
import {bindActionCreators} from "redux";
import StartForm from "./StartForm";
import {BigText, FlexColumnDiv} from "../styled-components";
import PlayerBoard from "./PlayerBoard";

class Game extends React.Component {
    state = {
        visibility: true
    };

    hideBeginGameForm = () => {
        this.setState({
            visibility: false
        })
    };

    createPlayers = (numberOfPlayers) => {
        this.props.actions.createPlayers(numberOfPlayers);
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
                            Pool: {this.props.game.victoryPointPool}</BigText>
                        <FlexColumnDiv data-testid='player-boards'>
                            {this.props.game.players.map((player) => {
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

const mapStateToProps = state => {
    return ({
        beginGameForm: state.beginGameForm,
        game: state.game
    })
};
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps, null)(Game);
