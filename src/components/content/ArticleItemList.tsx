import React, {ReactNode} from 'react';

import {Grid, Input, Item} from "semantic-ui-react";
import ArticleItem from "./ArticleItem";
import {ContentListing, inSearchResults} from "../../models/ContentListing";


//Define the expected props
interface MyProps {
    //Define the props we expect
    item: ContentListing;
    linkPath: string;
    header?: ReactNode;
}

//Keep a state of open documents
interface MyState {
    //Define the props we expect
    searchTerm: string
}

/**
 * Show a list of article Items
 */
class ArticleItemList extends React.Component<MyProps, MyState> {
    state = {searchTerm: ""};

    /**
     * Function to update search
     */
    updateSearch(term: string) {
        this.setState({searchTerm: term});
    }

    getItems() {
        //If we have items
        if (this.props.item.data.items) {
            //Now search and map
            return this.props.item.data.items.filter(item => {
                //Check if in results
                return (inSearchResults(item, this.state.searchTerm))
            }).map(item => {
                    return <ArticleItem key={item.id} item={item} link={this.props.linkPath}/>;
                }
            )
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

                <Item.Group divided>
                    {/*If there are props*/}
                    {this.getItems()}
                </Item.Group>
            </div>
        );

    }
}


//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default ArticleItemList;