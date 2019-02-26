import React from 'react';
import JSX from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {RouteComponentProps} from "react-router";
import {
    Button,
    Checkbox,
    Container,
    Dimmer,
    Grid, Header,
    Icon,
    Image,
    Label,
    List,
    Loader,
    Responsive,
    Segment
} from "semantic-ui-react";
import EventsSummary, {EventData} from "../../models/Events";
import {eventsActions} from "../../actions/events.actions";
import BigCalendar, {Event} from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";
import EventViewer from "./EventViewer";
import {formatDate, sortDates} from "../../utils/date-formater";
import {Link} from "react-router-dom";
import {CawsEvent} from "./EventsSelector";

//Define the expected props
interface LinkProps {
    //Define the props we expect
    eventsSummary: EventsSummary

}




interface DispatchProps{
    //And the actions that must be done
    getEventsSummary: () => any;

}




/**
 * Show all of the upcoming events
 */
class EventsList extends React.Component<DispatchProps&LinkProps> {


    constructor(props:DispatchProps&LinkProps){
        super(props)

    }

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.getEventsSummary();

    };





    /**
     * Event selected
     */
    getEventStyle(event:CawsEvent) :{ className?: string, style?: React.CSSProperties }{
        const style = {
            backgroundColor: this.getColor(event.group),

        };

        return {
            style
        };
    }



    /**
     * Get color
     */
    getColor(group:string):SemanticCOLORS{
        //Get the index of the group
        const groupIndex = Object.keys(this.props.eventsSummary.eventGroups).indexOf(group);

        //Now get the color
        switch(groupIndex){
            case 0:
                return 'pink';
            case 1:
                return 'green';
            case 2:
                return 'orange';
            case 3:
                return 'blue';
            case 4:
                return 'red';
            default:
                return 'grey'
        }

    }



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
        




        //Now get the events to show
        const events:CawsEvent[] = [];

        //Also bin by the date
        const eventsByDate:{[date:string]:EventData[]} = {};

        //Now add each group
        for (let group in this.props.eventsSummary.eventGroups) {
            //If we show this group
            //Add of all the events
            events.push(...this.props.eventsSummary.eventGroups[group].map(event => {
                    return {
                        start: event.date ? formatDateLocalTime(event.date.toString()).toString() : "",
                        end: event.date ? formatDateLocalTime(event.date.toString()).toString() : "",
                        title: event.name,
                        id: event.id,
                        group: group,
                        allDay:true
                    };
                })
            );

            //Also bin the data by date
            this.props.eventsSummary.eventGroups[group].map(event => {
                //Get the date in the format
                const dateFormat = formatDate(event.date);

                //See if there is already an entry
                if(!eventsByDate[dateFormat]){
                    //Create a new array
                    eventsByDate[dateFormat] = [];
                }
                //Now add it
                eventsByDate[dateFormat].push(event);

            })

        }

        //Show grouped by date
        //Get the keys
        const dateKeys = Object.keys(eventsByDate);

        //Now sort it
        sortDates(dateKeys);

        //Get yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        //Now render each date range
        const listOfEventsComponent = (
            <List key='list of events'>
                {dateKeys.filter(date => {
                   const testDate = new Date(date);
                   //Must be in the future or current
                    return testDate.valueOf() > yesterday.valueOf();

                }).map(date => {
                    return (
                        <List.Item key={date}>
                            <Icon size='large' name='checked calendar'/>
                            <List.Content>
                                {/*See if there is a date*/}
                                {(new Date(date)).valueOf() > 0 &&
                                <List.Header as='h3'>{date}</List.Header>
                                }
                                <List.Description>
                                    {/*Add a sub list*/}
                                    <List>
                                        {eventsByDate[date].map(event => {
                                            return (
                                                <List.Item as={Link} key={event.id} to={`/events/${event.id}`}>
                                                    <List.Icon name='circle'
                                                               color={this.getColor(this.props.eventsSummary.lookUpGroup[event.id])}/>
                                                    <List.Content>{event.name}</List.Content>
                                                </List.Item>
                                            );
                                        })
                                        }
                                    </List>
                                </List.Description>
                            </List.Content>
                        </List.Item>


                    );
                })
                }

            </List>
        );







        //Start rendering
        return (
            <Segment>
                <Header as="h2" > Upcoming Events </Header>
                <p>Sign your foster up or RSVP for an adoption event</p>
                {listOfEventsComponent}
            </Segment>

        );

    }
};


/**
 * Formats the date in a year month day format
 * @param dateIn
 */
function formatDateLocalTime(dateIn:any) {
    //Create a date object
    const date = new Date(dateIn);

    //If the date is not null
    if(date.valueOf() < 0)
        return date;

    //Offset for the current time
    const  offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    date.setHours(hours + offset);

    return date;

}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState): LinkProps {

    return {
        eventsSummary:state.events.eventsSummary,


    };
}
/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getEventsSummary:() =>  dispatch(eventsActions.getEventsSummary()),

    };

}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsList);

