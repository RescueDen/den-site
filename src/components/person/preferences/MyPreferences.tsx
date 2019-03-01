import React from 'react';
import {connect} from 'react-redux';

import {Segment, Container, Header, Label} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";

import {ThunkDispatch} from "redux-thunk";
import CawsUser, {getEmptyCawsUser} from "../../../models/CawsUser";
import {SettingGroup, UserPreferences} from "../../../models/UserPreferences";
import {userActions} from "../../../actions/user.actions";
import ApplicationState from "../../../state/ApplicationState";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user:CawsUser;
    prefs?:UserPreferences
}


interface DispatchProps{
    //And the actions that must be done
    updateMyInfo: () => any;
    updatePreferences: (settings:SettingGroup) => any
}

/**
 * This page shows the person details
 */
class MyPreferences extends React.Component<LinkProps&DispatchProps> {

    //Update the user if there are any changes
    componentDidMount(){
        this.props.updateMyInfo()
    }

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon

        //Get the animal details
        return (
            <Container text>
                <Segment>
                    <Header as="h2">{this.props.user.data.firstname}'s Den Preferences</Header>
                    {JSON.stringify(this.props.prefs)}
                </Segment>
            </Container>
        );

    }
}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        user:state.authentication.loggedInUser? state.authentication.loggedInUser : getEmptyCawsUser(),
        prefs:state.authentication.preferences
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser()),
        updatePreferences: (settings:SettingGroup) => dispatch(userActions.setUserPreferences(settings))

    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(MyPreferences);
