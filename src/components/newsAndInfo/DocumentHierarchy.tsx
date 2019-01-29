import React, {ReactNode} from 'react';
import JSX from 'react';

import {Input, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {DocumentItemData, inSearchResults, isDirectory} from "../../models/DocumentSummary";
import {Grid} from "semantic-ui-react";



//Define the expected props
interface MyProps  {
    //Define the props we expect
    item:DocumentItemData;
    linkPath:string;
    header?:ReactNode;

}

//Keep a state of open documents
interface MyState{
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
    state = {hidden:{} as { [id: string]: boolean }, searchTerm:""};


    /**
     * Function to update search
     */
    updateSearch(term:string){
        this.setState({searchTerm:term});
    }


    //Add a function to update hidden on dir
    updateHiddenOnDir(id:string){
        const currentStatus = this.state.hidden[id] != undefined && this.state.hidden[id];

        //Now update my local state
        this.setState({hidden:{...this.state.hidden, [id]:!currentStatus}});
    }

    //Build the list
    buildHierarchy(item: DocumentItemData): JSX.ReactNode{
        //If this is a directory it
        if(isDirectory(item)){
            //Determine if this directory is hidden
            let hidden:boolean = this.state.hidden[item.id] != undefined && this.state.hidden[item.id];

            //See if we should flip the default behavior
            if(defaultHide)
                hidden = ! hidden;

            //Force to not be hidden if searching
            if(this.state.searchTerm.length > 0){
                hidden = false;
            }

            return (
                <List.Item size='big' key={item.id}>
                    <List.Icon size='big' onClick={() => this.updateHiddenOnDir(item.id)} name={hidden? "folder outline":"folder open outline" } />
                    <List.Content >
                        <List.Header as="h3" ><Link to={`${this.props.linkPath}/${item.id}`}>{item.name}</Link></List.Header>
                    </List.Content>

                    {/*Now add a list of children if not hidden*/}
                    {!hidden &&
                        <List.List>
                            {item.items && item.items.map(subItem => {
                                return this.buildHierarchy(subItem);
                            })
                            }
                        </List.List>
                    }

                </List.Item>
            );
        }else{
            //If this is just a document, see if it included in the search
            if(inSearchResults(item, this.state.searchTerm) && !item.hideListing) {

                // this is just a document
                return (


                        <List.Item key={item.id}>
                            <List.Icon name='file alternate outline'/>
                                <List.Content>
                                    <List.Header as="h3"><Link to={`${this.props.linkPath}/${item.id}`}>{item.name}</Link></List.Header>
                                    <List.Description>{item.preview}</List.Description>
                                </List.Content>
                        </List.Item>


                );
            }else {
                return;
            }
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
                    <Grid.Column floated='right' textAlign='right' >
                        {/*Float the search bar to the right*/}
                        <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                               onChange={v => this.updateSearch(v.currentTarget.value)}/>

                    </Grid.Column>
                </Grid>





                <List>
                    {/*Skip the root level and add in first of the children*/}
                    {this.props.item.items && this.props.item.items.map(subItem => {
                        return this.buildHierarchy(subItem);
                    })
                    }
                </List>
            </div>
        );

    }
}


export default DocumentHierarchy