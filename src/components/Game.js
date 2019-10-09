import React from "react";
import {connect} from "react-redux";
import * as ActionCreators from '../action-creators/index.js'
import {bindActionCreators} from "redux";

class Game extends React.Component {
    render() {
        return (
            <>
                <p>{this.props.startForm.message}</p>
                <button onClick={this.props.actions.doTheThing}>{'Thing'}</button>
            </>
        )
    }
}

const mapStateToProps = state => {
    return({startForm: state.startForm})
};
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps, null)(Game);
