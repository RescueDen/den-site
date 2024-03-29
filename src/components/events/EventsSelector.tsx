import React from 'react';
import JSX from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {RouteComponentProps} from "react-router";
import {Button, Container, Grid, Header, Icon, List, Responsive, Segment} from "semantic-ui-react";
import EventListing, {EventItemData} from "../../models/Events";
import {eventsActions} from "../../actions/events.actions";
import {Calendar, Event, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";
import EventViewer from "./EventViewer";
import {formatDate, sortDates} from "../../utils/date-formater";
import {Link} from "react-router-dom";
import {successAutoDismiss} from "../../actions/alert.actions";

//Use a localizer
// const localizer = Calendar.momentLocalizer(moment)
const localizer = momentLocalizer(moment)

//Define the expected props
interface LinkProps  extends RouteComponentProps<any> {
    //Define the props we expect
    eventListings: { [category: string]: EventListing|undefined; }
    eventId?:string;

    //show the display preferences
    hideItem:{[id: string]: boolean}

    categories:string[]
}

//Define the expected props
interface State {
    //Define the props we expect
    //Define the cal width
    calHeight:number;

}

interface DispatchProps{
    //And the actions that must be done
    getEventListing: (category:string) => any;
    toggleEventGroup: (group:string) => any;
    successAutoDismiss:(msg:string, time:number) => any;
}

export interface CawsEvent extends Event{
    group:string;
    start?: Date;
    end?: Date;
    title:string;
    id:string;
}

/**
 * Show all of the upcoming events
 */
class EventsSelector extends React.Component<DispatchProps&LinkProps, State> {
    state ={calHeight:100}

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
     * Update the cal width
     */
    updateCalHeight(currentWidth:number){

        //Get the max mobile width
        const mobileWidth = Responsive.onlyMobile.maxWidth || 100;

        //If we are on mobile double the height
        if(currentWidth < mobileWidth){
            //Now compute the height
            const height = currentWidth*1;

            //Update state
            this.setState({calHeight:height});

        }else{
            //Now compute the height
            const height = currentWidth*0.3;

            //Update state
            this.setState({calHeight:height});
        }
    }

    /**
     * Event selected
     */
    onEventSelect(eventId:string){
        //Reroute to the event
        this.props.history.push(`/events/${eventId}`)
    }

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

    //Provide a function to get the control buttons
    getGroupButtons = () => {
        //Extract the hide item
        const hideCals = this.props.hideItem;

        return this.props.categories.map(key =>{
            //Check to see if this group is active
            const groupActive = !hideCals[key];

            //Now make the button
            return <Button
                key={key}
                color={groupActive? this.getColor(key): undefined }
                onClick={() => {
                    this.props.toggleEventGroup(key);
                }}

            >{key} </Button>

        });
    }

    findEventListingCategory = (id:string):string|undefined =>{
        for(let category of this.props.categories){
            const listing = this.props.eventListings[category];
            if (listing){
                const event = listing.find(id);
                if (event){
                    return category
                }
            }
        }
        return undefined;
    }

    findEvent = (id:string):EventItemData|undefined =>{
        for(let category of this.props.categories){
            const listing = this.props.eventListings[category];
            if (listing){
                const event = listing.find(id);
                if (event){
                    return event
                }
            }
        }
        return undefined;
    }

    /*private getCalViewControl(label?:string){
        //Create the checkbox button
        return (
            <Checkbox
                label={label}
                toggle
                checked={this.props.calView == EventView.Cal} onClick={
                () => {
                    this.props.setCalView(this.props.calView == EventView.Cal? EventView.List:EventView.Cal)
                }
            } />
        );

    }*/

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        // if(this.props.eventsSummary.empty()){
        //     return (
        //         <div>
        //             <Segment>
        //                 <Dimmer inverted active>
        //                     <Loader size='large'>Loading</Loader>
        //                 </Dimmer>
        //                 <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        //
        //             </Segment>
        //         </div>
        //     );
        // }

        //If a event id was specifed return it
        if(this.props.eventId){
            //Make sure it is still available
            const event = this.findEvent(this.props.eventId);
            const category = this.findEventListingCategory(this.props.eventId);
            if(event && category){
                return (
                  <EventViewer
                      key={this.props.eventId}
                      eventInfo={event}
                      successAutoDismiss={this.props.successAutoDismiss}
                      category={category}
                  />
                );

            }else{
                return (
                    <p>
                        The specified event may not longer be available.
                    </p>
                )
            }


        }

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Show the options to turn on and off the cal, the view depends if we are on mobile
        components.push(
            <Responsive key='desktopResponsive' minWidth={Responsive.onlyTablet.minWidth}>
                <Grid key="header" stackable columns={1}>
                    <Grid.Column floated='left' textAlign='left'>
                        <Button.Group size='mini'>
                            {/*Build a button for each group */}
                            {this.getGroupButtons()}
                        </Button.Group>

                    </Grid.Column>
                </Grid>
            </Responsive>
        );

        //Add the headers
        components.push(
            <Responsive key='mobileResponsive' {...Responsive.onlyMobile}>
                <Grid key="header" columns={1}>
                    <Grid.Column textAlign='center'>
                        <Button.Group size='mini' vertical>
                            {/*Build a button for each group */}
                            {this.getGroupButtons()}
                        </Button.Group>

                    </Grid.Column>

                </Grid>
            </Responsive>
        )


        //Add a single line break
        components.push(<br key='break' />);

        //Now get the events to show
        const events:CawsEvent[] = [];

        //Also bin by the date
        const eventsByDate:{[date:string]:EventItemData[]} = {};
        const colorByEvent:{[event:string]:SemanticCOLORS} = {};

        //Now add each group
        for (let group of this.props.categories) {
            //If we show this group
            if(!this.props.hideItem[group]) {
                const eventListingData = this.props.eventListings[group]?.data.items;

                if(eventListingData) {
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
        }

        //For each
        const bigCalComponent = (
            <Responsive
                key={"responsiveItemCal"}
                as={Container}
                onUpdate={(event, data) => this.updateCalHeight(data.width)}
                style={{height: this.state.calHeight}}
                fireOnMount={true}
            >
                <Calendar
                    localizer={localizer}
                    views={['month']}
                    events={events}
                    onSelectEvent={event => this.onEventSelect(event.id)}
                    eventPropGetter={event => this.getEventStyle(event)}
                />
            </Responsive>
        );


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
            <>
                <Segment>
                    <Header as="h2" > Upcoming Events </Header>
                    <p>Sign your foster up or RSVP for an adoption event</p>
                    <p>This is a list of upcoming events that you can sign-up for.  Please click on the event you would like to sign-up for.  They are organized by event type (all on by default).</p>
                </Segment>
                <Segment>

                    {components}
                    <Grid stackable columns={2}>
                        <Grid.Column>
                            <Segment>
                                <Header as="h2" > Upcoming RSVP Opportunities </Header>
                                {listOfEventsComponent}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                {bigCalComponent}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </>
        );

    }
};


/**
 * Formats the date in a year month day format
 * @param dateIn
 */
// function formatDateLocalTime(dateIn:any) {
//     //Create a date object
//     const date = new Date(dateIn);
//
//     //If the date is not null
//     if(date.valueOf() < 0)
//         return date;
//
//     //Offset for the current time
//     const  offset = date.getTimezoneOffset() / 60;
//     const hours = date.getHours();
//
//     date.setHours(hours + offset);
//
//     return date;
//
// }

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {
    const categories: string[] = [];
    if (state.authentication.permissions?.allowed("get_dog_events")){
        categories.push("dogs")
    }
    if (state.authentication.permissions?.allowed("get_volunteer_events")){
        categories.push("volunteer")
    }
    const eventListings: { [category :string]: EventListing|undefined; } = { }

    categories.forEach(category =>{
        eventListings[category] = state.events.eventsSummary[category];
    })

    return {
        ...myProps,
        eventListings,
        categories,
        eventId:myProps.match.params.eventId,

        //show the display preferences
        hideItem:state.events.hideCal

    };
}
/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getEventListing:(category) =>  dispatch(eventsActions.getEventListing(category)),
        toggleEventGroup:(group:string) =>  dispatch(eventsActions.toggleEventGroup(group)),
        successAutoDismiss:(mess:string, time:number) => dispatch(successAutoDismiss(mess, time))
    };

}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsSelector);

