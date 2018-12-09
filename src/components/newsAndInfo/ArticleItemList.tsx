import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import JSX from 'react';
import ApplicationState from "../../state/ApplicationState";

import {Image, Segment, Dimmer, Loader, Container, Header, Item, Input} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import ArticlesSummary, {ArticleItemData, inSearchResults} from "../../models/ArticlesSummary";
import {infoActions} from "../../actions/info.actions";
import ArticleHierarchy from "./ArticleHierarchy";
import ArticleViewer from "./ArticleViewer";
import {newsActions} from "../../actions/news.actions";
import ArticleItem from "./ArticleItem";


//Define the expected props
interface MyProps  {
    //Define the props we expect
    item:ArticleItemData;
    linkPath:string;

}

//Keep a state of open documents
interface MyState{
    //Define the props we expect
    searchTerm: string
}

/**
 * Show a list of article Items
 */
class ArticleItemList extends React.Component<MyProps, MyState> {
    state = {searchTerm:""};


    /**
     * Function to update search
     */
    updateSearch(term:string){
        this.setState({searchTerm:term});
    }

    getItems(){
        //If we have items
        if(this.props.item.items){
            //Now search and map
            return this.props.item.items.filter(item =>{
                //Check if in results
                return(inSearchResults(item, this.state.searchTerm))
            }).map(item => {
                    return <ArticleItem key={item.id} item={item} link={this.props.linkPath}/>;
                }
            )
        }else{
            return;
        }
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return(
            <div>
                <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                       onChange={v => this.updateSearch(v.currentTarget.value)}/>
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