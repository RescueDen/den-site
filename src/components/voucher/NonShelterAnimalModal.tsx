//Define the expected props
import React from "react";
import {Button, Form, Header, Icon, Input, InputProps, Modal, Radio, TextArea, TextAreaProps} from "semantic-ui-react";
import {NonShelterAnimal} from "../../models/Voucher";
import {SemanticICONS} from "semantic-ui-react/dist/commonjs/generic";
import {Species} from "../../models/ShelterAnimal";

interface IncomingProps {
    initAnimal:NonShelterAnimal;

    //Pass in the function to update the list
    saveAnimal:(animals:NonShelterAnimal) => any;

    //Pass in the trigger
    trigger?:React.ReactNode;

    //Pass In a icon
    icon?:SemanticICONS;
}

interface ModalState {
    modalOpen:boolean;

    //Also keep the current animal
    animal:NonShelterAnimal;
}

/**
 * This card shows the animal details
 */
class NonShelterAnimalModal extends React.Component<IncomingProps> {
    state={modalOpen:false, animal:this.props.initAnimal}

    handleOpen = () => this.setState({ modalOpen: true })

    handleSaveAndClose = () => {
        this.props.saveAnimal(this.state.animal);

        //And close this
        this.setState({modalOpen: false})
    }


    handleCancel = () => this.setState({ modalOpen: false })

    updateAnimal = (newParams:any) =>{
        this.setState({animal:{...this.state.animal, ...newParams}});
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
                <Header icon='paw' content='Non-CAWS Animal' />
                <Modal.Content>
                    <Form>
                        <Form.Field control={Input} label='Name'
                                    placeholder='animal name'
                                    value={this.state.animal.name}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                        if(data.value)
                                            this.updateAnimal({name:data.value})
                                    }
                                    }
                        />
                        {/*Species*/}
                        <Form.Group inline>
                            <label>Species</label>
                            <Form.Field
                                control={Radio}
                                label={Species.cat}
                                value={Species.cat}
                                checked={this.state.animal.species === Species.cat}
                                onChange={() => this.updateAnimal({species:Species.cat})}
                            />
                            <Form.Field
                                control={Radio}
                                label={Species.dog}
                                value={Species.dog}
                                checked={this.state.animal.species === Species.dog}
                                onChange={() => this.updateAnimal({species:Species.dog})}
                            />
                        </Form.Group>
                        {/*Species*/}
                        <Form.Group inline>
                            <label>Sex</label>
                            <Form.Field
                                control={Radio}
                                label={"Female"}
                                value={"F"}
                                checked={this.state.animal.sex === "F"}
                                onChange={() => this.updateAnimal({sex:"F"})}
                            />
                            <Form.Field
                                control={Radio}
                                label={"Male"}
                                value={"M"}
                                checked={this.state.animal.sex === "M"}
                                onChange={() => this.updateAnimal({sex:"M"})}
                            />
                        </Form.Group>
                        {/*Age*/}
                        <Form.Field
                            control={Input}
                            label='Age (years)'
                            type="number"
                            value={this.state.animal.age}
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: InputProps) => {
                                if (data.value)
                                    this.updateAnimal({age: parseFloat(data.value)})
                            }
                            }

                        />
                        <Form.Field control={TextArea} label='Comments'
                                    placeholder='any comments about the animal...'
                                    value={this.state.animal.comments}
                                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: TextAreaProps) => {
                                        if(data.value)
                                            this.updateAnimal({comments:data.value})
                                    }
                                    }
                        />

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.handleSaveAndClose}>
                        Update Animal <Icon name='add' />
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default NonShelterAnimalModal ;
