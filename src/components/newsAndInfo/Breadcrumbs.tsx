import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import JSX from 'react';
import ApplicationState from "../../state/ApplicationState";

import {Image, Segment, Dimmer, Loader, Container, Header, Breadcrumb} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticlesSummary, {ArticleItemData} from "../../models/ArticlesSummary";
import {infoActions} from "../../actions/info.actions";
import DocumentHierarchy from "./DocumentHierarchy";
import ArticleViewer from "./ArticleViewer";
import {Link} from "react-router-dom";
import {isDirectory} from "../../models/DocumentSummary";



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
        //Get the item
        const item = props.breadCrumbs[i];


        //Add the main link
        crumbs.push(
            <Breadcrumb.Section key={item.id}>
                <Link to={`${props.link}/${item.id}`} >
                {item.name}
                </Link>
            </Breadcrumb.Section>
        );

        //Now add the divided
        crumbs.push(
            <Breadcrumb.Divider key={i} />
        );
    }

    //Now add the last item
    const lastItem = props.breadCrumbs[props.breadCrumbs.length-1];
    crumbs.push(<Breadcrumb.Section key={lastItem.id} active>{lastItem.name}</Breadcrumb.Section>)


    //Return the breadcrumbs
    return(
        <Breadcrumb>
            {crumbs}
        </Breadcrumb>
    );




}

export default Breadcrumbs