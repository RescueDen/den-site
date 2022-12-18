import React from 'react';

//Import custom styling
import {Button, Form, Icon, TextAreaProps} from "semantic-ui-react";

import {connect} from "react-redux";
import ShelterAnimal from "../../../models/ShelterAnimal";
import ApplicationState from "../../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {animalActions} from "../../../actions/animal.actions";

//Define the expected props
interface IncomingProps {
    ani: ShelterAnimal
}

interface LinkProps {
}

interface DispatchProps {
    uploadPicture: (id: number, comments: string, file: File) => any;
}


interface LocalState {
    comments: string;
    files?: FileList;
    busy: boolean;

}


class UploadPicture extends React.Component<IncomingProps & LinkProps & DispatchProps, LocalState> {
    state = {
        comments: "", files: undefined, busy: false
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        //Update the state to be busy
        this.setState({busy: true});

        //Get the files
        const files = this.state.files;

        //Now upload the data
        if (files) {
            this.props.uploadPicture(this.props.ani.data.id, this.state.comments, files[0])
        }

        event.preventDefault();
    }

    render(): React.ReactNode {
        //Allow allow to submit if there is a name and blob
        const allowedToSubmit = this.state.files !== undefined;

        //Return the list
        return (<Form
                onSubmit={this.handleSubmit}
                loading={this.state.busy}
                style={{marginRight: "40px", marginLeft: "40px"}}
            >
                <Form.TextArea
                    placeholder='notes for the image...'
                    value={this.state.comments}
                    onChange={(event: any, data: TextAreaProps) => {
                        if (data.value) {
                            this.setState({
                                ...this.state, comments: data.value.toString()
                            })
                        }
                    }}
                />

                <Form.Input
                    type='file'
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        this.setState({
                            ...this.state, files: event.currentTarget.files ? event.currentTarget.files : undefined
                        })
                    }}
                />
                <Form.Field
                    disabled={!allowedToSubmit}
                    control={Button}
                > <Icon name='upload'/>
                    Share Picture</Form.Field>

            </Form>);

    }


}

/**
 * Map from the global state to things we need here
 * @param state
 */
function mapStateToProps(state: ApplicationState): LinkProps {
    return {};
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        uploadPicture: (id: number, comments: string, file: File) => dispatch(animalActions.uploadAnimalPicture(id, comments, file))
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPicture);

