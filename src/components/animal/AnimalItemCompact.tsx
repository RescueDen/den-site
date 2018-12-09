import React from 'react';

import {Image, Dimmer, Input, List, Loader, Segment, Card, Item, Button, Icon, Placeholder} from "semantic-ui-react";
import {ArticleItemData} from "../../models/ArticlesSummary";
import {infoService} from "../../services/info.service"
import {error} from "../../actions/alert.actions";
import {infoConstants} from "../../actions/info.actions";
import {formatDate} from "../../utils/date-formater";
import {Link} from "react-router-dom";
import CawsAnimal from "../../models/CawsAnimal";



//Define the expected props
interface MyProps  {
    //Define the props we expect
    ani:CawsAnimal;

    //add a link to link to
    link:string;
}

/**
 * This card shows the animal details
 */
class AnimalItemCompact extends React.Component<MyProps> {

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If the animal is undefined return a place holder
        if(this.props.ani === undefined){
            //Return the html
            return (
                <List.Item>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </List.Item>
            );

        }else {
            //Return the html
            return (
                <List.Item>
                    <Image avatar src={this.props.ani.getImageUrl()} />
                    <List.Content>
                        <Link to={`${this.props.link}/${this.props.ani.data.ID}`}>
                            <List.Header>
                                {this.props.ani.data.NAME}
                            </List.Header>
                        </Link>
                        {this.props.ani.getCurrentStatus()}
                    </List.Content>
                </List.Item>

            );
        }

    }
}


export default AnimalItemCompact