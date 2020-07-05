
//Define the expected props
import React from "react";
import {
    Button,
    Container,
    Dimmer,
    DropdownProps,
    Form, Grid,
    Header,
    Icon,
    Image, Input, InputProps,
    Loader, Modal, Radio,
    Segment,
    Select,
    Table, TextArea, TextAreaProps
} from "semantic-ui-react";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";
import {PersonData} from "../../models/People";
import {VoucherClient} from "../../models/VoucherClient";

interface IncomingProps {
    initPerson:VoucherClient;

    //Pass in the function to update the list
    savePerson:(person:VoucherClient) => any;

    //Pass in the trigger
    trigger?:React.ReactNode;

    //Pass In a icon
    icon?:SemanticICONS;
}

interface ModalState {
    modalOpen:boolean;

    person:VoucherClient;
}

class ClientPersonalModal extends React.Component<IncomingProps> {
    state={modalOpen:false, person:this.props.initPerson}

    handleOpen = () => this.setState({ modalOpen: true })

    handleSaveAndClose = () => {
        this.props.savePerson(this.state.person);

        //And close this
        this.setState({modalOpen: false})
    }


    handleCancel = () => this.setState({ modalOpen: false })

    updatePerson = (newParams:any) =>{
        this.setState({person:{...this.state.person, ...newParams}});
    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        //Determine if we are using an icon or trigger
        let trigger:any;
        if(this.props.icon){
            trigger = <Icon name={this.props.icon} size='large' onClick={this.handleOpen}/>
        }else{
            trigger = <span onClick={this.handleOpen}>{this.props.trigger}</span>
        }

        return (
            <Modal
                trigger={trigger}
                open={this.state.modalOpen}
                onClose={this.handleCancel}
                size='small'
            >
                <Header icon='user' content='Client' />
                <Modal.Content>
                    <Form>
                        <Form.Field control={Input} label='Name'
                                    placeholder='client name'
                                    value={this.state.person.name}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                        const value = data.value ?? '';
                                        this.updatePerson({name:value});
                                    }
                                    }
                        />
                        <Form.Field control={Input} label='Group'
                                    placeholder='group or association'
                                    value={this.state.person.group}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                        const value = data.value ?? '';
                                        this.updatePerson({group:value})
                                    }
                                    }
                        />
                        <Form.Group widths='equal'>
                            <Form.Field fluid control={Input} label='Email' type='email'
                                        placeholder='email'
                                        value={this.state.person.email}
                                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                            const value = data.value ?? '';
                                            this.updatePerson({email:value})
                                        }
                                        }
                            />
                            <Form.Field fluid control={Input} label='Phone'
                                          placeholder='phone'
                                          value={this.state.person.phone}
                                          onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                              const value = data.value ?? '';
                                              this.updatePerson({phone:value})
                                          }
                                          }
                        />
                        </Form.Group>
                        <Form.Field control={Input} label='Address'
                                    placeholder='home address'
                                    value={this.state.person.address}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                        const value = data.value ?? '';
                                        this.updatePerson({address:value})
                                    }
                                    }
                        />
                        <Form.Field
                            control={TextArea}
                            label='Notes'
                            placeholder='Notes about this client...'
                            value={this.state.person.notes}
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                const value = data.value ?? '';
                                this.updatePerson({notes: value})
                            }
                            }
                        />

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.handleSaveAndClose}>
                        Save Update <Icon name='add' />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ClientPersonalModal ;
