import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import { Segment, Container, Header} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import MySummary from "./MySummary";
import AnimalList from "../animal/SearchableAnimalListCompact";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user:CawsUser;

}


/**
 * This page shows the person details
 */
class MyDetails extends React.Component<LinkProps> {


    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon

        //Get the animal details
        return (
            <div>
                <Container text>
                    {/*The simple header*/}
                    <Header as='h1'>{this.props.user.data.firstname} {this.props.user.data.lastname}</Header>

                    {/*Load in my Summary*/}
                    <MySummary user={this.props.user}/>

                    {/*Add in my current fosters*/}
                    <Segment>
                        <AnimalList aniLink="/animal" link="/currentfosters" title="My Fosters" animalIdList={this.props.user.data.currentFosters}/>
                    </Segment>

                    {/*Add in my Past fosters*/}
                    <Segment>
                        <AnimalList aniLink="/animal" link="/pastfosters" title="Past Fosters" animalIdList={this.props.user.data.pastFosters}/>
                    </Segment>
                </Container>
            </div>
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
        user:state.authentication.loggedInUser || getEmptyCawsUser(),
    };
}



//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
)(MyDetails);
