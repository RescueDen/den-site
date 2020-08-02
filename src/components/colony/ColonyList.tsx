import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {Colony, EmptyColony} from "../../models/Colony";
import {colonyActions} from "../../actions/colony.actions";
import ColonyCard from "./ColonyCard";
import ColonyMap from "./ColonyMap";
import {Location} from "./ColonyMap";
import {Button, Card, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import ColonyEdit from "./ColonyEdit";
import PermissionBlock from "../authentication/PermissionBlock";

//Define the expected props
interface StateProps{
    colonies: Colony[];
}

interface DispatchProps{
    downloadColonyList: () => any;
}

interface MyState{
    selectedId?:number;
}

class ColonyList extends React.Component<StateProps&DispatchProps,MyState> {
    state={selectedId:undefined};

    componentDidMount(){
        // reset login status
        this.props.downloadColonyList();
    };

    selectLocation = (id:number) =>{
        this.setState({selectedId:id});
    }

    render() {
        let locations = this.props.colonies.filter(colony => colony.address.coordinate != undefined).map(colony => {
            return {
                latitude: colony.address.coordinate!.latitude,
                longitude: colony.address.coordinate!.longitude,
                id: colony.id
            } as Location});

        return (
            <>
                <Grid columns={2}>
                    <Grid.Column floated={'left'}>
                        <Header as='h1'>Cat Colonies</Header>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <PermissionBlock reqPerm={'edit_colonies'}>
                            <ColonyEdit trigger={<Button icon floated='right'>Add Colony<Icon name='plus' /></Button>} incomingColony={EmptyColony()}/>
                        </PermissionBlock>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Card.Group>
                            {this.props.colonies.map(colony => (
                                <ColonyCard
                                    colony={colony}
                                    onClick={this.selectLocation}
                                    selected={colony.id === this.state.selectedId}
                                />
                            ))}
                        </Card.Group>
                    </Grid.Column>
                    {locations.length > 0 &&
                    <Grid.Column>
                        <ColonyMap
                            selected={this.state.selectedId}
                            locations={locations}
                            select={this.selectLocation}
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
function mapStateToProps(state:ApplicationState ):StateProps {
    return {
        colonies:state.colony.colonies,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:StateProps):DispatchProps {
    return {
        downloadColonyList:() =>  dispatch(colonyActions.getColonyList())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ColonyList);
