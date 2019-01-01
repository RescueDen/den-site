import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import {Segment, Container, Header, Label, Dimmer, Loader, Placeholder} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {AchievementData} from "../../models/Achievements";
import AchievementList from "./AchievementList";
import {achievementsService} from "../../services/achievements.service";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user?:CawsUser;
    achievements?:AchievementData[]
}

//Also show all possible achivements
interface State {
    allAchievements:AchievementData[]
}

interface DispatchProps{
    //And the actions that must be done
    updateMyInfo: () => any;

}

/**
 * This page shows the person Achievements and all possible ones
 */
class Achievements extends React.Component<LinkProps&DispatchProps, State> {
    state={allAchievements:[]}

    //Update the user if there are any changes
    componentDidMount(){
        this.props.updateMyInfo()

        //Get all possible achievements
        achievementsService.getAllAchievements().then(
            listOf =>{
                this.setState({allAchievements:listOf})
            }

        )

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
                    {/*If we have achievements*/}
                    {this.props.achievements &&
                    <Segment>
                        <Header as="h2">My Achievements</Header>
                        <AchievementList achievements={this.props.achievements}/>
                    </Segment>
                    }
                    {this.state.allAchievements.length > 0 &&
                    <Segment>
                        <Header as="h2">Possible Achievements</Header>
                        <AchievementList achievements={this.state.allAchievements}/>
                    </Segment>
                    }

                    {/*Else show a loading screen*/}
                    {this.state.allAchievements.length == 0 &&
                    <Segment>
                        <Header as="h2">Possible Achievements</Header>
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                        <Placeholder>
                            <Placeholder.Paragraph />
                        </Placeholder>
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
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        user:state.authentication.loggedInUser? state.authentication.loggedInUser : getEmptyCawsUser(),
        achievements:state.authentication.loggedInUser && state.achievements? state.achievements.achievements[state.authentication.loggedInUser.data.asmid] :[]

    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Achievements);
