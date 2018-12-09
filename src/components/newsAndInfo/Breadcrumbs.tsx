import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import JSX from 'react';
import ApplicationState from "../../state/ApplicationState";

import {Image, Segment, Dimmer, Loader, Container, Header, Breadcrumb} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticlesSummary, {ArticleItemData, isDirectory} from "../../models/ArticlesSummary";
import {infoActions} from "../../actions/info.actions";
import ArticleHierarchy from "./ArticleHierarchy";
import ArticleViewer from "./ArticleViewer";
import {Link} from "react-router-dom";



//Define the expected props
interface LinkProps {
    //Define the props we expect
    breadCrumbs: ArticleItemData[];
    link:string;
}



/**
 * Simple method to get the bread crumbs
 */
const Breadcrumbs = (props:LinkProps) => {
    //Start to build the list of React
    let crumbs: JSX.ReactNode[] = [];

    //For every prop
    for(let i = 0; i < props.breadCrumbs.length-1; i++){
        //Add the main link
        crumbs.push(
            <Breadcrumb.Section link>
                <Link to={`${props.link}/${props.breadCrumbs[i].id}`} >
                {props.breadCrumbs[i].name}
                </Link>
            </Breadcrumb.Section>
        );

        //Now add the divided
        crumbs.push(
            <Breadcrumb.Divider />
        );
    }

    //Now add the last item
    crumbs.push(<Breadcrumb.Section active>{props.breadCrumbs[props.breadCrumbs.length-1].name}</Breadcrumb.Section>)


    //Return the breadcrumbs
    return(
        <Breadcrumb>
            {crumbs}
        </Breadcrumb>
    );




}

export default Breadcrumbs