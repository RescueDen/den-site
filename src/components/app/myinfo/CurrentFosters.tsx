import React from 'react'
import {connect} from "react-redux";
import CawsUser from "../../../models/CawsUser";
import {getEmptyCawsUser} from "../../../models/CawsUser";
import ApplicationState from "../../../state/ApplicationState";
import {animalActions} from "../../../actions/animal.actions";
import AnimalState from "../../../state/AnimalState";
import AnimalCard from "../../animal/AnimalCard";
import {Card} from "semantic-ui-react";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    cawsUser: CawsUser
    cawsAnimals: AnimalState
}


const CurrentFosters = (props:IncomingProps) => {

    return (

        <div>
            <Card.Group>
                {//Step over each of my previous fosters
                    props.cawsUser.data.currentFosters.map(id =>{
                        return <AnimalCard animalId={id}  />
                    })
                }
            </Card.Group>
        </div>
    )
};

/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState): IncomingProps {
    return {
        cawsUser: state.authentication.loggedInUser|| getEmptyCawsUser(),
        cawsAnimals:state.animals
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
)(CurrentFosters);

