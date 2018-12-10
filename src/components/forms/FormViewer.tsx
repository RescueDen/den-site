import React from 'react';

import {connect} from "react-redux";

import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import {FormItemData} from "../../models/FormsSummary";


import Form from "react-jsonschema-form-semanticui-fixed";
import {FormSubmision} from "../../models/FormSubmision";
import ApplicationState from "../../state/ApplicationState";



//Define the expected props
interface LinkProps {
    formData: FormItemData

}




interface DispatchProps{
    //And the actions that must be done
    getFormsSummary: () => any;
    submitForm: (sub:FormSubmision) => any
}


/**
 * This card shows the animal details
 */
class FormViewer extends React.Component<DispatchProps&LinkProps> {


    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        // this.props.getFormsSummary();

    };

    //Submit the form
    onSubmit = (form:any) => {

        //Build a form submission
        const formSub: FormSubmision = {
            id: this.props.formData.id,
            submission: form
        }

        //Now send it
        this.props.submitForm(formSub);
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
       //For now just render
        return(
            <Form schema={this.props.formData.JSONSchema}
                  uiSchema={this.props.formData.UISchema}
                  onSubmit={this.onSubmit}


            />

        )

    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState) {
    return {};
}


/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getFormsSummary:() =>  dispatch(formsActions.getFormsSummary()),
        submitForm: (sub:FormSubmision) =>  dispatch(formsActions.submitForm(sub))
    };

}




//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(FormViewer);

