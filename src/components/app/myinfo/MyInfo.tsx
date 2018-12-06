import React from 'react'
import {connect} from "react-redux";
import CawsUser from "../../../models/CawsUser";
import {getEmptyCawsUser} from "../../../models/CawsUser";
import ApplicationState from "../../../state/ApplicationState";
import {animalActions} from "../../../actions/animal.actions";
import AnimalState from "../../../state/AnimalState";


//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    cawsUser: CawsUser
    cawsAnimals: AnimalState
}

//Define the expected props
interface DispatchActions  {
    //Define the props we expect
    getAnimal: (id:number) =>any;

}


class MyInfo extends React.Component<IncomingProps&DispatchActions> {


    //On mount
    componentDidMount(){

        //Step over each of my previous fosters
        this.props.cawsUser.data.pastFosters.map(id =>{
            this.props.getAnimal(id);
        })



    }



    //Return the real div
    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        return (

            <div>
                {JSON.stringify(this.props.cawsAnimals.animals)}
            </div>
        )
    }

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

function mapDispatchToProps(dispatch: any): DispatchActions {
    return {
        getAnimal:(id:number) => dispatch(animalActions.getAnimal(id)),
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(MyInfo);

