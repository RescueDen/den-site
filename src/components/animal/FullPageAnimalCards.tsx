import React from 'react'
import {connect} from "react-redux";
import {getEmptyCawsUser} from "../../models/CawsUser";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import AnimalCard from "../animal/AnimalCard";
import {Button, Card, Checkbox, CheckboxProps, Header, Input} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import AnimalItemFull from "./AnimalItemFull";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    animalIdList: number[]
    cawsAnimalsDb: AnimalState
    title:string

}


interface DispatchProps{
    //And the actions that must be done
    downloadAnimal: (id:number) => any;

}

//Define the expected props
interface SearchState  {
    //Define the props we expect
    searchTerm: string
    showBios:boolean;

}


/**
 * This card shows the animal details
 */
class SearchableAnimalCards extends React.Component<IncomingProps&DispatchProps, SearchState> {
    state={searchTerm:"", showBios:true};

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // reset login status
        this.props.animalIdList.forEach(aniId => this.props.downloadAnimal(aniId));
    };

    /**
     * Function to update search
     */
    updateSearch(term:string){
        this.setState({searchTerm:term});
    }

    /**
     * Get the items
     */
    getItems(){
        //If we have items
        return this.props.animalIdList.map(id => {
            //Convert to an ani
            const ani = this.props.cawsAnimalsDb.animals[id];

            //If the ani is undefined just return the aniItem
            if (ani === undefined) {
                return <AnimalCard key={id} ani={ani} link="/animal" showBio={this.state.showBios}/>;
            } else if (ani.inSearch(this.state.searchTerm)) {
                //It is in the search term
                return <AnimalCard key={id} ani={ani} link="/animal" showBio={this.state.showBios}/>;
            } else {
                return null;
            }
        });

    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Get the hid/show text
        const hideShowText = this.state.showBios? "Hide Bios" : "Show Bios";

        return (
            <div>
                <div className="ui stackable grid">
                    <div className="left floated left aligned six wide column">
                        {/*The headers*/}
                        <Header as='h1'>{this.props.title} ({this.props.animalIdList.length})</Header>
                    </div>
                    <div className="right floated right aligned six wide column">

                        <Button toggle active={this.state.showBios} onClick={() =>this.setState({showBios: !this.state.showBios})}>
                            {hideShowText}
                        </Button>
                        <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                               onChange={v => this.updateSearch(v.currentTarget.value)}/>
                    </div>
                </div>


                <Card.Group centered>
                    {this.getItems()}
                </Card.Group>
            </div>
        )
    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToPropsCurrentFosters(state:ApplicationState): IncomingProps {
    //Get the human
    const cawsUser = state.authentication.loggedInUser|| getEmptyCawsUser();

    return {
        animalIdList: cawsUser.data.currentFosters,
        cawsAnimalsDb:state.animals,
        title:"Current Fosters"
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export const CurrentFostersFullPage =  connect(
    mapStateToPropsCurrentFosters,
    mapDispatchToProps
)(SearchableAnimalCards);
/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToPropsPastFosters(state:ApplicationState): IncomingProps {
    //Get the human
    const cawsUser = state.authentication.loggedInUser|| getEmptyCawsUser();

    return {
        animalIdList: cawsUser.data.pastFosters,
        cawsAnimalsDb:state.animals,
        title:"Past Fosters"

    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export const PastFostersFullPage =  connect(
    mapStateToPropsPastFosters,
    mapDispatchToProps
)(SearchableAnimalCards);
