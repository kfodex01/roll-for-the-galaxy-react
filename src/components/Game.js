import React from "react";
import {connect} from "react-redux";
import * as ActionCreators from '../action-creators/index.js'
import {bindActionCreators} from "redux";
import StartForm from "./StartForm";
import PlayerBoards from "./PlayerBoards";

class Game extends React.Component {
    render() {
        return (
            <>
                {this.props.beginGameForm.visibility === true ?
                    (
                        <StartForm {...this.props} />
                        ) :
                    <PlayerBoards {...this.props} />
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
