import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import JSX from 'react';
import ApplicationState from "../../state/ApplicationState";

import {Image, Segment, Dimmer, Loader, Container, Header} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticlesSummary, {ArticleItemData} from "../../models/ArticlesSummary";
import {infoActions} from "../../actions/info.actions";
import DocumentHierarchy from "./DocumentHierarchy";
import ArticleViewer from "./ArticleViewer";
import Breadcrumbs from "./Breadcrumbs";
import {isDirectory} from "../../models/DocumentSummary";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    infoSummary: ArticlesSummary;
    articleId?:string;
}


interface DispatchProps{
    //And the actions that must be done
    getInfoSummary: () => any;

}


/**
 * This card shows the animal details
 */
class Information extends React.Component<LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getInfoSummary()
    };



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        if(this.props.infoSummary.empty()){
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
        const item: ArticleItemData = this.props.articleId? this.props.infoSummary.findArticleItem(this.props.articleId): this.props.infoSummary.data;

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Start out with a title
        components.push(
            <Header key={"header"} as="h1">Information</Header>
        );

        //Add in the bread crumbs
        components.push(
            <Breadcrumbs key={"breadCrumbs"+item.id} breadCrumbs={this.props.infoSummary.buildBreadcrumbs(item.id)} link={"/info"}/>
        )

        //If this is an folder show the folder information
        if(isDirectory(item)){
            components.push(
                <DocumentHierarchy key={"heir"+item.id} linkPath={"/info"} item={item}/>
            );
        }else{
            //Load up the article
            components.push(<ArticleViewer key={"view"+item.id} item={item} />);
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
        infoSummary: state.info.infoSummary,
        articleId:myProps.match.params.articleId
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getInfoSummary:() =>  dispatch(infoActions.getInfoSummary())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Information);
