import React from 'react'
import {connect} from "react-redux";
import {getEmptyCawsUser} from "../../models/CawsUser";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import AnimalCard from "../animal/AnimalCard";
import {Card, Header, Input} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";

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


}


/**
 * This card shows the animal details
 */
class SearchableAnimalCards extends React.Component<IncomingProps&DispatchProps, SearchState> {
    state={searchTerm:""};

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
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <div>
                <div className="ui stackable grid">
                    <div className="left floated left aligned six wide column">
                        {/*The headers*/}
                        <Header as='h1'>{this.props.title}</Header>
                    </div>
                    <div className="right floated right aligned six wide column">

                        <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                               onChange={v => this.updateSearch(v.currentTarget.value)}/>

                    </div>
                </div>


                <Card.Group>
                    {//Step over each animal id
                        this.props.animalIdList.map(id => {
                            //Map into a caws animal
                            return this.props.cawsAnimalsDb.animals[id];
                        }).filter(ani =>{
                            //Filter on the search term
                            return !ani || this.state.searchTerm.length == 0 || ani.inSearch(this.state.searchTerm);

                        }).map(ani=>{
                            //Turn into a card. If it is undefined
                            return <AnimalCard  animal={ani}/>

                        })
                    }
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
