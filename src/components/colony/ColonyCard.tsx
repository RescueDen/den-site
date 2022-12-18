import React from 'react';
import {Colony} from "../../models/Colony";
import {Card, Icon, Label, List} from "semantic-ui-react";

//Define the expected props
interface IncomingProps {
    colony: Colony;
    onClick: (id: number) => any;
    onLocate: (id: number) => any;
    selected: boolean;
}

class ColonyCard extends React.Component<IncomingProps> {
    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <Card
                fluid
                key={this.props.colony.id}
                onClick={() => this.props.onClick(this.props.colony.id)}
                color={this.props.selected ? 'green' : undefined}
            >
                <Card.Content>
                    <Card.Header>{this.props.colony.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.colony.group}</span>
                    </Card.Meta>
                    <Card.Description>
                        <List>
                            <List.Item>{this.props.colony.address.address}</List.Item>
                            <List.Item>{this.props.colony.address.city} {this.props.colony.address.state} {this.props.colony.address.zipCode}</List.Item>
                        </List>
                    </Card.Description>
                    <Label attached='top right' as='a'><Icon name='location arrow'/></Label>
                </Card.Content>
            </Card>
        )
    }
}

export default ColonyCard;