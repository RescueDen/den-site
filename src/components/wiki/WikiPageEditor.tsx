import React from 'react';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, Confirm, Dimmer, Icon, Label, Loader, Message, Segment} from "semantic-ui-react";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {wikiService} from "../../services/wiki.service";
import {WikiPage} from "../../models/WikiPage";

interface IncomingProps{
    contentPath:string;
    allowEdit?: boolean;
}

interface StateProps{
    editorState:EditorState;
    rev?: number;
    lastUpdate?: Date;
    loading:boolean;
    error?:string;
    editing:boolean;
    canceling:boolean;
}

class WikiPageEditor extends React.Component<IncomingProps,StateProps> {
    state={editorState: EditorState.createEmpty(), loading:false, rev:undefined, lastUpdate:undefined, error:undefined, editing:false, canceling:false};

    componentDidMount(){
        this.setState({loading: true})
        wikiService.getWikiPage(this.props.contentPath).then(
            this.loadPage,
            this.loadError
        )
    };

    loadPage = (page: WikiPage) =>{
        const contentBlock = htmlToDraft(page.content);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState,
                rev: page.revision,
                lastUpdate: page.lastChangeDate,
                error:undefined,
                loading:false,
                editing:false
            });
        }
    }

    enterEditMode = () =>{
        this.setState({editing:true})
    }

    confirmCancelEditMode = () =>{
        this.setState({canceling:true})
    }

    cancelEditMode = () =>{
        this.setState({editing:false, canceling:false})
        this.componentDidMount();
    }

    saveFromEditMode = () =>{
        this.setState({loading:true})

        let updatedPage = {
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        }

        wikiService.postWikiPage(this.props.contentPath, updatedPage).then(
            this.loadPage,
            this.loadError
        )
    }

    loadError = (errorResponse: any) => {
        //Dispatch the error
        try {
            this.setState({error:errorResponse.response.data.message, loading:false});
        }catch(e){
            this.setState({error:errorResponse.toString(),loading:false});
        }
    }

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
        let lastUpdate = undefined;
        if(this.state.lastUpdate){
            lastUpdate = new Date(this.state.lastUpdate!);
            if(lastUpdate.getFullYear() === 0){
                lastUpdate = undefined;
            }
        }

        const { editorState } = this.state;
        return (
            <div style={{minHeight:"300px"}}>
                <Segment key='content' attached={this.state.error || this.state.editing ? 'top': undefined } >
                    <Dimmer inverted active={this.state.loading}>
                        <Loader inverted active={this.state.loading}/>
                    </Dimmer>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        readOnly={!this.state.editing}
                        toolbarHidden={!this.state.editing}
                        toolbar={
                            {
                                image:{
                                    uploadEnabled:true,
                                    uploadCallback:this.uploadCallback
                                }
                            }
                        }

                    />
                    <Label attached='bottom left'>{lastUpdate?.toLocaleString()} Rev:{this.state.rev}</Label>
                    {this.props.allowEdit && !this.state.editing &&
                        <Label attached='bottom right' as='a' onClick={this.enterEditMode}>
                            <Icon name='edit' />
                            Edit
                        </Label>
                    }
                </Segment>

                {this.state.editing &&
                    <Segment attached={this.state.error ? true : 'bottom'} tertiary>
                        <Button primary onClick={this.saveFromEditMode}>Save</Button>
                        <Button secondary onClick={this.confirmCancelEditMode}>Cancel</Button>
                        <Confirm
                            open={this.state.canceling}
                            onCancel={() => this.setState({canceling:false})}
                            onConfirm={this.cancelEditMode}
                            content="Are you sure you want to cancel and delete changes?"
                            header="Cancel and Delete?"
                            cancelButton='Continue editing'
                            confirmButton="Cancel & Delete"
                        />
                    </Segment>
                }

                {this.state.error &&
                    <Message attached='bottom' error>
                        {this.state.error}
                    </Message>
                }
            </div>
        )
    }
}

export default WikiPageEditor;