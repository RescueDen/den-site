import React from 'react';
import JSX from 'react';

import {Breadcrumb} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {ItemData} from "../../models/ItemData";
import {ListingData} from "../../models/ContentListing";


//Define the expected props
interface LinkProps {
    //Define the props we expect
    breadCrumbs: (ItemData|ListingData)[];
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