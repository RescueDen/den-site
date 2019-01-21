import React from 'react';

import {Image, Dimmer, Input, List, Loader, Segment, Container} from "semantic-ui-react";
import {ArticleItemData} from "../../models/ArticlesSummary";
import {infoService} from "../../services/info.service"
import CawsUser from "../../models/CawsUser";
import {helpService} from "../../services/help.service";
import ApplicationState from "../../state/ApplicationState";
import {connect} from "react-redux";

//Define the expected props
interface LinkProps  {
    //See if the user is logged in
    user?: CawsUser

}

//Keep a state of open documents
interface MyState{
    html: string;


}


class HelpViewer extends React.Component<LinkProps, MyState> {
    state = {html:""};

    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //If the user is logged in get the logged in
        let help :Promise<string>;

        //Now set it
        if(this.props.user){
            help = helpService.getPrivateHelp();
        }else{
            help = helpService.getPublicHelp();
        }

        //When it comes back use it
        help.then(
            //If successful html will be returned
            article => {
                //Update the state
                this.setState({html:article})
            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({html:errorResponse.response.data.message});
                }catch(e){
                    this.setState({html:errorResponse.toString()});

                }

            }

        );
    };



    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If there is no html mark as loading
        if(this.state.html.length == 0){
            return(
                <Container>
                    <Segment >
                        <Dimmer inverted active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                </Container>
            );
        }else {
            //Return the html
            return (
                <Container>
                    <div dangerouslySetInnerHTML={{__html:this.state.html}}/>
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
