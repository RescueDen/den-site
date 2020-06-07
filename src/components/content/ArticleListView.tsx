import React from 'react';
import JSX from 'react';
import {connect} from 'react-redux';
import ApplicationState from "../../state/ApplicationState";

import {Dimmer, Header, Image, Loader, Segment} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticleViewer from "./ArticleViewer";
import {contentActions} from "../../actions/content.actions";
import ArticleItemList from "./ArticleItemList";
import {ContentListing} from "../../models/ContentListing";

interface MyProps {
    category : string;
}

interface LinkProps extends RouteComponentProps<any> {
    newsListing?: ContentListing;
    articleId?:string;
}
interface DispatchProps{
    //And the actions that must be done
    getContentListing: (category:string) => any;
}

class ArticleListView extends React.Component<MyProps&LinkProps&DispatchProps, any> {
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
        if(this.props.newsListing === undefined || this.props.newsListing.empty()){
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
        const specificItem = this.props.newsListing.findItem(this.props.articleId)
        if (specificItem){
            //Start out with a title
            components.push(
                <Header key="header" as="h1">{this.props.newsListing.data.name}</Header>
            );
            //Load up the article
            components.push(<ArticleViewer category={this.props.category} key={specificItem.id} item={specificItem} />);
        }else{
            //Add a list of them
            components.push(
                <ArticleItemList
                    header={<Header key="header" as="h1">{this.props.newsListing.data.name}</Header>}
                    key={this.props.newsListing.data.id}
                    item={this.props.newsListing}
                    linkPath={"/news"}/>
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
        newsListing: state.content.contentListings[myProps.category],
        articleId:myProps.match.params.articleId
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:MyProps&LinkProps ):DispatchProps {
    return {
        getContentListing:(category:string) => dispatch(contentActions.getContentSummary(category))
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ArticleListView);
