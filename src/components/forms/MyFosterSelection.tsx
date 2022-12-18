import React from 'react';
import {connect} from "react-redux";
import {WidgetProps} from "@rjsf/utils";
import ApplicationState from "../../state/ApplicationState";
import {getEmptyCawsUser} from "../../models/ShelterUser";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../actions/user.actions";
import {animalActions} from "../../actions/animal.actions";
import AnimalState from "../../state/AnimalState";
import {Dropdown, DropdownItemProps} from "semantic-ui-react";
import {Species} from "../../models/ShelterAnimal";


//Define the expected props
interface LinkProps {
    widgetProps: WidgetProps;

    //Store if we allow multiple
    allowMultiple: boolean;

    //Store if we allow multiple
    species: Species[];

}

//Define the expected props
interface StateProps {
    fosterIds: number[]
    //Define the props we expect
    cawsAnimalsDb: AnimalState

}

interface DispatchProps {

    //And the actions that must be done
    updateMyInfo: () => any;

    //And the actions that must be done
    downloadAnimal: (id: number) => any;

}


/**
 * This card shows the animal details
 */
class MyFosterSelection extends React.Component<LinkProps & StateProps & DispatchProps> {
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
        return this.props.fosterIds.map(id => {
            //Get the information
            return this.props.cawsAnimalsDb.animals[id];
        }).filter(ani => ani).filter(ani => ani.isSpecies(this.props.species))
            .map(ani => {
                return {
                    text: ani.data.name,
                    value: ani.getCodeAndName(),
                    image: {avatar: true, src: ani.getImageUrl()},
                }


            })


    }

    //Add the code to seralize and deseralize the animals
    combineAsString = (values: any | undefined) => {

        //See if it is a array
        if (values instanceof Array) {
            //If it is an array
            return values.join(",");
        } else {
            return values;
        }


    }

    //Add the code to seralize and deseralize the animals
    separateString = (value: string | undefined) => {

        if (value !== undefined) {
            //Split the string
            return value.split(",").map(tmp => tmp.trim()).filter(tmp => tmp.length > 0);
        } else {
            return '';
        }

    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        this.getFosterItems();
//For now just render
        if (this.props.allowMultiple) {
            return (
                <Dropdown
                    placeholder='Select Foster(s)'
                    fluid
                    selection
                    multiple={true}
                    onChange={(event, value) => this.props.widgetProps.onChange(this.combineAsString(value.value))}
                    value={this.separateString(this.props.widgetProps.value)}
                    options={this.getFosterItems()}
                />
            )
        } else {
            return (
                <Dropdown
                    placeholder='Select Foster'
                    fluid
                    selection
                    multiple={false}
                    onChange={(event, value) => this.props.widgetProps.onChange(value.value)}
                    value={this.props.widgetProps.value ? this.props.widgetProps.value : ''}
                    options={this.getFosterItems()}
                />
            )
        }


    }
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 * @param ownProps
 */

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps & StateProps {
    return {
        ...myProps,
        fosterIds: (state.authentication.loggedInUser || getEmptyCawsUser()).data.currentFosters,
        cawsAnimalsDb: state.animals

    };
}

/**
 * All of them share the same mapDispatchToProps
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        downloadAnimal: (id: number) => dispatch(animalActions.getAnimal(id)),
        updateMyInfo: () => dispatch(userActions.updateLoggedInUser())

    };

}

//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyFosterSelection);

