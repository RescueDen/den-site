import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../../state/ApplicationState";

import {
    Segment,
    Container,
    Image, Loader, Header, Grid
} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import { AchievementSummaryData} from "../../../models/Achievements";
import {achievementsService} from "../../../services/achievements.service";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Pass in the achId
    achId:number;

}


//Also show all possible achievements
interface State {
    achievementSummary?:AchievementSummaryData;
    error?:string;
}

interface DispatchProps{
    //And the actions that must be done
    // updateMyInfo: () => any;
    // getFormsSummary: () => any;

}

/**
 * This page shows the person Achievements and all possible ones
 */
class AchievementSummary extends React.Component<LinkProps&DispatchProps, State> {
    state={achievementSummary:undefined, error:undefined}

    //Update the user if there are any changes
    componentDidMount(){

        //Download the data
        achievementsService.getAchievementSummary(this.props.achId).then(
            //If successful html will be returned
            summary => {
                //Update the state
                this.setState({achievementSummary: summary})


            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error: errorResponse.response.data.message});
                } catch (e) {
                    this.setState({error: errorResponse.toString()});

                }

            }
        )

    }


    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //Get the animal details
        if (this.state.achievementSummary) {
            //Get the achivement summary
            const summary =  this.state.achievementSummary! as AchievementSummaryData;
            //get the list of achievers
            const achieversList = Object.keys(summary.achievers);

            return (
                <Container>
                    <Grid stackable>
                        <Grid.Column width={4}>
                            <Image centered src={summary.achievement.badgeUrl} size='large' />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment>
                                <Header as='h1'>{summary.achievement.name}</Header>
                                <p>
                                    {summary.achievement.description}
                                </p>
                            </Segment>
                        </Grid.Column>
                    </Grid>

                    {/* See if the list of achievers is avail   */}
                    {achieversList.length > 0 &&
                    <Segment>
                        <Header as='h2'>Achievers</Header>
                        <p>
                            {JSON.stringify(summary.achievers)}
                        </p>
                    </Segment>
                    }
                </Container>
            )
        }else{
            //Just a loading page
            return (
                <Container>
                    <Loader active inline='centered' />
                </Container>
            );
        }

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
        achId:myProps.match.params.achId,


    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        // updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser()),
        // getFormsSummary:() =>  dispatch(formsActions.getFormsSummary())

    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AchievementSummary);
