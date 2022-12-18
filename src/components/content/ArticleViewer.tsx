import React from 'react';

import {Dimmer, Icon, Image, Loader, Segment} from "semantic-ui-react";
import PermissionBlock from "../authentication/PermissionBlock";
import {ItemData} from "../../models/ItemData";
import {contentService} from "../../services/content.service";

//Define the expected props
interface MyProps {
    //Define the props we expect
    item: ItemData;
    category: string;
}

//Keep a state of open documents
interface MyState {
    html: string;
}

/**
 * This card shows the animal details
 */
class ArticleViewer extends React.Component<MyProps, MyState> {
    state = {html: ""};

    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount() {
        // reset login status
        contentService.downloadContent(this.props.category, this.props.item.id)
            .then(//If successful html will be returned
                article => {
                    //Update the state
                    this.setState({html: article})
                }, //If there was an error, show to the user
                errorResponse => {
                    //Dispatch the error
                    try {
                        this.setState({html: errorResponse.response.data.message});
                    } catch (e) {
                        this.setState({html: errorResponse.toString()});
                    }
                });
    };


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If there is no html mark as loading
        if (this.state.html.length === 0) {
            return (<Segment>
                    <Dimmer inverted active>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                </Segment>);
        } else {
            //Return the html
            return (<>
                    <PermissionBlock reqPerm="inside_caws">
                        <a className="ui right floated button"
                           href={`https://drive.google.com/open?id=${this.props.item.id}`} target="_blank">
                            Open In <Icon name='google drive'/>
                        </a>
                    </PermissionBlock>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
                </>

            );
        }

    }
}


export default ArticleViewer