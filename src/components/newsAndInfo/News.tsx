import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import JSX from 'react';
import ApplicationState from "../../state/ApplicationState";

import {Image, Segment, Dimmer, Loader, Container, Header, Item} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticlesSummary, {ArticleItemData} from "../../models/ArticlesSummary";
import {infoActions} from "../../actions/info.actions";
import DocumentHierarchy from "./DocumentHierarchy";
import ArticleViewer from "./ArticleViewer";
import {newsActions} from "../../actions/news.actions";
import ArticleItem from "./ArticleItem";
import ArticleItemList from "./ArticleItemList";
import {isDirectory} from "../../models/DocumentSummary";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    newsSummary: ArticlesSummary;
    articleId?:string;
}


interface DispatchProps{
    //And the actions that must be done
    getNewsSummary: () => any;

}


/**
 * This card shows the animal details
 */
class News extends React.Component<LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getNewsSummary();
    };



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        if(this.props.newsSummary.empty()){
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
        const item: ArticleItemData = this.props.articleId? this.props.newsSummary.findArticleItem(this.props.articleId): this.props.newsSummary.data;

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Start out with a title
        components.push(
            <Header key="header" as="h1">News & Updates</Header>
        );

        //If this is an folder show the folder information
        if(isDirectory(item)) {
            //If there are items
            if (item.items) {
                //Add a list of them
                components.push(
                    <ArticleItemList key={item.id} item={item} linkPath={"/news"}/>
                );
            }
        }else{
            //Load up the article
            components.push(<ArticleViewer key={item.id} item={item} />);
        }


        //Start rendering
        return (
            <div>
                {components}
            </div>
        );


    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        newsSummary: state.news.newsSummary,
        articleId:myProps.match.params.articleId
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:LinkProps):DispatchProps {
    return {
        getNewsSummary:() =>  dispatch(newsActions.getNewsSummary())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(News);
