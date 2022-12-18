import React from 'react';
import JSX from 'react';

import {Button, Dimmer, Header, Icon, Image, Loader, Segment} from "semantic-ui-react";
import {EventItemData} from "../../models/Events";

import {eventsService} from "../../services/events.service";
import {formatDate} from "../../utils/date-formater";
import {SignUpResponse} from "../../models/SignUp";
import Form from "react-jsonschema-form-semanticui-fixed";
import SignUpsTable from "./SignUpsTable";
import ShelterAnimal, {findAnimalByShelterId, findShelterIds} from "../../models/ShelterAnimal";
import AnimalState from "../../state/AnimalState";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import customWidgets from "../forms/CustomWidgets";
import AnimalsAttending from "./AnimalsAttending";

//Define the expected props
interface LinkProps {
    //Define the props we expect
    eventInfo: EventItemData

    //Send message
    successAutoDismiss: (msg: string, time: number) => any;
    category: string;
}

interface StateProps {
    //Define the props we expect
    cawsAnimalsDb: AnimalState;
}

//Keep a state of open documents
interface MyState {
    htmlInfo: string;
    signUpResponse?: SignUpResponse
    signUpErrorMessage?: string
    activeRow?: number;
    signUpUpdating: boolean;
    formCount: number;
}


/**
 * Show the details of a single up coming event
 */
class EventViewer extends React.Component<LinkProps & StateProps, MyState> {
    state = {
        htmlInfo: "",
        signUpResponse: undefined,
        signUpErrorMessage: undefined,
        activeRow: undefined,
        signUpUpdating: false,
        formCount: 0
    };

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        //Check to see if need to download info
        if (this.props.eventInfo.infoId) {
            eventsService.downloadEventInfo(this.props.eventInfo.infoId)
                .then(//If successful html will be returned
                    article => {
                        //Update the state
                        this.setState({htmlInfo: article})


                    }, //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({htmlInfo: errorResponse.response.data.message});
                        } catch (e) {
                            this.setState({htmlInfo: errorResponse.toString()});

                        }

                    });
        }
        //Down load the signup
        if (this.props.eventInfo.signupId) {
            //Load up the default
            this.editRow()
        }
    };


    /**
     * Add function to edit a specific row
     */
    editRow = (rowId?: number) => {
        //Set the active row
        this.setState({activeRow: rowId});

        //Get the updated info
        if (this.props.eventInfo.signupId) {
            //Turn on the loading
            this.setState({signUpUpdating: true})

            //Set the signUpResponse to loading
            eventsService.downloadEventSignup(this.props.category, this.props.eventInfo.signupId, rowId)
                .then(//If successful html will be returned
                    form => {

                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating: false})
                    }, //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({
                                signUpErrorMessage: errorResponse.response.data.message, signUpUpdating: false
                            });
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating: false});

                        }

                    });
        }

    }
    /**
     * Add function to edit a specific row
     */
    deleteRow = (rowId: number) => {
        //Set the active row
        this.setState({activeRow: undefined});

        //Get the updated info
        if (this.props.eventInfo.signupId) {
            //Turn on the loading
            this.setState({signUpUpdating: true})

            //Set the signUpResponse to loading
            eventsService.deleteEventSignup(this.props.category, this.props.eventInfo.signupId, rowId)
                .then(//If successful html will be returned
                    form => {
                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating: false})
                    }, //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({
                                signUpErrorMessage: errorResponse.response.data.message, signUpUpdating: false
                            });
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating: false});
                        }

                    });
        }

    }

    //Submit the form
    onSubmit = (form: any) => {
        //Set the state for submitting
        this.setState({signUpUpdating: true});

        //Now send it.  We expecte an upadted info on the way back
        if (this.props.eventInfo.signupId) {
            eventsService.postEventSignup(form, this.props.category, this.props.eventInfo.signupId, this.state.activeRow)
                .then(//If successful html will be returned
                    form => {
                        //Update the state
                        this.setState({signUpResponse: form, signUpUpdating: false, activeRow: undefined});

                        //State that the changes were saved
                        const msg = "Sign-Up saved for " + this.props.eventInfo.name;
                        //Also dispatch a success message
                        this.props.successAutoDismiss(msg, 7000);
                    }, //If there was an error, show to the user
                    errorResponse => {
                        //Dispatch the error
                        try {
                            this.setState({
                                signUpErrorMessage: errorResponse.response.data.message, signUpUpdating: false
                            });
                        } catch (e) {
                            this.setState({signUpErrorMessage: errorResponse.toString(), signUpUpdating: false});

                        }

                    });
        }
    };


    resetForm = () => {
        this.setState({formCount: this.state.formCount + 1});

    };


    //Define a filter to replace the animal id with an image
    filterAniIds = (input: any) => {

        //See if there are any
        const codes = findShelterIds(input);

        //If there is a list
        if (codes != null) {

            //Replace the commas
            input = input.toString().replace(/\,/g, '<br/>');
            input = input.toString().replace(/\:/g, '');

            //For each code
            codes.forEach(code => {

                //See if there is an animal
                const ani = findAnimalByShelterId(code, this.props.cawsAnimalsDb.animals)


                //Replace the names
                if (ani) {
                    input = input.toString().replace(code, '<a href="/animal/' + ani.data.id + '" target="_blank"> <img src="' + ani.getImageUrl() + '" class="ui avatar image"  /></a> ');

                }


            })

            //Replace the input with a span
            input = <span
                dangerouslySetInnerHTML={{
                    __html: input
                }}/>
        }

        return input;
    }

    //Define a filter to replace the animal id with an image
    buildPrintKC = (): any => {

        //Build a string out of all of the event info
        let shelterCodes: string[] = [];

        //Add in all of the data
        if (this.state.signUpResponse) {
            //Extract so that it knows it is not null
            const signUpInfo: SignUpResponse = this.state.signUpResponse!;

            //Each each value
            if (signUpInfo.existingSignUps) {
                signUpInfo.existingSignUps.values.forEach(arr => arr.forEach(item => {
                    //If there are any shetler codes
                    let foundCodes = findShelterIds(item.toString());

                    if (foundCodes != null) {
                        shelterCodes = shelterCodes.concat(...foundCodes);
                    }
                }));
            }
        }

        if (shelterCodes.length > 0) {

            //For each code
            let ids = shelterCodes.map(code => findAnimalByShelterId(code, this.props.cawsAnimalsDb.animals)).filter(ani => ani).map(ani => (ani as ShelterAnimal).data.id);

            //Now build the params
            let params = new URLSearchParams();
            ids.forEach(id => {
                params.append("id", id.toString())
            });

            return <a href={"/kennelcard?" + params.toString()}>Preview Kennel Cards</a>;
        } else {
            return null;
        }

    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Add a header and date
        components.push(<Header key='header' as='h2'>
            <Icon name='checked calendar'/>
            <Header.Content>
                {this.props.eventInfo.name}
                <Header.Subheader>{formatDate(this.props.eventInfo.date)}</Header.Subheader>
            </Header.Content>
        </Header>);


        //Now show the signup information
        //See if we should show info
        if (this.props.eventInfo.infoId) {
            if (this.state.htmlInfo.length === 0) {
                components.push(<div key={"loading div"}>
                    <Dimmer inverted active>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                </div>);
            } else {
                //Return the html
                components.push(<div key={this.props.eventInfo.infoId}
                                     dangerouslySetInnerHTML={{__html: this.state.htmlInfo}}/>);
            }
        }


        //See if we should show info
        if (this.props.eventInfo.signupId) {
            //Show the error message
            if (this.state.signUpErrorMessage) {
                components.push(<p>{this.state.signUpErrorMessage}</p>)
            }

            if (this.state.signUpResponse) {
                //Extract so that it knows it is not null
                const signUpInfo: SignUpResponse = this.state.signUpResponse!;

                //If we have existing signups that means we want to edit each one by them selves
                if (signUpInfo.existingSignUps) {
                    components.push(<Dimmer.Dimmable key='dimmingSignUps' blurring dimmed={this.state.signUpUpdating}>
                        {/*Add in the existing responses if they are avail*/}
                        <SignUpsTable
                            signups={signUpInfo.existingSignUps}
                            selectRow={(rowId: number) => this.editRow(rowId)}
                            deleteRow={(rowId: number) => this.deleteRow(rowId)}
                            selectedRow={this.state.activeRow}
                            filter={this.filterAniIds}
                        />

                        {/*Show the kennel card link there is one*/}
                        {this.buildPrintKC()}

                        {/*Add in the signup form*/}
                        <Form
                            schema={signUpInfo.signupForm.JSONSchema}
                            uiSchema={signUpInfo.signupForm.UISchema}
                            formData={signUpInfo.signupForm.formData}
                            widgets={customWidgets}
                            onSubmit={this.onSubmit}
                            liveValidate={true}
                            showErrorList={false}
                        >
                            {/*Render a custom Submit button*/}
                            {this.state.activeRow && <div>
                                <Button primary type="submit">Update SignUp</Button>
                                <Button
                                    onClick={() => this.editRow()}
                                    type="submit">Cancel</Button>
                            </div>}
                            {!this.state.activeRow && <div>
                                <Button primary type="submit">SignUp</Button>
                            </div>}

                        </Form>
                    </Dimmer.Dimmable>)

                } else {
                    //Just show the one signup
                    components.push(<Dimmer.Dimmable key='dimmingSignUps' blurring dimmed={this.state.signUpUpdating}>
                        {/*Add in the signup form*/}
                        <Form key={this.state.formCount}
                              schema={signUpInfo.signupForm.JSONSchema}
                              uiSchema={signUpInfo.signupForm.UISchema}
                              formData={signUpInfo.signupForm.formData}
                              widgets={customWidgets}
                              onSubmit={this.onSubmit}
                              liveValidate={true}
                              showErrorList={false}
                        >
                            {/*Render a custom/hidden Submit button*/}
                            <Button primary type="submit">Save</Button>
                            <Button type="button" secondary onClick={this.resetForm}> Cancel & Reset </Button>

                        </Form>

                    </Dimmer.Dimmable>)
                }
                //Add any existing animals if they are attending
                components.push(<AnimalsAttending publicColumns={signUpInfo.publicColumns}>

                </AnimalsAttending>)


            } else {
                //Show a loading screen
                components.push(<div key='loadingDimmer'>
                    <Dimmer.Dimmable>
                        <Dimmer inverted active>
                            <Loader>{this.state.signUpResponse

                            }</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                    </Dimmer.Dimmable>
                </div>);
            }
        }

        //Add everything in a segment
        return (<Segment>
            {components}
        </Segment>);


    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps & StateProps {
    return {
        ...myProps, cawsAnimalsDb: state.animals
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(mapStateToProps)(EventViewer);


