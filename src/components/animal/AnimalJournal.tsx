import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import CawsAnimal from "../../models/CawsAnimal";
import {Dimmer, Feed, Icon, Loader, Segment} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {JournalEntry} from "../../models/JournalEntry";
import {journalService} from "../../services/journal.service";
import {formatDate} from "../../utils/date-formater";
import {ThunkDispatch} from "redux-thunk";
import {peopleActions} from "../../actions/people.actions";
import Permissions from "../../models/Permissions";
import {PersonData} from "../../models/People";
import {Link} from "react-router-dom";

//Define the expected props
interface IncomingProps{
    ani: CawsAnimal;

}

//Define the expected props
interface LinkProps{
    //Define the props we expect
    user:CawsUser;

    //Store the people info
    peopleInfo: { [id: number]: PersonData; }

    //Store the permission
    permissions?: Permissions

}


interface MyState {

    //Store the journal entries
    journal?:JournalEntry[];

    //Store the error as well
    error?:string;
}

interface DispatchProps{
    //And the actions that must be done
    getPerson: (personId:number) => any;

}


/**
 * This card shows the animal details
 */
class AnimalJournal extends React.Component<IncomingProps&LinkProps&DispatchProps,MyState> {
    state = {journal:undefined, error:undefined};


    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //If the user is logged in get the logged in
        journalService.getJournalEntriesForAnimal(this.props.ani.data.ID)

        //When it comes back use it
        .then(
            //If successful html will be returned
            list => {
                //Update the state
                this.setState({journal:list})

                //Now get the people info if allowed to
                if(this.props.permissions && this.props.permissions.allowed("get_public_people_info")) {

                    //update each person
                    list.forEach(entry =>{
                        if(entry.authorId > 0){
                            this.props.getPerson(entry.authorId);
                        }
                    })
                }

            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error:errorResponse.response.data.message});
                }catch(e){
                    this.setState({error:errorResponse.toString()});

                }

            }

        );
    };


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return(
            <Segment>
                {this.state.journal &&
                <Feed>
                    {
                        (this.state.journal! as JournalEntry[]).map((ent: JournalEntry) => {
                                return (
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name='comment'/>

                                        </Feed.Label>
                                        <Feed.Content>
                                            {this.props.peopleInfo && this.props.peopleInfo[ent.authorId] &&
                                                <>
                                                    <Feed.User>{this.props.peopleInfo[ent.authorId].firstname} {this.props.peopleInfo[ent.authorId].lastname} </Feed.User> wrote {ent.type}
                                                </>
                                            }
                                            <Feed.Date>{formatDate(ent.date)}</Feed.Date>
                                            <Feed.Summary>
                                                {ent.content}
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                )
                            }
                        )
                    }

                </Feed>
                }
                {!this.state.journal &&
                    <Dimmer active inverted>
                        <Loader inverted/>
                    </Dimmer>
                }

                {/* show the error if there is one   */}
                {this.state.error}
            </Segment>
        );
    }



}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:IncomingProps ):LinkProps {
    return {
        user:state.authentication.loggedInUser || getEmptyCawsUser(),
        peopleInfo:state.people.people,
        permissions:state.authentication.permissions
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
)(AnimalJournal);
