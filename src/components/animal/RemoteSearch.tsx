import React from 'react'

import AnimalState from "../../state/AnimalState";
import {
    Dropdown, DropdownItemProps, DropdownOnSearchChangeData, DropdownProps, Comment, Icon, Popup, Checkbox
} from "semantic-ui-react";
import CawsAnimal from "../../models/CawsAnimal";
import {animalService} from "../../services/animal.service";
import {on} from "cluster";


//Define the expected props
interface IncomingProps  {
    //And the actions that must be done
    selectAnimal: (id:number) => any;
}



//Define the expected props
interface SearchState  {
    //Define the props we expect
    isLoading: boolean;
    results: any;
    searchTerm:string;
    onShelter:boolean;
    error?:string;
}

//Set the minimum
const minChar = 3;
const bioMax = 100;




/**
 * This card shows the animal details
 */
class RemoteSearch extends React.Component<IncomingProps, SearchState> {
    state={isLoading:false, results: [] as CawsAnimal[], searchTerm:"" , error:undefined, onShelter:true};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        //Make sure we reset
        this.resetComponent();


    };

    /*
     reset the search state
     */
    resetComponent = () => this.setState({ isLoading: false, results: [] as CawsAnimal[], searchTerm: '' , onShelter:this.state.onShelter})


    /**
     * Function to update search
     */
    updateSearch(term:string){
        this.setState({searchTerm:term});
    }

    toggleOnShelter = () => {
        //Now perform the search
        this.performSearch(this.state.searchTerm, !this.state.onShelter);
    }


    handleSearchChange = (event: any, {searchQuery}: DropdownOnSearchChangeData) => {

        //If this value is defined
        if (searchQuery != undefined) {
            this.performSearch(searchQuery, this.state.onShelter);



        }
    }

    performSearch = (searchQuery :string, onShelter:boolean) =>{
        //If the length is below
        if(searchQuery.length < minChar ){
            //Set the fact that we are loading
            this.setState({searchTerm: searchQuery, onShelter:onShelter});
            return;

        }

        //Set the fact that we are loading
        this.setState({isLoading: true, searchTerm: searchQuery, onShelter:onShelter})

        //Now search
        animalService.searchForAnimal(searchQuery, onShelter).then((anList:CawsAnimal[]) => {

            const resultList = anList.map((ani:CawsAnimal) =>{
                return {
                    text:ani.data.NAME + " : " + ani.data.SHELTERCODE,
                    value:ani.data.ID,
                    content:
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar as='a' src={ani.data.THUMBNAILURL} />
                                <Comment.Content>
                                    <Comment.Author>{ani.data.NAME}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{ani.data.SHELTERCODE}</div>
                                        <Icon name='paw' />
                                        <div>{ani.data.AGE}</div>
                                        <Icon name='paw' />
                                        <div>{ani.data.BREED}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        {ani.getBio(bioMax)}
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>,
                } as DropdownItemProps;

            })

            this.setState({results:resultList, error:undefined, isLoading:false})


        }).catch((err:any)=>{
            this.setState({error:"Could not search for " + searchQuery + ". Please try another term."});
        })
    }

    handleResultSelect = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        //If this value is defined
        if(data.value != undefined) {
            this.props.selectAnimal(+data.value);
        }
        this.resetComponent();

    }



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <Popup
                trigger={
                    <Dropdown
                        fluid
                        selection
                        search
                        options={this.state.results}
                        value={this.state.searchTerm}
                        placeholder='Add Animals'
                        onChange={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        loading={this.state.isLoading}
                        minCharacters={minChar}
                        header={<div onClick={this.toggleOnShelter}
                        >
                            <Checkbox disabled={true} label={"search all animals (adopted and on shelter)"} checked={!this.state.onShelter}  />

                        </div>}

                    />

                }
                content={this.state.error}
                open={this.state.error != undefined}
                position='right center'
            />

        );
    }
};





//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default RemoteSearch;