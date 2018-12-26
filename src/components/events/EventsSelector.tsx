import React from 'react';
import JSX from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {RouteComponentProps} from "react-router";
import {Dimmer, Header, Image, Loader, Segment} from "semantic-ui-react";
import EventsSummary from "../../models/Events";
import {eventsActions} from "../../actions/events.actions";


//Define the expected props
interface LinkProps  extends RouteComponentProps<any> {
    //Define the props we expect
    cawsAnimalsDb: AnimalState
    eventsSummary: EventsSummary
    eventId?:string;

    //Determine the menuType

}


interface DispatchProps{
    //And the actions that must be done
    getEventsSummary: () => any;

}


/**
 * Show all of the upcoming events
 */
class EventsSelector extends React.Component<DispatchProps&LinkProps> {


    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.getEventsSummary();

    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        if(this.props.eventsSummary.empty()){
            return (
                <div>
                    <Segment>
                        <Dimmer inverted active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

                    </Segment>
                </div>
            );

        }

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //For each
        for (let prop in this.props.eventsSummary.eventGroups) {
            components.push(
                <div>
                    <h1>{prop}</h1>
                    <ol>
                    {this.props.eventsSummary.eventGroups[prop].map(event => {
                        return <li>{event.date} :{event.name} </li>;
                    })}
                    </ol>
                </div>
            )
        }


        //Start rendering
        return (
            <div>
                {}
                {components}
            </div>
        );

    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getEventsSummary:() =>  dispatch(eventsActions.getEventsSummary())
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {

    return {
        ...myProps,
        cawsAnimalsDb:state.animals,
        eventsSummary:state.events.eventsSummary,
        eventId:myProps.match.params.eventId

    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsSelector);

