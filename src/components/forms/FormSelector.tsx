import React from 'react';
import JSX from 'react';

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import AnimalState from "../../state/AnimalState";
import {ThunkDispatch} from "redux-thunk";
import {formsActions} from "../../actions/forms.actions";
import FormListing from "../../models/FormListing";
import {RouteComponentProps} from "react-router";
import {Dimmer, Image, Loader, Segment} from "semantic-ui-react";
import Breadcrumbs from "../content/Breadcrumbs";
import DocumentHierarchy from "../content/DocumentHierarchy";
import FormViewer from "./FormViewer";

interface MyProps extends RouteComponentProps<any> {
    category: string;
}

//Define the expected props
interface LinkProps {
    //Define the props we expect
    animalsDb: AnimalState
    formsListing?: FormListing
    formId?: string;
}

interface DispatchProps {
    getFormsListing: (category: string) => any;
}


/**
 * This card shows the animal details
 */
class FormSelector extends React.Component<MyProps & DispatchProps & LinkProps> {
    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // get the forms
        this.props.getFormsListing(this.props.category);

    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        if (this.props.formsListing === undefined) {
            return (<div>
                    <Segment>
                        <Dimmer inverted active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>

                    </Segment>
                </div>);

        }

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        const specificItem = this.props.formsListing.findItem(this.props.formId)
        if (specificItem) {
            const breadCrumbs = <Breadcrumbs key={"breadCrumbs" + specificItem.id}
                                             breadCrumbs={this.props.formsListing.buildBreadcrumbs(specificItem.id)}
                                             link={`/${this.props.category}`}/>
            components.push(breadCrumbs);
            //Load up the article
            components.push(<FormViewer category={this.props.category} key={specificItem.id} formData={specificItem}/>);
        } else {
            let specificListing = this.props.formsListing.findListing(this.props.formId)
            specificListing = specificListing ?? this.props.formsListing.data;

            const breadCrumbs = <Breadcrumbs key={"breadCrumbs" + specificListing.id}
                                             breadCrumbs={this.props.formsListing.buildBreadcrumbs(specificListing.id)}
                                             link={`/${this.props.category}`}/>

            components.push(<DocumentHierarchy header={breadCrumbs} key={"heir" + specificListing.id}
                                               linkPath={`/${this.props.category}`} listing={specificListing}/>);
        }

        //Start rendering
        return (<div>
                {components}
            </div>);
    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        getFormsListing: (category: string) => dispatch(formsActions.getFormListing(category))
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: MyProps): MyProps & LinkProps {
    return {
        ...myProps,
        animalsDb: state.animals,
        formsListing: state.forms.formsListing[myProps.category],
        formId: myProps.match.params.formId
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(mapStateToProps, mapDispatchToProps)(FormSelector);

