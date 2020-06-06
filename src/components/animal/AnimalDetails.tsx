import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import CawsAnimal, {Species} from "../../models/ShelterAnimal";
import {Button, Segment, Dimmer, Loader, Container, Header, Icon} from "semantic-ui-react";
import ShelterUser, {getEmptyCawsUser} from "../../models/ShelterUser";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {animalActions} from "../../actions/animal.actions";
import AnimalImageGallery from "./details-components/AnimalImageGallery";
import AnimalBio from "./details-components/AnimalBio";
import AnimalVaxxHistory from "./details-components/AnimalVaxxHistory";
import {Link} from "react-router-dom";
import PermissionBlock from "../authentication/PermissionBlock";
import AnimalJournal from "./AnimalJournal";
import UploadPicture from "./details-components/UploadPicture";
import Permissions from "../../models/Permissions";



//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    animal: CawsAnimal;
    user:ShelterUser;
    permissions?:Permissions

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
                    <Header as='h1'>{this.props.animal.data.name}</Header>

                    {/*The animal gallery*/}
                    <div style={
                        {
                            margin: "auto",
                            maxWidth: "60vh"
                        }
                    }>
                        <AnimalImageGallery
                            key={this.props.animal.data.imgUrls.length}
                            animal={this.props.animal}
                            additionalItem={
                                this.props.permissions && this.props.permissions.allowed("post_animal_picture") ?
                                    {
                                        renderItem: () => {
                                            return (
                                                <Segment>
                                                    <Header as="h3" textAlign="center">Upload photos
                                                        of {this.props.animal.data.name} to share</Header>
                                                    <UploadPicture ani={this.props.animal}/>
                                                </Segment>
                                            )
                                        },
                                        renderThumbInner: () => <Icon circular name='upload' size='big'/>
                                    }
                                    : undefined
                            }

                        />
                    </div>
                    {/*The animal Bio*/}
                    <Segment>
                        <Header as="h2">Biography</Header>
                        <AnimalBio animal={this.props.animal}/>
                        <Link className={"ui button"} to={`/kennelcard?id=${this.props.animal.data.id}`}> Preview {this.props.animal.data.name.trim()}'s Kennel Card  </Link>
                    </Segment>
                    {/*The vaccine history*/}
                    <AnimalVaxxHistory animal={this.props.animal}/>
                    {/* If the user can view the journal   */}
                    {this.props.animal.isSpecies([Species.dog]) &&
                    <p>To update the dog's bio or pictures please use this <Link to="/forms/1LID8RWvBMux4FzXNzI7Yq9560Cf5ptFo">form</Link>.</p>
                        }
                    <PermissionBlock reqPerm="view_public_journal">
                        <AnimalJournal ani={this.props.animal} />
                    </PermissionBlock>

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
        permissions : state.authentication.permissions
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
