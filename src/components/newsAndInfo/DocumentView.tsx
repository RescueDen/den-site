import React from 'react';
import JSX from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {Dimmer, Header, Image, Loader, Segment} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {ContentListing, Listing} from "../../models/ContentListing";
import ArticleViewer from "./ArticleViewer";
import DocumentHierarchy from "./DocumentHierarchy";
import {contentActions} from "../../actions/content.actions";
import Breadcrumbs from "./Breadcrumbs";

interface MyProps {
    category : string;
}

//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    listing?: ContentListing;
    articleId?:string;
}


interface DispatchProps{
    getContentListing: (category:string) => any;
}

class DocumentView extends React.Component<MyProps&LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        this.props.getContentListing(this.props.category);
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        if(this.props.listing === undefined){
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

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];
        const specificItem = this.props.listing.findItem(this.props.articleId)
        if (specificItem){
            const breadCrumbs = <Breadcrumbs key={"breadCrumbs"+specificItem.id} breadCrumbs={this.props.listing.buildBreadcrumbs(specificItem.id)} link={`/${this.props.category}`}/>
            components.push(
                breadCrumbs
            );
            //Load up the article
            components.push(<ArticleViewer category={this.props.category} key={specificItem.id} item={specificItem} />);
        }else{
            let specificListing = this.props.listing.findListing(this.props.articleId)
            specificListing = specificListing ?? this.props.listing.data;

            const breadCrumbs = <Breadcrumbs key={"breadCrumbs"+specificListing.id} breadCrumbs={this.props.listing.buildBreadcrumbs(specificListing.id)} link={`/${this.props.category}`}/>

            components.push(
                    <DocumentHierarchy header={breadCrumbs} key={"heir"+specificListing.id} linkPath={`/${this.props.category}`} listing={specificListing}/>
                );
        }

        //Start rendering
        return (
            <Segment>
                {components}
            </Segment>
        );


    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:MyProps&LinkProps ):MyProps&LinkProps {
    return {
        ...myProps,
        listing: state.content.contentListings[myProps.category],
        articleId:myProps.match.params.articleId
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getContentListing:(category:string) => dispatch(contentActions.getContentSummary(category))
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(DocumentView);
