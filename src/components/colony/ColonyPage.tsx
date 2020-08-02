import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {Colony, EmptyColony} from "../../models/Colony";
import {colonyActions} from "../../actions/colony.actions";
import ColonyCard from "./ColonyCard";
import ColonyMap from "./ColonyMap";
import {Location} from "./ColonyMap";
import {Button, Card, Grid, Header, Icon, Label, List, Placeholder, Segment} from 'semantic-ui-react';
import ColonyEdit from "./ColonyEdit";
import PermissionBlock from "../authentication/PermissionBlock";
import {RouteComponentProps} from "react-router";

interface IncomingProps extends RouteComponentProps<any>{
    colonyId: number;
}

interface StateProps{
    colony?: Colony;
}

interface DispatchProps{
    downloadColony: (colonyId:number) => any;
}

interface MyState{
    selectedId?:number;
}

class ColonyPage extends React.Component<IncomingProps&StateProps&DispatchProps,MyState> {
    state={selectedId:undefined};

    componentDidMount(){
        // reset login status
        this.props.downloadColony(this.props.colonyId);
    };

    render() {
        return (
            <>
                <Grid columns={2}>
                    <Grid.Column floated={'left'}>
                        <Header as='h1'>{this.props.colony?.name}</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        {!this.props.colony &&
                            <Card fluid>
                                <Card.Content>
                                    <Placeholder>
                                        <Placeholder.Header>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                            <Placeholder.Line length='medium' />
                                            <Placeholder.Line length='short' />
                                        </Placeholder.Paragraph>
                                    </Placeholder>
                                </Card.Content>
                            </Card>
                        }
                        {this.props.colony &&
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        <span className='date'>Group: {this.props.colony.group}</span>
                                    </Card.Header>
                                    <Card.Description>
                                        <List>
                                            <List.Item>{this.props.colony.address.address}</List.Item>
                                            <List.Item>{this.props.colony.address.city} {this.props.colony.address.state} {this.props.colony.address.zipCode}</List.Item>
                                        </List>
                                    </Card.Description>
                                </Card.Content>
                                {this.props.colony &&
                                <PermissionBlock reqPerm={'edit_colonies'}>
                                    <ColonyEdit
                                        trigger={<Label attached='bottom'>Edit</Label>}
                                        incomingColony={this.props.colony}/>
                                </PermissionBlock>
                                }
                            </Card>
                        }
                    </Grid.Column>
                    {this.props.colony?.address.coordinate &&
                    <Grid.Column>
                        <ColonyMap
                            key={this.props.colony.id}
                            selected={this.state.selectedId}
                            locations={[
                                {
                                    latitude: this.props.colony.address.coordinate.latitude,
                                    longitude: this.props.colony.address.coordinate.longitude,
                                    id: this.props.colony.id
                                }]
                            }
                        />
                    </Grid.Column>
                    }
                </Grid>
            </>
        )
    }
}

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState, incoming: IncomingProps ):IncomingProps&StateProps {
    const colonyId = +incoming.match.params.colonyId;
    return {
        ...incoming,
        colonyId:colonyId,
        colony:state.colony.colonies.find(c => c.id === colonyId),
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps&StateProps):DispatchProps {
    return {
        ...ownProps,
        downloadColony:(colonyId:number) =>  dispatch(colonyActions.loadColony(colonyId))
    };
}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ColonyPage);
