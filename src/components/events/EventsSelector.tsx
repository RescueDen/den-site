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
    Grid,
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
import {EventView} from "../../state/EventsState";

//Use a localizer
const localizer = BigCalendar.momentLocalizer(moment)

//Define the expected props
interface LinkProps  extends RouteComponentProps<any> {
    //Define the props we expect
    cawsAnimalsDb: AnimalState
    eventsSummary: EventsSummary
    eventId?:string;

    //Determine the menuType
    calView: EventView;

    //show the display preferences
    hideItem:{[id: string]: boolean}

}

//Define the expected props
interface State {
    //Define the props we expect
    //Define the cal width
    calHeight:number;

}


interface DispatchProps{
    //And the actions that must be done
    getEventsSummary: () => any;
    setCalView: (view:EventView) => any;
    toggleEventGroup: (group:string) => any;


}

interface CawsEvent extends Event{
    group:string;
    start: string;
    end: string;
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
        // get the forms
        this.props.getEventsSummary();

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
            const height = currentWidth*1.5;

            //Update state
            this.setState({calHeight:height});

        }else{
            //Now compute the height
            const height = currentWidth*0.6;

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
        const groupIndex = Object.keys(this.props.eventsSummary.eventGroups).indexOf(group);

        //Now get the color
        switch(groupIndex){
            case 0:
                return 'red';
            case 1:
                return 'green';
            case 2:
                return 'blue';
            case 3:
                return 'violet';
            case 4:
                return 'teal';
            default:
                return 'grey'
        }

    }

    //Provide a function to get the control buttons
    getGroupButtons = () => {
        //Extract the hide item
        const hideCals = this.props.hideItem;

        return Object.keys(this.props.eventsSummary.eventGroups).map(key =>{
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

    private getCalViewControl(label?:string){
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
        
        //If a event id was specifed return it
        if(this.props.eventId){
            //Make sure it is still avaiable
            if(this.props.eventsSummary.eventList[this.props.eventId]){
                return (
                  <EventViewer key={this.props.eventId}
                               eventInfo={this.props.eventsSummary.eventList[this.props.eventId]} />
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



        //Add the headers
        components.push(
            <Responsive key='mobileResponsive' {...Responsive.onlyMobile}>
                <Grid key="header" columns={2}>
                    <Grid.Column textAlign='center'>
                        <Button.Group size='mini' vertical>
                            {/*Build a button for each group */}
                            {this.getGroupButtons()}
                        </Button.Group>

                    </Grid.Column>
                    <Grid.Column  textAlign='center' verticalAlign='middle' >
                        <Segment padded>
                            <Label attached='top'>Calendar View</Label>
                            {this.getCalViewControl()}
                        </Segment>

                    </Grid.Column>
                </Grid>
            </Responsive>
        )

        //Show the options to turn on and off the cal, the view depends if we are on mobile
        components.push(
            <Responsive key='desktopResponsive' minWidth={Responsive.onlyTablet.minWidth}>
                <Grid key="header" stackable columns={2}>
                    <Grid.Column floated='left' textAlign='left'>
                        <Button.Group size='mini'>
                        {/*Build a button for each group */}
                        {this.getGroupButtons()}
                        </Button.Group>

                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' verticalAlign='middle' >
                            {this.getCalViewControl("Cal View")}
                    </Grid.Column>
                </Grid>
            </Responsive>
        );

        //Add a single line break
        components.push(<br key='break' />);

        //Now get the events to show
        const events:CawsEvent[] = [];

        //Also bin by the date
        const eventsByDate:{[date:string]:EventData[]} = {};

        //Now add each group
        for (let group in this.props.eventsSummary.eventGroups) {
            //If we show this group
            if(!this.props.hideItem[group]) {
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
        }

        //For each
        switch(this.props.calView) {
            case EventView.Cal:
                components.push(
                    <Responsive
                        key={"responsiveItemCal"}
                        as={Container}
                        onUpdate={(event, data) => this.updateCalHeight(data.width)}
                        style={{height: this.state.calHeight}}
                        fireOnMount={true}
                    >

                        <BigCalendar
                            localizer={localizer}
                            views={['month']}
                            events={events}
                            onSelectEvent={event => this.onEventSelect(event.id)}
                            eventPropGetter={event => this.getEventStyle(event)}

                        />
                    </Responsive>
                );
                break;
            case EventView.List:

                //Show grouped by date
                //Get the keys
                const dateKeys = Object.keys(eventsByDate);

                //Now sort it
                sortDates(dateKeys);

                //Now render each date range
                components.push(
                    <List key='list of events'>
                        {dateKeys.map(date => {
                            return (
                                <List.Item key={date}>
                                    <Icon size='large' name='checked calendar'/>
                                    <List.Content>
                                        {/*See if there is a date*/}
                                        {(new Date(date)).valueOf() > 0 &&
                                        <List.Header as='h2'>{date}</List.Header>
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
                break;

        }



        //Start rendering
        return (
            <>
                <Segment>
                    This is a list of upcoming events that you can sign-up for.  Please click on the event you would like to sign-up for.  They are organized by event type. Use the Cal View toggle to see a list instead of a calendar or click on a calendar to turn them off (all are on by default).
                </Segment>
                <Segment>
                    {components}
                </Segment>
            </>
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
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {

    return {
        ...myProps,
        cawsAnimalsDb:state.animals,
        eventsSummary:state.events.eventsSummary,
        eventId:myProps.match.params.eventId,

        //Determine the menuType
        calView: state.events.view,

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
        getEventsSummary:() =>  dispatch(eventsActions.getEventsSummary()),
        setCalView:(view:EventView) =>  dispatch(eventsActions.setEventView(view)),
        toggleEventGroup:(group:string) =>  dispatch(eventsActions.toggleEventGroup(group))

    };

}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsSelector);

