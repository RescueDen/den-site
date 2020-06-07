import React from 'react';

import {Button, Icon, Item} from "semantic-ui-react";
import {ItemData} from "../../models/ItemData";
import {formatDate} from "../../utils/date-formater";
import {Link} from "react-router-dom";


//Define the expected props
interface MyProps  {
    //Define the props we expect
    item:ItemData;

    //add a link to link to
    link:string;
}

/**
 * This card shows the animal details
 */
class ArticleItem extends React.Component<MyProps> {

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //Return the html
        return (
            <Item>
                {/*If there is a thumbnail*/}
                {this.props.item.thumbnail && this.props.item.thumbnail.length > 0 &&
                    <Item.Image size='small' src={this.props.item.thumbnail}/>
                }
                <Item.Content>
                    <Item.Header>{this.props.item.name}</Item.Header>
                    <Item.Meta>
                        <span className='date'>{formatDate(this.props.item.date)}</span>
                    </Item.Meta>
                    <Item.Description>{this.props.item.preview}</Item.Description>
                    <Item.Extra>
                        <Link to={`${this.props.link}/${this.props.item.id}`} >
                        <Button primary floated='right'>
                            Read More
                            <Icon name='chevron right' />
                        </Button>
                        </Link>
                    </Item.Extra>
                </Item.Content>
            </Item>

        );

    }
}


export default ArticleItem