import React from 'react'

import AnimalState from "../../state/AnimalState";
import {
    Dropdown, DropdownItemProps, DropdownOnSearchChangeData, DropdownProps, Comment, Icon
} from "semantic-ui-react";
import CawsAnimal from "../../models/CawsAnimal";
import {animalService} from "../../services/animal.service";


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
}

//Set the minimum
const minChar = 3;
const bioMax = 100;




/**
 * This card shows the animal details
 */
class RemoteSearch extends React.Component<IncomingProps, SearchState> {
    state={isLoading:false, results: [] as CawsAnimal[], searchTerm:"" };

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
    resetComponent = () => this.setState({ isLoading: false, results: [] as CawsAnimal[], searchTerm: '' })


    /**
     * Function to update search
     */
    updateSearch(term:string){
        this.setState({searchTerm:term});
    }

    handleSearchChange = (event: any, {searchQuery}: DropdownOnSearchChangeData) => {

        //If this value is defined
        if (searchQuery != undefined) {

            //If the length is below
            if(searchQuery.length < minChar ){
                //Set the fact that we are loading
                this.setState({searchTerm: searchQuery});
                return;

            }

            //Set the fact that we are loading
            this.setState({isLoading: true, searchTerm: searchQuery})

            //Now search
            animalService.searchForAnimal(searchQuery).then((anList:CawsAnimal[]) => {

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

                this.setState({results:resultList})


            }).catch((err:any)=>{
                alert("error here for no reason: " + err);
            })


        }
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
            />
        );
    }
};





//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default RemoteSearch;