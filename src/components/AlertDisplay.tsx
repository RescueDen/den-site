import React from 'react';
import {connect} from 'react-redux';
import {clear} from '../actions/alert.actions'
import {Alert, AlertType} from "../models/Alert";
//Import the state
import ApplicationState from '../state/ApplicationState';
import {Container, Label, Message} from "semantic-ui-react";

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
    render(){
        return(
            <div style={{
                position:"absolute",
                top:"40px",
                width:"100%",
                zIndex: 10000
            }}>

                {this.props.alerts.map(alert => {
                    //get the header string
                    const header = alert.getHeader();

                    return (
                        <Container text>
                            <Message
                                floating
                                onDismiss={() => this.clearMessage(alert)}
                                key={alert.id}
                                success={alert.type == AlertType.POSITIVE}
                                negative={alert.type == AlertType.NEGATIVE}
                            >
                                {/*Add a header if specified*/}
                                {header &&
                                    <Message.Header>{header}</Message.Header>
                                }

                                {/*Add the main message content*/}
                                <div dangerouslySetInnerHTML={{ __html: alert.getMessage() }} />

                                {/*Add a count */}
                                {alert.getCount() > 1 &&
                                <Label floating>
                                    x{alert.getCount()}
                                </Label>
                                }
                            </Message>
                        </Container>
                    );
                })
                }
            </div>

        )

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