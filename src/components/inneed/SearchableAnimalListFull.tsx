import React from 'react'
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {Header, Input, List, Placeholder, Item, Button, Dropdown, Form, Modal} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import {Link} from "react-router-dom";
import AnimalItemFull from "./AnimalItemFull";
import CawsUser from "../../models/CawsUser";
import CawsAnimal, {Species} from "../../models/CawsAnimal";
import {inSearch, inSpecies, NonShelterAnimal} from "../../models/InNeedOfFosterModel";
import NonCawsAnimalItemFull from "./NonCawsAnimalItemFull";
import AddInNeed from "./AddInNeed";
import {inNeedActions} from "../../actions/inNeedFoster.actions";
import PermissionBlock from "../authentication/PermissionBlock";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    animalIdList: number[]
    title:string
    link:string
    nonCaws:NonShelterAnimal[]


}

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    cawsAnimalsDb: AnimalState
    user?: CawsUser
    busy:boolean;
}


interface DispatchProps{
    //And the actions that must be done
    downloadAnimal: (id:number) => any;
    removeAnimal: (id:string) =>any;
    // addGeometry:(name:string) =>any;
    uploadAnimal:(data: NonShelterAnimal, file: File) => any;
}

//Define the expected props
interface SearchState  {
    //Define the props we expect
    searchTerm: string
    searchSpecies: Species[]
    //Add a control to open/close modal
    addNewModalOpen:boolean

    //Keep a boolean for busy
    busy:boolean
}

const searchOptions =[
    {
        key:"Cat",
        value:Species.cat,
        text:"Cats"
    },
    {
        key:"Dog",
        value:Species.dog,
        text:"Dogs"
    }
]

/**
 * This card shows the animal details
 */
class SearchableAnimalListFull extends React.Component<IncomingProps&DispatchProps&LinkProps, SearchState> {
    state={searchTerm:"", searchSpecies:[Species.cat, Species.dog] as Species[], addNewModalOpen:false, busy:false};

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

    //Build the link to button
    buildFosterButton(ani:CawsAnimal): any | undefined{
        //If this foster needs a button
        if(ani.needsFoster()){
            //Build the name
            let name = "Someone ";
            if(this.props.user){
                name = this.props.user.data.firstname + " " + this.props.user.data.lastname;
            }


            //build the mail to
            let href = "mailto:" + ani.data.SPECIES + "s@caws.org";
            href+= "?subject=" + name + " would like to foster " + ani.getCodeAndName();
            href+= "&body="+ name + " would like to foster " + ani.getCodeAndName();

            return (
                <a href={href}>
                    <Button  >
                        Click to Foster
                    </Button>
                </a>
            );

        }

    }
    buildNonCawsFosterButton(ani:NonShelterAnimal): any {
        //If this foster needs a button
            //Build the name
        let name = "Someone ";
        if(this.props.user){
            name = this.props.user.data.firstname + " " + this.props.user.data.lastname;
        }


        //build the mail to
        let href = "mailto:" + ani.species + "s@caws.org";
        href+= "?subject=" + name + " would like to foster " + ani.id + ":" + ani.name;
        href+= "&body="+ name + " would like to foster " + ani.id + ":" + ani.name;

        return (
            <>
                <a href={href}>
                    <Button  >
                        Click to Foster
                    </Button>
                </a>
                <PermissionBlock reqPerm={"post_in_need"}>
                    <Button
                        disabled={this.props.busy}
                        onClick={() => this.props.removeAnimal(ani.id)}
                        negative={true}
                    >
                        Remove from List

                    </Button>
                </PermissionBlock>
            </>
        );



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
                return <AnimalItemFull key={id} ani={ani} link={this.props.link} />;
            } else if (ani.inSearch(this.state.searchTerm) && ani.isSpecies(this.state.searchSpecies) ) {
                //It is in the search term
                return <AnimalItemFull key={id} ani={ani} link={this.props.link} extraButton={this.buildFosterButton(ani)}/>;
            } else {
                return null;
            }
        });

    }

    /**
     * Get the items
     */
    getNonCawsItems(){
        //If we have items
        return this.props.nonCaws.map(ani => {

            //If the ani is undefined just return the aniItem
            if (ani != undefined && (inSearch(ani, this.state.searchTerm) && inSpecies(ani, this.state.searchSpecies))) {
                //It is in the search term
                return <NonCawsAnimalItemFull key={ani.id} ani={ani}  extraButton={this.buildNonCawsFosterButton(ani)}/>;
            } else {
                return null;
            }
        });

    }

    uploadNewAni = (data: NonShelterAnimal, file: File) => {
        this.props.uploadAnimal(data, file);

        //Also close the upload
        this.setState({addNewModalOpen:false})
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
                        <Form>
                            <Form.Group widths='equal'>
                                <Input icon='search' placeholder='Search...' value={this.state.searchTerm}
                                       onChange={v => this.updateSearch(v.currentTarget.value)}/>
                                <Dropdown value={this.state.searchSpecies} placeholder='Select Species'
                                          multiple  selection options={searchOptions}
                                          onChange={(info,props) => {this.setState({searchSpecies: (props.value as Species[])})}}

                                />
                                <PermissionBlock reqPerm={"post_in_need"}>
                                    <Modal
                                        trigger={<Button icon='upload' onClick={() => this.setState({addNewModalOpen:true})}></Button>}
                                        open={this.state.addNewModalOpen}
                                        onClose={() => this.setState({addNewModalOpen:false})}
                                    >
                                        <Modal.Content>
                                            <AddInNeed uploadAnimal={this.uploadNewAni}/>
                                        </Modal.Content>

                                    </Modal>
                                </PermissionBlock>

                            </Form.Group>
                        </Form>


                    </div>
                </div>


                {/*//Create a list*/}
                <Item.Group divided>
                    {/*If there are props*/}
                    {this.getItems()}
                    {this.getNonCawsItems()}

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
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id)),
        uploadAnimal:(data: NonShelterAnimal, file: File) => dispatch(inNeedActions.uploadAnimal(data, file)),
        removeAnimal:(id:string) =>   dispatch(inNeedActions.removeAnimal(id))

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
        user:state.authentication.loggedInUser,
        busy:state.inNeedFoster.busy
    };
}




//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchableAnimalListFull);

