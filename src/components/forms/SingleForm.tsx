import React from "react";
import FormListing, {isFormItemData} from "../../models/FormListing";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import FormViewer from "../forms/FormViewer";

//Define the expected props
interface LinkProps {
    //Define the props we expect
    formsSummary: FormListing;

}

interface IncomingProps {
    category: string;
    formId: string;
}

interface DispatchProps {
    //And the actions that must be done
    getFormListing: (category: string) => any;
}


/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class SingleForm extends React.Component<IncomingProps & LinkProps & DispatchProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // get the forms
        this.props.getFormListing(this.props.category);
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //See if there is a suppliesForm
        const form = this.props.formsSummary.findItem(this.props.formId)

        return (
            <div>
                {/*Add the form to request information*/}
                {form && isFormItemData(form) &&
                    <FormViewer category={this.props.category} key={form.id} formData={form}/>


                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getFormListing: (category: string) => dispatch(formsActions.getFormListing(category))
    };

}

function mapStateToProps(state: ApplicationState, myProps: IncomingProps): IncomingProps & LinkProps {

    return {
        ...myProps,
        formsSummary: state.forms.formsListing[myProps.category],
    };
}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleForm);

