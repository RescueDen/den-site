
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

interface IncomingProps {
    initPerson:PersonData;

    //Pass in the function to update the list
    savePerson:(person:PersonData) => any;

    //Pass in the trigger
    trigger?:React.ReactNode;

    //Pass In a icon
    icon?:SemanticICONS;
}

interface ModalState {
    modalOpen:boolean;

    //Also keep the current animal
    person:PersonData;
}

/**
 * This card shows the animal details
 */
class NonShelterPersonModal extends React.Component<IncomingProps> {
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

        //Determine if we are using an icon or rigger
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
                <Header icon='user' content='Non-CAWS Person' />
                <Modal.Content>
                    <Form>
                        <Form.Group equal>
                            <Form.Field control={Input} label='First Name'
                                        placeholder='first name'
                                        value={this.state.person.firstname}
                                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                            if(data.value)
                                                this.updatePerson({firstname:data.value})
                                        }
                                        }
                            />
                            <Form.Field control={Input} label='Last Name'
                                        placeholder='last name'
                                        value={this.state.person.lastname}
                                        onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                            if(data.value)
                                                this.updatePerson({lastname:data.value})
                                        }
                                        }
                            />
                        </Form.Group>
                        <Form.Field control={Input} label='Email'
                                    placeholder='email'
                                    value={this.state.person.email}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                        if(data.value)
                                            this.updatePerson({email:data.value})
                                    }
                                    }
                        />

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.handleSaveAndClose}>
                        Update Person <Icon name='add' />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default NonShelterPersonModal ;
