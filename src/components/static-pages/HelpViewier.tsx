import React from 'react';

import {Container, Segment} from "semantic-ui-react";
import ShelterUser from "../../models/ShelterUser";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";
import StaticComponent from "./StaticComponent";

//Define the expected props
interface LinkProps  {
    //See if the user is logged in
    user?: ShelterUser

}



class HelpViewer extends React.Component<LinkProps> {




    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Now set it
        if(this.props.user){
            return (
                <Container>
                    <Segment>
                        <StaticComponent pagePath={"help"} public={false}/>
                    </Segment>
                </Container>
            );

        }else{
            return(
                <Container>
                    <Segment>
                        <StaticComponent pagePath={"help"} public={true}/>
                    </Segment>
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
        user:state.authentication.loggedInUser,
    };
}


export default connect (
    mapStateToProps
)(HelpViewer);
