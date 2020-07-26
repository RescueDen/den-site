import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {Colony} from "../../models/Colony";
import {colonyActions} from "../../actions/colony.actions";
import {Container, Header, Card} from "semantic-ui-react";
import ColonyCard from "./ColonyCard";

//Define the expected props
interface StateProps{
    colonies: Colony[];
}

interface DispatchProps{
    downloadColonyList: () => any;
}

class ColonyList extends React.Component<StateProps&DispatchProps> {
    componentDidMount(){
        // reset login status
        this.props.downloadColonyList();
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <>
                <Header as='h1'>Cat Colonies</Header>
                <Card.Group>
                    {this.props.colonies.map(colony => <ColonyCard colony={colony}/>)}
                </Card.Group>
            </>
        )
    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState ):StateProps {
    return {
        colonies:state.colony.colonies,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:StateProps):DispatchProps {
    return {
        downloadColonyList:() =>  dispatch(colonyActions.getColonyList())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ColonyList);
