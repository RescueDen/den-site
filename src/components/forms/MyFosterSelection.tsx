import React from 'react';

import {connect} from "react-redux";


import Form, {WidgetProps} from "react-jsonschema-form-semanticui-fixed";
import ApplicationState from "../../state/ApplicationState";
import {getEmptyCawsUser} from "../../models/CawsUser";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {Dropdown, DropdownItemProps} from "semantic-ui-react";


//Define the expected props
interface LinkProps {
    widgetProps:WidgetProps


}

//Define the expected props
interface StateProps {
    fosterIds: number[]
    //Define the props we expect
    cawsAnimalsDb: AnimalState

}

interface DispatchProps{

    //And the actions that must be done
    updateMyInfo: () => any;

    //And the actions that must be done
    downloadAnimal: (id:number) => any;

}



/**
 * This card shows the animal details
 */
class MyFosterSelection extends React.Component<LinkProps&StateProps&DispatchProps> {
    /**
     * Gets called once when the page loads.  Tell the system to download that animal
     */
    componentDidMount() {
        // reset login status
        this.props.updateMyInfo();
        this.props.fosterIds.forEach(aniId => this.props.downloadAnimal(aniId));
    };


    /**
     * Get the drop down items
     */
    getFosterItems(): DropdownItemProps[] {
        return this.props.fosterIds.map(id =>{
            //Get the information
            const ani = this.props.cawsAnimalsDb.animals[id];

            return ani;
        }).filter(ani =>  ani).map(ani =>{
            return   {
                text: ani.data.NAME,
                value: ani.getCodeAndName(),
                image: { avatar: true, src: ani.getImageUrl()},
            }


        })


    }


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {


        //For now just render
        return(
                <Dropdown
                    placeholder='Select Foster'
                    fluid
                    selection
                    onChange={(event, value) => this.props.widgetProps.onChange(value.value)}
                    value={this.props.widgetProps.value}
                    options={this.getFosterItems()}
                />
        )

    }
};

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps&StateProps {
    return {
        ...myProps,
        fosterIds: (state.authentication.loggedInUser || getEmptyCawsUser()).data.currentFosters,
        cawsAnimalsDb:state.animals

    };
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        downloadAnimal:(id:number) =>  dispatch(animalActions.getAnimal(id)),
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser())

    };

}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default  connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyFosterSelection);

