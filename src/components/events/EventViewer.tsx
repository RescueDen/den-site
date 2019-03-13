import React from 'react';
import JSX from 'react';

import {
    Button,
    Dimmer, Header, Icon,
    Image,
    Loader, Message,
    Segment
} from "semantic-ui-react";
import  {EventData} from "../../models/Events";

import {eventsService} from "../../services/events.service";
import {formatDate} from "../../utils/date-formater";
import {SignUpResponse} from "../../models/SignUp";
import Form, {WidgetProps} from "react-jsonschema-form-semanticui-fixed";
import MyFosterSelection from "../forms/MyFosterSelection";
import SignUpsTable from "./SignUpsTable";

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    eventInfo:EventData

}


//Keep a state of open documents
interface MyState{
    htmlInfo: string;
    signUpResponse?: SignUpResponse
    signUpErrorMessage?: string
    activeRow?:number;
    signUpUpdating:boolean;

}




/**
 * Show the details of a single up coming event
 */
class EventViewer extends React.Component<LinkProps, MyState> {
    state = {htmlInfo:"", signUpResponse:undefined, signUpErrorMessage:undefined,activeRow:undefined, signUpUpdating:false };

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
        //Down load the signup
        if(this.props.eventInfo.signupId) {
            //Load up the default
            this.editRow()
        }
    };
    /**
     * Define a custom widget for animalId
     * @param props
     * @constructor
     */
    animalIdWidget = (props:WidgetProps) => {
        return (
            <MyFosterSelection widgetProps={props}/>
        );
    };

    /**
     * Add function to edit a specific row
     */
    editRow = (rowId?:number) =>{
        //Set the active row
        this.setState({activeRow:rowId});

        //Get the updated info
        if(this.props.eventInfo.signupId) {
            //Turn on the loading
            this.setState({signUpUpdating:true})

            //Set the signUpResponse to loading
            eventsService.downloadEventSignup(this.props.eventInfo.signupId, rowId)
                .then(
                    //If successful html will be returned
                    form => {
                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating:false})
                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({signUpErrorMessage: errorResponse.response.data.message, signUpUpdating:false});
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating:false});

                        }

                    }
                );
        }

    }
    /**
     * Add function to edit a specific row
     */
    deleteRow = (rowId:number) =>{
        //Set the active row
        this.setState({activeRow:undefined});

        //Get the updated info
        if(this.props.eventInfo.signupId) {
            //Turn on the loading
            this.setState({signUpUpdating:true})

            //Set the signUpResponse to loading
            eventsService.deleteEventSignup(this.props.eventInfo.signupId, rowId)
                .then(
                    //If successful html will be returned
                    form => {
                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating:false})
                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({signUpErrorMessage: errorResponse.response.data.message, signUpUpdating:false});
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating:false});
                        }

                    }
                );
        }

    }

    //Submit the form
    onSubmit = (form:any) => {

        //Set the state for submitting
        this.setState({signUpUpdating:true});

        //Now send it.  We expecte an upadted info on the way back
        if(this.props.eventInfo.signupId) {
            eventsService.postEventSignup(form, this.props.eventInfo.signupId, this.state.activeRow)
                .then(
                    //If successful html will be returned
                    form => {
                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating: false, activeRow:undefined})
                    },
                    //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({
                                signUpErrorMessage: errorResponse.response.data.message,
                                signUpUpdating: false
                            });
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating: false});

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
            <Header key='header' as='h2'>
                <Icon name='checked calendar' />
                <Header.Content>
                    {this.props.eventInfo.name}
                    <Header.Subheader>{formatDate(this.props.eventInfo.date)}</Header.Subheader>
                </Header.Content>
            </Header>

        );



        //Now show the signup information
        //See if we should show info
        if(this.props.eventInfo.infoId) {
            if (this.state.htmlInfo.length == 0) {
                components.push(
                    <div key={"loading div"}>
                        <Dimmer inverted active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </div>
                );
            } else {
                //Return the html
                components.push(
                    <div key={this.props.eventInfo.infoId} dangerouslySetInnerHTML={{__html: this.state.htmlInfo}}/>
                );
            }
        }

        //See if we should show info
        if(this.props.eventInfo.signupId) {
            //Show the error message
            if(this.state.signUpErrorMessage){
                components.push(<p>{this.state.signUpErrorMessage}</p>)
            }

            if (this.state.signUpResponse) {
                //Extract so that it knows it is not null
                const signUpInfo:SignUpResponse = this.state.signUpResponse!;

                //If we have existing signups that means we want to edit each one by them selves
                if(signUpInfo.existingSignUps) {
                    components.push(
                        <Dimmer.Dimmable key='dimmingSignUps' blurring dimmed={this.state.signUpUpdating}>
                            {/*Add in the existing responses if they are avail*/}
                            <SignUpsTable
                                signups={signUpInfo.existingSignUps}
                                selectRow={(rowId: number) => this.editRow(rowId)}
                                deleteRow={(rowId: number) => this.deleteRow(rowId)}
                                selectedRow={this.state.activeRow}
                            />

                            {/*Add in the signup form*/}
                            <Form schema={signUpInfo.signupForm.JSONSchema}
                                  uiSchema={signUpInfo.signupForm.UISchema}
                                  formData={signUpInfo.signupForm.formData}
                                  widgets={{"animalIdWidget": this.animalIdWidget}}
                                  onSubmit={this.onSubmit}
                            >
                                {/*Render a custom Submit button*/}
                                {this.state.activeRow &&
                                <div>
                                    <Button primary type="submit">Update SignUp</Button>
                                    <Button
                                        onClick={() => this.editRow()}
                                        type="submit">Cancel</Button>
                                </div>
                                }
                                {!this.state.activeRow &&
                                <div>
                                    <Button primary type="submit">SignUp</Button>
                                </div>
                                }

                            </Form>
                        </Dimmer.Dimmable>
                    )
                }else{
                    //Just show the one signup
                    components.push(
                        <Dimmer.Dimmable key='dimmingSignUps' blurring dimmed={this.state.signUpUpdating}>
                            {/*Add in the signup form*/}
                            <Form schema={signUpInfo.signupForm.JSONSchema}
                                  uiSchema={signUpInfo.signupForm.UISchema}
                                  formData={signUpInfo.signupForm.formData}
                                  widgets={{"animalIdWidget": this.animalIdWidget}}
                                  onChange={this.onSubmit}
                            >
                                {/*Render a custom/hidden Submit button*/}
                                <Button  style={{display:"none"}} type="submit"></Button>
                                <Message icon>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                        All selections and changes are automatically saved.
                                    </Message.Content>
                                </Message>


                            </Form>
                        </Dimmer.Dimmable>
                    )
                }

            } else {
                //Show a loading screen
                components.push(
                    <div key='loadingDimmer'>
                        <Dimmer.Dimmable>
                            <Dimmer inverted active>
                                <Loader>{
                                    this.state.signUpResponse

                                }</Loader>
                            </Dimmer>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                        </Dimmer.Dimmable>
                    </div>
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