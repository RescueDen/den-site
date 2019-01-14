import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";

import CawsAnimal from "../../models/CawsAnimal";
import {Card, Image, Icon, Placeholder} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {Link} from "react-router-dom";

//Define the expected props
interface IncomingProps{
    ani: CawsAnimal;
    link:string;
    showBio:boolean;
}

//Define the expected props
interface LinkProps{
    //Define the props we expect
    user:CawsUser;

}





/**
 * This card shows the animal details
 */
class AnimalCard extends React.Component<IncomingProps&LinkProps> {


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //If undefined
        if(!this.props.ani){
            return (
                <Card >
                    <Placeholder>
                        <Placeholder.Image square />
                    </Placeholder>


                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='very short'/>
                                <Placeholder.Line length='medium'/>
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='short'/>
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
                    <Card key={this.props.ani.data.ID}>
                        <Link to={`${this.props.link}/${this.props.ani.data.ID}`}>
                            <Image src={this.props.ani.getImageUrl()}/>
                        </Link>
                        <Card.Content>
                            <Card.Header>{this.props.ani.data.NAME}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{this.props.ani.getMyHistory(this.props.user.data.asmid)}</span>
                            </Card.Meta>
                            {this.props.showBio &&
                                <Card.Description>{this.props.ani.data.BIO}</Card.Description>
                            }
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                {this.props.ani.getCurrentStatus()}
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
        user:state.authentication.loggedInUser || getEmptyCawsUser(),
    };
}

// function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):DispatchProps {
//     return {
//         downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
//     };
//
// }

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
)(AnimalCard);
