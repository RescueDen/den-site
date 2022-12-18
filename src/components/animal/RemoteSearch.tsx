import React from 'react'

import {
    Checkbox,
    Comment,
    Dropdown,
    DropdownItemProps,
    DropdownOnSearchChangeData,
    DropdownProps,
    Icon,
    Popup
} from "semantic-ui-react";
import ShelterAnimal from "../../models/ShelterAnimal";
import {animalService} from "../../services/animal.service";


//Define the expected props
interface IncomingProps {
    //And the actions that must be done
    selectAnimal: (id: number) => any;
}


//Define the expected props
interface SearchState {
    //Define the props we expect
    isLoading: boolean;
    results: any;
    searchTerm: string;
    onShelter: boolean;
    error?: string;
}

//Set the minimum
const minChar = 3;
const bioMax = 100;


/**
 * This card shows the animal details
 */
class RemoteSearch extends React.Component<IncomingProps, SearchState> {
    state = {isLoading: false, results: [] as ShelterAnimal[], searchTerm: "", error: undefined, onShelter: true};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        //Make sure we reset
        this.resetComponent();
    };

    /*
     reset the search state
     */
    resetComponent = () => this.setState({
        isLoading: false,
        results: [] as ShelterAnimal[],
        searchTerm: '',
        onShelter: this.state.onShelter
    })
    toggleOnShelter = () => {
        //Now perform the search
        this.performSearch(this.state.searchTerm, !this.state.onShelter);
    }


    handleSearchChange = (event: any, {searchQuery}: DropdownOnSearchChangeData) => {
        //If this value is defined
        if (searchQuery !== undefined) {
            this.performSearch(searchQuery, this.state.onShelter);
        }
    }

    performSearch = (searchQuery: string, onShelter: boolean) => {
        //If the length is below
        if (searchQuery.length < minChar) {
            //Set the fact that we are loading
            this.setState({searchTerm: searchQuery, onShelter: onShelter});
            return;

        }

        //Set the fact that we are loading
        this.setState({isLoading: true, searchTerm: searchQuery, onShelter: onShelter})

        //Now search
        animalService.searchForAnimal(searchQuery, onShelter).then((anList: ShelterAnimal[]) => {

            const resultList = anList.map((ani: ShelterAnimal) => {
                return {
                    text: ani.data.name + " : " + ani.data.code,
                    value: ani.data.id,
                    content:
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar as='a' src={ani.data.thumbnailUrl}/>
                                <Comment.Content>
                                    <Comment.Author>{ani.data.name}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{ani.data.code}</div>
                                        <Icon name='paw'/>
                                        <div>{ani.data.age}</div>
                                        <Icon name='paw'/>
                                        <div>{ani.data.breed}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        {ani.getBio(bioMax)}
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>,
                } as DropdownItemProps;

            })
            this.setState({results: resultList, error: undefined, isLoading: false})
        }).catch(() => {
            this.setState({error: "Could not search for " + searchQuery + ". Please try another term."});
        })
    }

    handleResultSelect = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        //If this value is defined
        if (data.value !== undefined) {
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
                            <Checkbox disabled={true} label={"search all animals (adopted and on shelter)"}
                                      checked={!this.state.onShelter}/>

                        </div>}

                    />

                }
                content={this.state.error}
                open={this.state.error !== undefined}
                position='right center'
            />

        );
    }
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default RemoteSearch;