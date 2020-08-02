import React from 'react';
import {Colony} from "../../models/Colony";
import {Button, Form, Icon, Input, InputProps, Modal} from "semantic-ui-react";
import {Address, ValidateAddress} from "../../models/Address";
import AddressForm from "./AddressForm";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {colonyActions} from "../../actions/colony.actions";

interface IncomingProps{
    incomingColony:Colony;

    //Pass in the trigger
    trigger?:React.ReactNode;
}

export interface State{
    colony: Colony;
    modalOpen:boolean;
}

export interface DispatchProps {
    saveColony:(colony:Colony) => any;
}

class ColonyEdit extends React.Component<IncomingProps&DispatchProps, State>{
    state = {colony:this.props.incomingColony, modalOpen:false};

    updateColony = (newParams:any) =>{
        this.setState({colony:{...this.state.colony, ...newParams}});
    }

    updateAddress = (newParams:Address) =>{
        this.setState({colony:{...this.state.colony, address:newParams}});
    }

    handleSaveAndClose = () => {
        this.props.saveColony(this.state.colony);

        //And close this
        this.setState({modalOpen: false})
    }

    handleCancel = () => this.setState({ modalOpen: false })

    handleOpen = () => this.setState({ modalOpen: true })

    render() {

        return (
            <Modal
                trigger={<span onClick={this.handleOpen}>{this.props.trigger}</span>}
                open={this.state.modalOpen}
                onClose={this.handleCancel}
                size='small'
            >
                <Modal.Content>
                    <Form>
                        <Form.Field
                            control={Input}
                            label='Colony Name'
                            placeholder='colony name'
                            value={this.state.colony.name}
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) =>
                                {
                                    const value = data.value ?? '';
                                    this.updateColony({name: value});
                                }
                            }
                        />
                        <Form.Field
                            control={Input}
                            label='Group'
                            placeholder='group'
                            value={this.state.colony.group}
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) =>
                                {
                                    const value = data.value ?? '';
                                    this.updateColony({group: value});
                                }
                            }
                        />
                        <AddressForm
                            address={this.state.colony.address}
                            update={this.updateAddress}
                            errors={ValidateAddress(this.state.colony.address)}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.handleSaveAndClose}>
                        Save Update <Icon name='add' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):IncomingProps&DispatchProps {
    return {
        ...ownProps,
        saveColony:(colony:Colony) =>  dispatch(colonyActions.updateColony(colony))
    };
}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    null,
    mapDispatchToProps
)(ColonyEdit);
