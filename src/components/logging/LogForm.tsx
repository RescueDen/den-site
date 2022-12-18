import React from 'react';
import {CategoryInfo, LogData} from "../../models/Logging";
import {Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {loggingActions} from "../../actions/logging.actions";

//Define the expected props
interface Props {
    catInfo: CategoryInfo
    busy?: boolean
}

//Define the expected props
interface State {
    newLog: LogData;

}


interface DispatchProps {
    //And the actions that must be done
    addLog: (log: LogData) => any;

}


//Store the month ab
/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class LogForm extends React.Component<Props & DispatchProps, State> {
    state = {newLog: {type: 1, date: new Date(), category: this.props.catInfo.name} as LogData}

    render(): React.ReactNode {
        //get the untis
        const units = this.props.catInfo.unit.charAt(0).toUpperCase() + this.props.catInfo.unit.slice(1);
        return (
            <Form onSubmit={() => this.props.addLog(this.state.newLog)}>
                <Form.Group widths='equal'>
                    <Form.Select
                        options={Object.keys(this.props.catInfo.types).map(typ => {
                            return {
                                key: typ,
                                text: this.props.catInfo.types[typ].name,
                                value: this.props.catInfo.types[typ].id
                            }
                        })}
                        value={this.state.newLog.type}
                        onChange={(event: any, data: any) => this.setState({
                            newLog: {
                                ...this.state.newLog,
                                type: parseInt(data.value)
                            }
                        })}
                        fluid type='number' label='Type'/>


                    <Form.Input fluid
                                type='number'
                                label={units}
                                min={.1}
                                max={this.props.catInfo.maximum}
                                step={0.01}
                                value={this.state.newLog.value}
                                onChange={
                                    (event: any, data: any) => {
                                        //Get the value
                                        let value = parseFloat(data.value);
                                        if (this.props.catInfo.maximum) {
                                            value = Math.min(value, this.props.catInfo.maximum)
                                        }

                                        this.setState({
                                            newLog: {
                                                ...this.state.newLog, value: value

                                            }
                                        })
                                    }
                                }
                    />
                    <Form.Field fluid label='Date' control={DatePicker}
                                selected={this.state.newLog.date}
                                onChange={(date: any) => this.setState({newLog: {...this.state.newLog, date: date}})}
                    />

                </Form.Group>
                <Form.TextArea
                    label='Comments'
                    placeholder='Tell us more about this...'
                    value={this.state.newLog.comments}
                    onChange={(event: any, data: any) => this.setState({
                        newLog: {
                            ...this.state.newLog,
                            comments: data.value
                        }
                    })}

                />

                <Form.Button loading={this.props.busy} disabled={this.props.busy}>Add {units}</Form.Button>
            </Form>
        );


    }

}

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: Props): Props {
    return {
        ...myProps,
        busy: state.logging.awaitingUpdate
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        addLog: (log: LogData) => dispatch(loggingActions.addLog(log))
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogForm);


