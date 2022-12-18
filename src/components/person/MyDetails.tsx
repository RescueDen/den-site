import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import {Container, Header, Segment} from "semantic-ui-react";
import ShelterUser, {getEmptyCawsUser} from "../../models/ShelterUser";
import {RouteComponentProps} from "react-router";
import MySummary from "./MySummary";
import AnimalList from "../animal/SearchableAnimalListCompact";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {AchievementData} from "../../models/Achievements";
import MyVoucherList from "../voucher/MyVoucherList";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user: ShelterUser;
    achievements?: AchievementData[]
}


interface DispatchProps {
    //And the actions that must be done
    updateMyInfo: () => any;

}

/**
 * This page shows the person details
 */
class MyDetails extends React.Component<LinkProps & DispatchProps> {

    //Update the user if there are any changes
    componentDidMount() {
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
            <div>
                <Container text>
                    {/*The simple header*/}
                    <Header as='h1'>{this.props.user.data.firstName} {this.props.user.data.lastName}</Header>

                    {/*We may have upcoming appointments*/}
                    <MyVoucherList/>

                    {/*If we have achievements*/}
                    {/*<Segment>*/}
                    {/*    <Header as="h2">My Achievements</Header>*/}
                    {/*    <AchievementList achievements={this.props.achievements}/>*/}

                    {/*    <br/>*/}
                    {/*    <Label attached='bottom right'><Link to='/achievements'>see all possible achievements</Link></Label>*/}

                    {/*</Segment>*/}

                    {/*Load in my Summary*/}
                    <MySummary user={this.props.user}/>

                    {/*Add in my current fosters*/}
                    {this.props.user.data.currentFosters &&
                        <Segment>
                            <AnimalList aniLink="/animal" link="/currentfosters" title="My Fosters"
                                        animalIdList={this.props.user.data.currentFosters}/>
                        </Segment>
                    }

                    {/*Add in my Past fosters*/}
                    {this.props.user.data.pastFosters &&
                        <Segment>
                            <AnimalList aniLink="/animal" link="/pastfosters" title="Past Fosters"
                                        animalIdList={this.props.user.data.pastFosters}/>
                        </Segment>
                    }
                </Container>
            </div>
        );

    }
}


/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps {
    return {
        ...myProps,
        user: state.authentication.loggedInUser ? state.authentication.loggedInUser : getEmptyCawsUser(),
        achievements: state.achievements?.achievements ?? []
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        updateMyInfo: () => dispatch(userActions.updateLoggedInUser())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDetails);
