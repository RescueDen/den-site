import React from 'react';

import {Image, List, Placeholder} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ShelterAnimal from "../../models/ShelterAnimal";


//Define the expected props
interface MyProps  {
    //Define the props we expect
    ani:ShelterAnimal;

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
                <List.Item as='a' href={`${this.props.link}/${this.props.ani.data.id}`}>
                    <Image centered={true} avatar src={this.props.ani.getImageUrl()} />
                    <List.Content>
                        <Link to={`${this.props.link}/${this.props.ani.data.id}`}>
                            <List.Header>
                                {this.props.ani.data.name}
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