import React from 'react';
import JSX from 'react';

import {
    Dimmer, Header, Icon,
    Image,
    Loader,
    Segment
} from "semantic-ui-react";
import  {EventData} from "../../models/Events";

import {eventsService} from "../../services/events.service";
import {formatDate} from "../../utils/date-formater";

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    eventInfo:EventData

}


//Keep a state of open documents
interface MyState{
    htmlInfo: string;

}




/**
 * Show the details of a single up coming event
 */
class EventViewer extends React.Component<LinkProps, MyState> {
    state = {htmlInfo:""};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        //Check to see if need to download info
        if(this.props.eventInfo.infoId) {
            eventsService.downloadEventInfo(this.props.eventInfo.infoId)
                .then(
                    //If successful html will be returned
                    article => {
                        //Update the state
                        this.setState({htmlInfo: article})
                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({htmlInfo: errorResponse.response.data.message});
                        } catch (e) {
                            this.setState({htmlInfo: errorResponse.toString()});

                        }

                    }
                );
        }
    };




    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Add a header and date
        components.push(
            <Header as='h2'>
                <Icon name='checked calendar' />
                <Header.Content>
                    {this.props.eventInfo.name}
                    <Header.Subheader>{formatDate(this.props.eventInfo.date)}</Header.Subheader>
                </Header.Content>
            </Header>

        );

        //See if we should show info
        if(this.props.eventInfo.infoId) {
            if (this.state.htmlInfo.length == 0) {
                components.push(
                    <div>
                    <Dimmer inverted active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </div>
                );
            } else {
                //Return the html
                components.push(
                    <div dangerouslySetInnerHTML={{__html: this.state.htmlInfo}}/>
                );
            }
        }

        //Add everything in a segment
        return(
          <Segment>
              {components}
          </Segment>
        );



    }
};

export default EventViewer;