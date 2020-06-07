import React from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {Header, Icon, List, Segment} from "semantic-ui-react";
import EventListing, {EventItemData} from "../../models/Events";
import {eventsActions} from "../../actions/events.actions";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";
import {formatDate, sortDates} from "../../utils/date-formater";
import {Link} from "react-router-dom";
import {CawsEvent} from "./EventsSelector";

//Define the expected props
interface LinkProps {
    //Define the props we expect
    eventListings: { [category: string]: EventListing|undefined; }
    categories:string[]
}

interface DispatchProps{
    //And the actions that must be done
    getEventListing: (category:string) => any;
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
        this.props.categories.forEach(cat => this.props.getEventListing(cat));
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
        const groupIndex = this.props.categories.indexOf(group);

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
        //Now get the events to show
        const events:CawsEvent[] = [];

        //Also bin by the date
        const eventsByDate:{[date:string]:EventItemData[]} = {};

        const colorByEvent:{[event:string]:SemanticCOLORS} = {};

        //Now add each group
        for (let group in this.props.categories ) {
            //If we show this group
            const eventListingData = this.props.eventListings[group]?.data.items;

            if (eventListingData) {
                //Add of all the events
                events.push(...eventListingData.map(event => {
                        return {
                            start: event.date ? new Date(event.date) : undefined,
                            end: event.date ? new Date(event.date) : undefined,
                            title: event.name,
                            id: event.id,
                            group: group,
                            allDay: true
                        };
                    })
                );

                //Also bin the data by date
                eventListingData.map(event => {
                    //Get the date in the format
                    const dateFormat = formatDate(event.date);

                    //See if there is already an entry
                    if (!eventsByDate[dateFormat]) {
                        //Create a new array
                        eventsByDate[dateFormat] = [];
                    }
                    //Now add it
                    eventsByDate[dateFormat].push(event);
                    colorByEvent[event.id] = this.getColor(group);
                })
            }
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
                                                               color={colorByEvent[event.id]}/>
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
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState): LinkProps {
    const categories: string[] = ["dogs","volunteer"];
    const eventListings: { [category :string]: EventListing|undefined; } = { }

    categories.forEach(category =>{
        eventListings[category] = state.events.eventsSummary[category];
    })

    return {
        categories,
        eventListings
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getEventListing:(category) =>  dispatch(eventsActions.getEventListing(category)),
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsList);

