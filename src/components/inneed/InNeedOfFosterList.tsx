import React from 'react'
import {connect} from "react-redux";
import {getEmptyCawsUser} from "../../models/CawsUser";
import ApplicationState from "../../state/ApplicationState";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import AnimalCard from "../animal/AnimalCard";
import {Card, Header, Input} from "semantic-ui-react";
import {ThunkDispatch} from "redux-thunk";
import InNeedOfFosterModel from "../../models/InNeedOfFosterModel";
import {inNeedActions} from "../../actions/inNeedFoster.actions";
import SearchableAnimalListFull from "../animal/SearchableAnimalListFull";

//Define the expected props
interface IncomingProps  {
    //Define the props we expect
    inNeed:InNeedOfFosterModel

}

interface DispatchProps{
    //And the actions that must be done
    getInNeedList: () => any;

}


/**
 * This card shows the animal details
 */
class InNeedOfFosterList extends React.Component<IncomingProps&DispatchProps> {

    /**
     * Gets called once when the page loads.  Tell the system to download the in need list
     */
    componentDidMount(){
        // reset login status
        this.props.getInNeedList();
    };

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        return (
            <SearchableAnimalListFull link="/animal" title={"In Need of Foster"} animalIdList={this.props.inNeed.getAllAnimalsInNeed()} />
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
        getInNeedList:() =>  dispatch(inNeedActions.getInNeedOfFoster())
    };

}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToPropsPastFosters(state:ApplicationState): IncomingProps {

    return {
        inNeed: state.inNeedFoster,
    };
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(
    mapStateToPropsPastFosters,
    mapDispatchToProps
)(InNeedOfFosterList);
