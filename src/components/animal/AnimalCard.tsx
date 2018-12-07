import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import CawsAnimal from "../../models/CawsAnimal";
import {animalActions} from "../../actions/animal.actions";
import {ThunkDispatch} from "redux-thunk";
import {Card, Image, Icon, Placeholder} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";

//Define the expected props
interface IncomingProps{
    animalId: number;

}

//Define the expected props
interface LinkProps{
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
class AnimalCard extends React.Component<IncomingProps&LinkProps&DispatchProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // reset login status
        this.props.downloadAnimal(this.props.animalId)

    };

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined
        if(!this.props.animal){
            return (
                <Card key={this.props.animalId}>
                    <Placeholder>
                        <Placeholder.Image square />
                    </Placeholder>

                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='very short' />
                                <Placeholder.Line length='medium' />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Card.Content>

                    <Card.Content extra>
                        <Placeholder.Line length='short' />
                    </Card.Content>
                </Card>
            );
        }else {

            return (
                <Card  key={this.props.animalId}>
                    <Image src={this.props.animal.getImageUrl()}/>
                    <Card.Content>
                        <Card.Header>{this.props.animal.data.NAME}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.props.animal.getMyHistory(this.props.user.data.asmid)}</span>
                        </Card.Meta>
                        <Card.Description>{this.props.animal.data.BIO}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            {this.props.animal.getCurrentStatus()}
                        </a>
                    </Card.Content>
                </Card>
            );
        }

    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:IncomingProps ):LinkProps {
    return {
        animal: state.animals.animals[myProps.animalId],
        user:state.authentication.loggedInUser || getEmptyCawsUser(),
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AnimalCard);
