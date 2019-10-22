import React from "react";
import {connect} from "react-redux";
import * as ActionCreators from '../action-creators/index.js'
import {bindActionCreators} from "redux";
import StartForm from "./StartForm";
import PlayerBoards from "./PlayerBoards";
import {BigText} from "../styled-components";

class Game extends React.Component {
    render() {
        return (
            <>
                {this.props.beginGameForm.visibility === true ?
                    (
                        <StartForm {...this.props} />
                    ) :
                    <>
                        <BigText data-testid='victory-point-pool'>Victory Point Pool: {this.props.game.victoryPointPool}</BigText>
                        <PlayerBoards {...this.props} />
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
