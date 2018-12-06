import React from 'react';
import {connect} from 'react-redux';
import {clear} from '../actions/alert.actions'
import {Alert} from "../models/Alert";

//Import the state
import ApplicationState from '../state/ApplicationState';

//Define the expected props
interface Props{
    //Define the props we expect
    alerts: Alert[];

    //And the actions that must be done
    clearMessageAction: (alert:Alert) => any;
}


class AlertDisplay extends React.Component<Props>{


    //Define a function to clear this message
    clearMessage(message: Alert){
        //Just pass this into the props to clear
        this.props.clearMessageAction(message);


    }

    //Render the alerts
    render()
    {
        return this.props.alerts.map(alert =>{
            return (
                <div className={`ui floating message ${alert.type}`} key={alert.id}>
                    <i className="close icon" onClick={()=>this.clearMessage(alert)}></i>
                    {alert.message}
                </div>

            );


        });

    }



};

//Get the states
const mapStateToProps = (state: ApplicationState) =>{
    return{ alerts: state.alerts}
}


export default connect(
    mapStateToProps,
    {clearMessageAction: clear}
)(AlertDisplay);