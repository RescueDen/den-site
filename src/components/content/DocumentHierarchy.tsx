import React from 'react';
import JSX, {ReactNode} from 'react';
import {Grid, Input, List} from "semantic-ui-react";
import {ItemData} from "../../models/ItemData";
import {inSearchResults, ListingData} from "../../models/ContentListing";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/date-formater";


//Define the expected props
interface MyProps {
    //Define the props we expect
    listing: ListingData;
    linkPath: string;
    header?: ReactNode;
}

//Keep a state of open documents
interface MyState {
    hidden: { [id: string]: boolean };
    //Define the props we expect
    searchTerm: string
}

//Const defaultShow
const defaultHide = true;

/**
 * This card shows the animal details
 */
class DocumentHierarchy extends React.Component<MyProps, MyState> {
    state = {hidden: {} as { [id: string]: boolean }, searchTerm: ""};

    /**
     * Function to update search
     */
    updateSearch(term: string) {
        this.setState({searchTerm: term});
    }

    //Add a function to update hidden on dir
    updateHiddenOnDir(id: string) {
        const currentStatus = this.state.hidden[id] !== undefined && this.state.hidden[id];

        //Now update my local state
        this.setState({hidden: {...this.state.hidden, [id]: !currentStatus}});
    }

    buildHierarchy(listing: ListingData): JSX.ReactNode {
        //Determine if this directory is hidden
        let hidden: boolean = this.state.hidden[listing.id] !== undefined && this.state.hidden[listing.id];

        //See if we should flip the default behavior
        if (defaultHide)
            hidden = !hidden;

        //Force to not be hidden if searching
        if (this.state.searchTerm.length > 0) {
            hidden = false;
        }

        return (
            <List.Item size='big' key={listing.id}>
                <List.Icon size='big' onClick={() => this.updateHiddenOnDir(listing.id)}
                           name={hidden ? "folder outline" : "folder open outline"}/>
                <List.Content>
                    <List.Header as="h3"><Link
                        to={`${this.props.linkPath}/${listing.id}`}>{listing.name}</Link></List.Header>
                </List.Content>

                {/*Now add a list of children if not hidden*/}
                {!hidden &&
                    <List.List>
                        {listing.listings && listing.listings.map(subList => {
                            return this.buildHierarchy(subList);
                        })}

                        {listing.items && listing.items.map(subItem => {
                            return this.getItemListing(subItem);
                        })
                        }
                    </List.List>
                }

            </List.Item>
        );
    }

    //Build the list
    getItemListing(item: ItemData): JSX.ReactNode {
        //If this is just a document, see if it included in the search
        if (inSearchResults(item, this.state.searchTerm) && !item.hideListing) {
            // this is just a document
            return (
                <List.Item key={item.id}>
                    <List.Icon name='file alternate outline'/>
                    <List.Content>
                        <List.Header as="h3"><Link
                            to={`${this.props.linkPath}/${item.id}`}>{item.name}</Link></List.Header>
                        {item.date &&
                            <List.Header as="h4">{formatDate(item.date)}</List.Header>
                        }
                        <List.Description>{item.preview}</List.Description>
                    </List.Content>
                </List.Item>
            );
        } else {
            return;
        }
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <div>
                {/*Define a stackable grid to offset the header from the search box*/}
                <Grid stackable columns={2}>
                    <Grid.Column floated='left' textAlign='left'>
                        {this.props.header}

                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right'>
                        {/*Float the search bar to the right*/}
                        <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                               onChange={v => this.updateSearch(v.currentTarget.value)}/>

                    </Grid.Column>
                </Grid>

                <List>
                    {this.props.listing.listings && this.props.listing.listings.map(subList => {
                        return this.buildHierarchy(subList);
                    })}

                    {this.props.listing.items && this.props.listing.items.map(subItem => {
                        return this.getItemListing(subItem);
                    })
                    }
                </List>
            </div>
        );

    }
}


export default DocumentHierarchy