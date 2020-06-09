import React from 'react';

import {SettingGroup, UserPreferences} from "../../models/UserPreferences";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {AuthenticationStatus} from "../../state/AuthenticationState";
import {Button, List, Modal} from "semantic-ui-react";


interface IncomeProps  {

}


//Define the expected props
interface LinkProps  {
    //Define the props we expect
    prefs?:UserPreferences;
    loading:boolean;
}


interface DispatchProps{
    //And the actions that must be done
    updateMyInfo: () => any;
    updatePreferences: (settings:SettingGroup) => any
}


interface MyState{

}



/**
 * This page shows the person details
 */
class AgreementPopUp extends React.Component<LinkProps&DispatchProps,MyState> {
    //Update the user if there are any changes
    componentDidMount(){
        this.props.updateMyInfo()
    }


    //Add a button to submit case
    aggreeToSettings = () =>{

        //Check to see if we have the setting
        if(this.props.prefs){
            const settings = this.props.prefs.settings;

            //Update them
            settings.settings["siteAgreement"] = "true";

            //Now push the agreement up to the server
            this.props.updatePreferences(settings);

        }


    };



    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        //See if it has already been set
        if (this.props.prefs){
            //Check to see if we have the setting
            const alreadyAggree = this.props.prefs.settings.settings["siteAgreement"]



            if(alreadyAggree && !JSON.parse(alreadyAggree)){
               return (
                   <Modal
                       open={true}
                       closeOnEscape={false}
                       closeOnDimmerClick={false}
                   >
                       <Modal.Header>RescueDen Agreement</Modal.Header>
                       <Modal.Content>
                           <p>
                               Welcome to the RescueDen Den.  The RescueDen will serve as your central location for all things CAWS.  In addition to the CAWS Privacy Policy (caws.org/privacy) and RescueDen Privacy Policy(rescueden.org/privacy) you also acknowledge that:
                               <List>
                                   <List.Item >
                                       <List.Icon name='check circle' />
                                       <List.Content>
                                         Other volunteers may see your personally identifiable information including:
                                           <List>
                                               <List.Item>
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                       First name
                                                   </List.Content>

                                               </List.Item>
                                               <List.Item >
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                        Last Initial
                                                   </List.Content>

                                               </List.Item>
                                               <List.Item >
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                        Achievement History
                                                   </List.Content>

                                               </List.Item>
                                               <List.Item>
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                        Foster History
                                                   </List.Content>
                                               </List.Item>
                                           </List>
                                       </List.Content>

                                   </List.Item>
                                   <List.Item >
                                       <List.Icon name='check circle' />
                                       <List.Content>
                                           That you may receive emails and notifications from the RescueDen including:
                                           <List>
                                               <List.Item>
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                    Upcoming news, updates, and events
                                                   </List.Content>

                                               </List.Item>
                                               <List.Item>
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                    In-need of foster email
                                                   </List.Content>
                                               </List.Item>
                                               <List.Item>
                                                   <List.Icon name='check circle' />
                                                   <List.Content>
                                                    Other material from the team
                                                   </List.Content>
                                               </List.Item>
                                           </List>
                                       </List.Content>

                                   </List.Item>
                               </List>

                           </p>
                       </Modal.Content>
                       <Modal.Actions>
                           <Button
                               onClick={this.aggreeToSettings}
                               positive
                               labelPosition='right'
                               icon='checkmark'
                               content='Agree'
                               loading ={this.props.loading}
                           />
                       </Modal.Actions>
                   </Modal>
               );
            }


        }

        return null;




    }
}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:IncomeProps ):LinkProps&IncomeProps {
    return {
        ...myProps,
        prefs:state.authentication.preferences,
        loading:state.authentication.prefStatus? state.authentication.prefStatus == AuthenticationStatus.ATTEMPT : false
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser()),
        updatePreferences: (settings:SettingGroup) => dispatch(userActions.setUserPreferences(settings))

    };

}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AgreementPopUp);
