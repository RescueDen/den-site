import React from 'react';

import {Image, Dimmer, Input, List, Loader, Segment, Card, Item, Button, Icon, Placeholder} from "semantic-ui-react";
import {ArticleItemData} from "../../models/ArticlesSummary";
import {infoService} from "../../services/info.service"
import {error} from "../../actions/alert.actions";
import {infoConstants} from "../../actions/info.actions";
import {formatDate} from "../../utils/date-formater";
import {Link} from "react-router-dom";
import CawsAnimal from "../../models/CawsAnimal";
import AnimalBio from "./details-components/AnimalBio";



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
class AnimalItemFull extends React.Component<MyProps> {

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If the animal is undefined return a place holder
        if(this.props.ani === undefined){
            //Return the html
            return (
                <Item>
                    {/*Give the ani image*/}
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Item>
            );

        }else {
            //Return the html
            return (
                <Item>
                    {/*Give the ani image*/}
                    <Item.Image size='small' src={this.props.ani.getImageUrl()}/>

                    <Item.Content>
                        <Item.Header>{this.props.ani.data.NAME}</Item.Header>
                        <Item.Meta>
                            {/*<span className='date'>{formatDate(this.props.item.date)}</span>*/}
                        </Item.Meta>
                        <Item.Description>
                            <AnimalBio animal={this.props.ani}/>
                        </Item.Description>
                        <Item.Extra>
                            <Link to={`${this.props.link}/${this.props.ani.data.ID}`} >
                            <Button primary floated='right'>
                                Read More
                                <Icon name='chevron right'/>
                            </Button>
                            </Link>
                        </Item.Extra>
                    </Item.Content>
                </Item>

            );
        }

    }
}


export default AnimalItemFull