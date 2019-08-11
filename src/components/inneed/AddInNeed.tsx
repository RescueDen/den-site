import React from 'react';

//Import custom styling
import {
    Button, DropdownProps,
    Form, Icon
} from "semantic-ui-react";

import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {NonShelterAnimal} from "../../models/InNeedOfFosterModel";
import CawsAnimal, {Species} from "../../models/CawsAnimal";

//Define the expected props
interface IncomingProps{
}

interface LinkProps {
    uploadAnimal: (data: NonShelterAnimal, file: File) => any;
}


interface LocalState{
    anData:NonShelterAnimal
    files?:FileList

}





class AddInNeed extends React.Component<IncomingProps&LinkProps, LocalState> {
    state ={
        anData:{
            id:"",
            name:"",
            location:"",
            information:"",
            species:Species.dog
        }
        ,
        files:undefined
    }

    handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{

        //Get the files
        const files = this.state.files;

        //Now upload the data
        if (files) {
            this.props.uploadAnimal(this.state.anData, files[0])
        }

        event.preventDefault();
    }

    render(): React.ReactNode {
        //Allow allow to submit if there is a name and blob
        const allowedToSubmit = this.state.anData.name.length > 0 && this.state.files != undefined;

        //Return the list
        return (
            <Form
                onSubmit={this.handleSubmit}
            >
                <Form.Input
                    fluid
                    label='Name'
                    placeholder='Name'
                    value={this.state.anData.name}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        this.setState({
                            ... this.state,
                            anData:{
                                ...this.state.anData,
                                name:event.currentTarget.value
                            }
                        })
                    }}
                />
                <Form.Select
                    fluid
                    label='Species'
                    placeholder='Species'
                    value={this.state.anData.species.toString()}
                    options={[
                        {
                            key: Species.dog,
                            value: Species.dog,
                            text:Species.dog,
                        },
                        {
                            key: Species.cat,
                            value:Species.cat,
                            text:Species.cat,
                        }
                    ]}
                    onChange={({}, data: DropdownProps) => {
                        if(data.value) {
                            this.setState({
                                ...this.state,
                                anData: {
                                    ...this.state.anData,
                                    species: data.value.toString() == "Dog" ? Species.dog : Species.cat,
                                }
                            })
                        }
                    }}
                />
                <Form.TextArea
                    fluid
                    label='Information'
                    placeholder='Please provide available information'
                    value={this.state.anData.information}
                    onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                        this.setState({
                            ... this.state,
                            anData:{
                                ...this.state.anData,
                                information:event.currentTarget.value
                            }
                        })
                    }}
                />
                <Form.Input
                    fluid
                    label='Location'
                    placeholder='Location'
                    value={this.state.anData.location}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        this.setState({
                            ... this.state,
                            anData:{
                                ...this.state.anData,
                                location:event.currentTarget.value
                            }
                        })
                    }}
                />
                <Form.Input
                    type='file'
                    fluid
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        this.setState({
                            ... this.state,
                            files: event.currentTarget.files? event.currentTarget.files : undefined
                        })
                    }}
                />
                <Form.Field
                    disabled={!allowedToSubmit}
                    control={Button}
                > <Icon name='facebook official' />
                    Add and Share to FaceBook</Form.Field>

            </Form>
        );

    }



};

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState): IncomingProps {
    return {
    };
}


export default connect(
    mapStateToProps,
)(AddInNeed);
;
