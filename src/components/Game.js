import React from "react";
import {connect} from "react-redux";
import * as ActionCreators from '../action-creators/index.js'
import {bindActionCreators} from "redux";
import StartForm from "./StartForm";

class Game extends React.Component {
    render() {
        return (
            <>
                {this.props.beginGameForm.visibility === true ?
                    (<StartForm {...this.props} />) : null}
            </>
        )
    }
}

const mapStateToProps = state => {
    return ({beginGameForm: state.beginGameForm})
};
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps, null)(Game);
