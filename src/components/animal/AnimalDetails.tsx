import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import CawsAnimal from "../../models/CawsAnimal";
import {Button,Segment, Dimmer, Loader, Container, Header} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {animalActions} from "../../actions/animal.actions";
import AnimalImageGallery from "./details-components/AnimalImageGallery";
import AnimalBio from "./details-components/AnimalBio";
import AnimalVaxxHistory from "./details-components/AnimalVaxxHistory";
import {Link} from "react-router-dom";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    animal: CawsAnimal;
    user:CawsUser;

}


interface DispatchProps{
    //And the actions that must be done
    downloadAnimal: (id:number) => any;

}


/**
 * This card shows the animal details
 */
class AnimalDetails extends React.Component<LinkProps&DispatchProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // reset login status
        this.props.downloadAnimal(this.props.match.params.aniId);
    };

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon
        if(!this.props.animal){
            return (
                <div>
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                    </Segment>
                </div>
            );
        }else {
            //Get the animal details
            return (
                <Container>
                    {/*The simple header*/}
                    <Header as='h1'>{this.props.animal.data.NAME}</Header>

                    {/*The animal gallery*/}
                    <AnimalImageGallery animal={this.props.animal} />

                    {/*The animal Bio*/}
                    <Segment>
                        <Header as="h2">Biography</Header>
                        <AnimalBio animal={this.props.animal}/>
                        <Link className={"ui button"} to={`/kennelcard?id=${this.props.animal.data.ID}`}> Preview {this.props.animal.data.NAME}'s Kennel Card  </Link>
                    </Segment>
                    {/*The vaccine history*/}
                    <AnimalVaxxHistory animal={this.props.animal}/>
                </Container>
            );

        }
    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        animal: state.animals.animals[myProps.match.params.aniId] ,
        user:state.authentication.loggedInUser || getEmptyCawsUser(),
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:LinkProps):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AnimalDetails);
