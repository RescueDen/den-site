import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import {Segment, Container, Header, Label, Loader} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import MySummary from "./MySummary";
import AnimalList from "../animal/SearchableAnimalListCompact";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {AchievementData} from "../../models/Achievements";
import AchievementList from "./achievement/AchievementList";
import {Link} from "react-router-dom";
import {PersonData} from "../../models/People";
import {peopleActions} from "../../actions/people.actions";
import {peopleService} from "../../services/people.service";


//Define the expected props
interface LinkProps extends RouteComponentProps<any>{
    //Pass in the achId
    personId:number;

    //Store the people info
    peopleInfo: { [id: number]: PersonData; }
}


interface DispatchProps{
    //And the actions that must be done
    getPerson: (personId:number) => any;

}

interface State{
    //Store any errors
    errors?:string;

    //And the actions that must be done
    achievements?: AchievementData[];

}

/**
 * This page shows the person details
 */
class PersonDetails extends React.Component<LinkProps&DispatchProps, State> {
    state = {errors:undefined, achievements:undefined}

    //Update the user if there are any changes
    componentDidMount(){
        //Make sure we have this person
        this.props.getPerson(this.props.personId);

        //Load up the achievements for this person
        peopleService.getAchievements(this.props.personId).then(listOfAch =>{
            this.setState({achievements:listOfAch})
        },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({errors: errorResponse.response.data.message});
                } catch (e) {
                    this.setState({errors: errorResponse.toString()});

                }

            }
        );


    }

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon
        const person = this.props.peopleInfo[this.props.personId] as PersonData;

        if(person) {

            return (
                <div>
                    <Container text>
                        {/*The simple header*/}
                        <Header as='h1'>{person.firstname} {person.lastname}</Header>

                        {/*If we have achievements*/}
                        <Segment>
                            <Header as="h2">{person.firstname}'s Achievements</Header>
                            <AchievementList achievements={this.state.achievements}/>
                            {this.state.errors}

                        </Segment>


                        {/*Add in my current fosters*/}
                        {person.currentFosters &&
                        <Segment>
                            <AnimalList aniLink="/animal" link="/currentfosters" title={person.firstname +"'s Fosters"}
                                        animalIdList={person.currentFosters}/>
                        </Segment>
                        }

                        {/*Add in my Past fosters*/}
                        {person.pastFosters &&
                        <Segment>
                            <AnimalList aniLink="/animal" link="/pastfosters" title={person.firstname +"Past Fosters"}
                                        animalIdList={person.pastFosters}/>
                        </Segment>
                        }
                    </Container>
                </div>
            );
        }else{
            return <Loader active={true}/>
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
        personId:myProps.match.params.personId,
        peopleInfo:state.people.people


    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getPerson:(personId:number) =>  dispatch(peopleActions.getPerson(personId)),
    };

}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(PersonDetails);
