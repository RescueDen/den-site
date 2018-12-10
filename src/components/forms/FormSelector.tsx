import React from 'react';
import JSX from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import FormsSummary, {FormItemData, isFormItemData} from "../../models/FormsSummary";
import {RouteComponentProps} from "react-router";
import {Dimmer, Header, Image, Loader, Segment} from "semantic-ui-react";
import {DocumentItemData, isDirectory} from "../../models/DocumentSummary";
import Breadcrumbs from "../newsAndInfo/Breadcrumbs";
import DocumentHierarchy from "../newsAndInfo/DocumentHierarchy";
import FormViewer from "./FormViewer";


//Define the expected props
interface LinkProps  extends RouteComponentProps<any> {
    //Define the props we expect
    cawsAnimalsDb: AnimalState
    formsSummary: FormsSummary
    formId?:string;


}




interface DispatchProps{
    //And the actions that must be done
    getFormsSummary: () => any;

}


/**
 * This card shows the animal details
 */
class FormSelector extends React.Component<DispatchProps&LinkProps> {


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
        //Check to see if we are still loading
        if(this.props.formsSummary.empty()){
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

        //Get the articleItem we are showing is specified.  If not get the root
        const item: DocumentItemData = this.props.formId? this.props.formsSummary.findArticleItem(this.props.formId): this.props.formsSummary.data;

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Start out with a title
        components.push(
            <Header key={"header"} as="h1">Forms</Header>
        );

        //Add in the bread crumbs
        components.push(
            <Breadcrumbs key={"breadCrumbs"+item.id} breadCrumbs={this.props.formsSummary.buildBreadcrumbs(item.id)} link={"/forms"}/>
        )

        //If this is an folder show the folder information
        if(isDirectory(item)){
            components.push(
                <DocumentHierarchy key={"heir"+item.id} linkPath={"/forms"} item={item}/>
            );
        }else{
            //Check to see if a valid form
            if(isFormItemData(item) ){
                //Load up the article
                components.push(<FormViewer key={item.id} formData={item} />);
            }else{
                components.push(<div key={item.id}>Invalid form {item.id}</div>);

            }


        }

        //Start rendering
        return (
            <div>
                {components}
            </div>
        );

    }
};

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
function mapStateToProps(state:ApplicationState, myProps:LinkProps): LinkProps {

    return {
        ...myProps,
        cawsAnimalsDb:state.animals,
        formsSummary:state.forms.formsSummary,
        formId:myProps.match.params.formId

    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSelector);

