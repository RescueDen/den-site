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
    insideSummary?: ArticlesSummary;
    articleId?:string;
}


interface DispatchProps{
    //And the actions that must be done
    getInsideSummary: () => any;

}


/**
 * This card shows the animal details
 */
class InsideCaws extends React.Component<LinkProps&DispatchProps, any> {

    /**
     * Gets called once when the page loads.  Tell the system to download or update the summary
     */
    componentDidMount(){
        // reset login status
        this.props.getInsideSummary()
    };



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Check to see if we are still loading
        if(!this.props.insideSummary || this.props.insideSummary.empty()){
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
        const item: ArticleItemData = this.props.articleId? this.props.insideSummary.findArticleItem(this.props.articleId): this.props.insideSummary.data;

        //Start to build the list of React
        let components: JSX.ReactNode[] = [];

        //Start out with a title
        components.push(
            <Header key={"header"} as="h1">Inside CAWS</Header>
        );


        //Build the breadcrumbs
        const breadCrumbs =     <Breadcrumbs key={"breadCrumbs"+item.id} breadCrumbs={this.props.insideSummary.buildBreadcrumbs(item.id)} link={"/inside"}/>


        //If this is an folder show the folder information
        if(isDirectory(item)){
            components.push(
                <DocumentHierarchy header={breadCrumbs} key={"heir"+item.id} linkPath={"/inside"} item={item}/>
            );
        }else{
            //Add in the bread crumbs
            components.push(
                breadCrumbs
            )
            //Load up the article
            components.push(<ArticleViewer key={"view"+item.id} item={item} />);
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
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        insideSummary: state.info.insideSummary,
        articleId:myProps.match.params.articleId
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        getInsideSummary:() =>  dispatch(infoActions.getInsideSummary())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(InsideCaws);
