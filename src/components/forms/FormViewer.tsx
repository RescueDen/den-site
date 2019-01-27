import React from 'react';

import {connect} from "react-redux";

import {FormItemData} from "../../models/FormsSummary";


import Form, {Widget, WidgetProps} from "react-jsonschema-form-semanticui-fixed";
import {FormSubmision} from "../../models/FormSubmision";
import ApplicationState from "../../state/ApplicationState";
import {formsService} from "../../services/forms.service";
import {Dimmer, Dropdown, Loader, Segment} from "semantic-ui-react";
import {extractMessageFromPossibleServerResponseStatus} from "../../models/ServerStatus";
import MyFosterSelection from "./MyFosterSelection";
import CawsUser from "../../models/CawsUser";



//Define the expected props
interface LinkProps {
    formData: FormItemData

    formWidgets?: { [name: string]: Widget };

    //Store a person
    user?: CawsUser;
}


interface State{
    //And the actions that must be done
    submitting: boolean

}



/**
 * This card shows the animal details
 */
class FormViewer extends React.Component<LinkProps, State> {
    state={submitting:false}

    //Submit the form
    onSubmit = (form:any) => {

        //Set the state for submitting
        this.setState({submitting:true});

        //Build a form submission
        const formSub: FormSubmision = {
            id: this.props.formData.id,
            submission: form
        }

        //Now send it
        formsService.submitForm(formSub).then(
            data =>{
                //Update the state
                this.setState({submitting:false});

                if(data.status){
                    //Update the state
                    alert(this.props.formData.metadata.title + " form has been successfully submitted.");

                }else{
                    //Could not submit
                    alert("Could not submit form: " + data.message);

                }


            },
            errorResponse =>{
                //Update the state
                this.setState({submitting:false});

                //Get the message
                const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                //Else it failed
                alert("Could not submit form: " + message);

            }



        )
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
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Merge the widgets to gether
        let widgets={
            "animalIdWidget":this.animalIdWidget,
        }

        //If there are other widgets add them
        if(this.props.formWidgets){
            widgets = {...widgets, ...this.props.formWidgets}
        }

        //Get a copy of the schema
        let uiSchema = this.props.formData.UISchema;


        //Set any known values
        const formData: { [id: string]: any; } = {};

        //If the user is specified set them
        if(this.props.user){
            formData["personEmail"]  = this.props.user.data.email;
            formData["personId"]  = this.props.user.getCodeAndName();

            //Make a hidden
            const hidden = {"ui:widget": "hidden"};

            //Hide the values as well
            uiSchema["personEmail"] = hidden;
            uiSchema["personId"] = hidden;

        }


        //For now just render
        return(
            <Segment>
                <Dimmer active={this.state.submitting} inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                <Form schema={this.props.formData.JSONSchema}
                      uiSchema={uiSchema}
                      widgets={widgets}
                      onSubmit={this.onSubmit}
                      formData={formData}
                />

            </Segment>


        )

    }
};


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, incoming:LinkProps):LinkProps {
    return {
        ...incoming,
        user:state.authentication.loggedInUser
    };
}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
)(FormViewer);

