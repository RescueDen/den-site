import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Segment} from "semantic-ui-react";

interface IncomingProps{
    colonyId: number;
}

interface StateProps{
    editorState:EditorState;
}

class WikiPage extends React.Component<IncomingProps,StateProps> {
    state={editorState: EditorState.createEmpty()};

    componentDidMount(){
        // reset login status
    };

    onEditorStateChange = (editorState:EditorState) => {
        this.setState({
            editorState,
        });
    };

    uploadCallback = (file: any):any =>{
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.addEventListener("load", function (){
                let url = reader.result;
                resolve({data:{link:url}} )

            });
            reader.readAsDataURL(file);
        });

    }

    render() {
        const { editorState } = this.state;
        return (
            <Segment style={{minHeight:"1000px"}}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={
                        {
                            image:{
                                uploadEnabled:true,
                                uploadCallback:this.uploadCallback
                            }
                        }
                    }
                />
            </Segment>
        )
    }
}

export default WikiPage;