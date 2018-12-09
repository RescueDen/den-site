import React from 'react'
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import { Header, Input, List, Placeholder, Item} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import {Link} from "react-router-dom";
import AnimalItemFull from "./AnimalItemFull";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    animalIdList: number[]
    title:string
    link:string

}

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    cawsAnimalsDb: AnimalState

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
class SearchableAnimalListFull extends React.Component<IncomingProps&DispatchProps&LinkProps, SearchState> {
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
     * Get the items
     */
    getItems(){
        //If we have items
        return this.props.animalIdList.map(id => {
            //Convert to an ani
            const ani = this.props.cawsAnimalsDb.animals[id];

            //If the ani is undefined just return the aniItem
            if (ani === undefined) {
                return <AnimalItemFull key={id} ani={ani} link={this.props.link}/>;
            } else if (ani.inSearch(this.state.searchTerm)) {
                //It is in the search term
                return <AnimalItemFull key={id} ani={ani} link={this.props.link}/>;
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
        return (
            <div>
                <div className="ui stackable grid">
                    <div className="left floated left aligned six wide column">
                        {/*The headers*/}
                        {/*If there is no link, just give the header*/}
                        {this.props.link &&
                            <Link to={this.props.link}>
                                <Header as='h1'>{this.props.title}</Header>
                            </Link>
                        }
                        {/*else*/}
                        {!this.props.link &&
                            <Header as='h1'>{this.props.title}</Header>
                        }
                    </div>
                    <div className="right floated right aligned six wide column">

                        <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                               onChange={v => this.updateSearch(v.currentTarget.value)}/>

                    </div>
                </div>


                {/*//Create a list*/}
                <Item.Group divided>
                    {/*If there are props*/}
                    {this.getItems()}

                </Item.Group>
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
function mapStateToProps(state:ApplicationState): LinkProps {

    return {
        cawsAnimalsDb:state.animals,
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchableAnimalListFull);

