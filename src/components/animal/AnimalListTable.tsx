import React from 'react'
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {Header, Icon, Image, List, Placeholder, Table} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import AnimalItemCompact from "./AnimalItemCompact";
import {Link} from "react-router-dom";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    animalIdList: number[]
    aniLink?:string
    onDelete?:(id:number) => any;
}

//Define the expected props
interface LinkProps  {
    //Define the props we expect
    cawsAnimalsDb: AnimalState

}


interface DispatchProps{
    //And the actions that must be done
    downloadAnimal: (id:number) => any;

}



/**
 * This card shows the animal details
 */
class AnimalListTable extends React.Component<IncomingProps&DispatchProps&LinkProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount(){
        // reset login status
        this.props.animalIdList.forEach(aniId => this.props.downloadAnimal(aniId));
    };

    /**
     * Check to see if the props changed
     * @param prevProps
     */
    componentDidUpdate(prevProps:IncomingProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.animalIdList.length !== prevProps.animalIdList.length) {
            this.props.animalIdList.forEach(aniId => this.props.downloadAnimal(aniId));
        }
    }

    /**
     * Get the items
     */
    getItems = () =>{
        //If we have items
        return this.props.animalIdList.map(id => {
            //Convert to an ani
            const ani = this.props.cawsAnimalsDb.animals[id];

            return (
                <Table.Row>
                    <Table.Cell key={id} as='a' href={`${this.props.aniLink}/${id}`} target="_blank">
                        {ani &&
                            <Header as='h4' image>
                                <Image src={ani.data.THUMBNAILURL} rounded size='mini'/>
                                <Header.Content>
                                    {ani.data.NAME}
                                    <Header.Subheader>{ani.data.SHELTERCODE}: {ani.data.AGE}</Header.Subheader>
                                    <Header.Subheader>
                                        {ani.getCurrentLocation()}
                                    </Header.Subheader>

                                </Header.Content>
                            </Header>
                        }
                        {!ani &&
                        <Header as='h4' image>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Header>

                        }
                    </Table.Cell>

                    {this.props.onDelete &&
                        <Table.Cell textAlign='right'>
                            <Icon name='delete' onClick={() => {
                                if(this.props.onDelete)
                                    this.props.onDelete(id)
                                }
                            }
                            />
                        </Table.Cell>
                    }
                </Table.Row>
            );

        });

    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <Table basic='very'  collapsing>
                <Table.Body>
                    {this.getItems()}

                </Table.Body>
            </Table>

        )
    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>, ownProps:IncomingProps):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id))
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,props:IncomingProps ): IncomingProps&LinkProps {

    return {
        ...props,
        cawsAnimalsDb:state.animals,
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(AnimalListTable);

