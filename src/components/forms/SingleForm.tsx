import React from "react";
import {Grid, Header, Image, Segment, SemanticICONS, Table} from "semantic-ui-react";
import fromFood from '../../assets/pictures/frommFood.jpg'
import FormsSummary, {isFormItemData} from "../../models/FormsSummary";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import FormViewer from "../forms/FormViewer";


//Define the expected props
interface LinkProps {
    //Define the props we expect
    formsSummary: FormsSummary;

}

//Define the expected props
interface IncomingProps {
    //Define the props we expect
    formId:string;

}

interface DispatchProps{
    //And the actions that must be done
    getFormsSummary: () => any;

}


/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class SingleForm extends React.Component<IncomingProps&LinkProps&DispatchProps > {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // get the forms
        this.props.getFormsSummary();

    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //See if there is a suppliesForm
        const form  = this.props.formsSummary.findArticleItem(this.props.formId)

        return (
            <div>
                {/*Add the form to request information*/}
                {form && isFormItemData(form)  &&
                <FormViewer key={form.id} formData={form} />


                }
            </div>
        );
    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getFormsSummary:() =>  dispatch(formsActions.getFormsSummary())
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, myProps:IncomingProps): IncomingProps&LinkProps {

    return {
        ...myProps,
        formsSummary:state.forms.formsSummary,
    };
}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleForm);

