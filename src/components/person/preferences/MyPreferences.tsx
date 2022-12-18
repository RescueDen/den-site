import React from 'react';

import {Button, CheckboxProps, Container, DropdownProps, Form, Header, Loader, Segment} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";

import ShelterUser, {getEmptyCawsUser} from "../../../models/ShelterUser";
import {Option, OptionGroup, SettingGroup, UserPreferences} from "../../../models/UserPreferences";
import ApplicationState from "../../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../../actions/user.actions";
import {connect} from "react-redux";
import {AuthenticationStatus} from "../../../state/AuthenticationState";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user: ShelterUser;
    prefs?: UserPreferences;
    loading: boolean;
}


interface DispatchProps {
    //And the actions that must be done
    updateMyInfo: () => any;
    updatePreferences: (settings: SettingGroup) => any
}

interface PrefState {
    editSettings?: SettingGroup;
}


/**
 * This page shows the person details
 */
class MyPreferences extends React.Component<LinkProps & DispatchProps, PrefState> {
    state = {editSettings: undefined}

    //Update the user if there are any changes
    componentDidMount() {
        this.props.updateMyInfo()
    }

    //Get the item as html input
    getItemAsHtml(option: Option, currentValue: string, update: (newValue: string) => any) {

        //Make sure not hidden
        if (option.hidden) {
            return null
        }

        //See if it is disabled
        const disabled = !this.state.editSettings;

        //Switch the input type
        switch (option.type) {
            case "int":
            case "float":
                return (
                    <>
                        <Form.Field
                            disabled={disabled}
                            label={option.name}
                            control='input'
                            type='number'
                            value={currentValue}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                //convert to an int
                                let value: number;

                                //See if we should parse as an int or value
                                if (option.type === "int") {
                                    value = parseInt(event.target.value)
                                } else {
                                    value = parseFloat(event.target.value)
                                }

                                //See if there max/min
                                if (option.maxValue)
                                    value = Math.min(value, option.maxValue)
                                if (option.minValue)
                                    Math.max(value, option.minValue)

                                //Now store it
                                update(update + "");

                            }
                            }

                        />

                    </>
                );
            case "bool": {
                //Build the name
                let name = option.name;
                if (option.description && option.description.length > 0) {
                    name += ": " + option.description;
                }

                return (
                    <>
                        <Form.Checkbox
                            disabled={disabled}
                            label={name}
                            checked={currentValue === 'true'}
                            onChange={(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
                                //Now store it
                                update(data.checked ? "true" : "false");

                            }
                            }

                        />
                    </>
                );
            }
            case "string":
                //Build the name
                let name = option.name;
                if (option.description && option.description.length > 0) {
                    name += ": " + option.description;
                }

                //If it a drop down
                if (option.selection) {
                    return (
                        <Form.Select
                            disabled={disabled}
                            label={name}
                            value={currentValue}
                            options={option.selection.map(opt => {
                                return {
                                    key: opt,
                                    value: opt,
                                    text: opt
                                }
                            })}
                            onChange={({}, data: DropdownProps) => {


                                //Now store it
                                update(data.value + "");

                            }
                            }

                        />
                    );

                } else {

                    //Just free flow
                    return (
                        <Form.Field
                            disabled={disabled}
                            label={name}
                            control='input'
                            type='text'
                            value={currentValue}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                //Now store it
                                update(event.target.value + "");


                            }
                            }

                        />
                    );
                }
            default: {
                return <p>Preference {option.name} Not Supported of type {option.type}</p>

            }


        }


    }


    //Converts the component to the group
    getComponent(optionsGroup: OptionGroup, settingGroup: SettingGroup, depth: number, update: (settingGroup: SettingGroup) => any) {
        return (
            <Segment>
                <Header as={`h${depth}`}>{optionsGroup.name} </Header>
                <p>{optionsGroup.description}</p>
                {/*March over each option*/}
                <Form>
                    {
                        optionsGroup.options && optionsGroup.options.map(
                            value => {
                                return this.getItemAsHtml(
                                    value,
                                    settingGroup.settings[value.id],
                                    (newValue: string) => {
                                        settingGroup.settings[value.id] = newValue;

                                        //Now update the settings
                                        update(settingGroup);

                                    }
                                );
                            }
                        )
                    }
                </Form>
                {/*Add subgroups*/}
                {optionsGroup.subgroups && optionsGroup.subgroups.map(group =>
                    this.getComponent(
                        group,
                        settingGroup.subgroup[group.id],
                        depth + 1,
                        (childSettingGroup: SettingGroup) => {
                            settingGroup.subgroup[group.id] = childSettingGroup;
                            //Now update the settings
                            update(settingGroup);

                        }
                    ))}

            </Segment>
        );
    }


    //Add a button to submit case
    saveChanges = () => {

        if (this.state.editSettings) {
            //The new settings
            const newSettings = this.state.editSettings!;


            this.props.updatePreferences(newSettings);

        }
        //And cancel
        this.cancelChanges()

    };

    cancelChanges = () => {
        this.setState({editSettings: undefined});
    };

    enterEdit = () => {
        //Set the edit mode
        if (this.props.prefs) {
            this.setState({editSettings: this.props.prefs.settings});
        }
    };


    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon
        if (this.props.prefs) {


            //See if we are already in edit mode
            const editMode = !(this.state.editSettings === undefined);

            //Get the settings we are using
            let settings = this.props.prefs.settings;

            //See if we are loading
            const loading = this.props.loading;

            return (
                <Container text>
                    <Loader active={loading}/>
                    {this.getComponent(this.props.prefs.options, settings, 1,
                        (settingGroup: SettingGroup) => {
                            //Make a copy of the current state
                            let newSettingState = {...settingGroup};
                            //Now update the state
                            this.setState({editSettings: newSettingState})
                        }
                    )}

                    {/*Add a button bar to switch between the modes*/}
                    <Button.Group style={{marginBottom: "50px"}}>
                        {editMode &&
                            <Button secondary onClick={this.cancelChanges}>Cancel</Button>
                        }
                        {editMode &&
                            <Button primary onClick={this.saveChanges}>Save Changes</Button>
                        }
                        {!editMode &&
                            <Button disabled={loading} onClick={this.enterEdit}>Edit</Button>
                        }
                    </Button.Group>

                </Container>
            );
        } else {
            //Get the animal details
            return (
                <Container text>
                    <Segment>
                        <Loader active/>
                    </Segment>
                </Container>
            );

        }


    }
}


/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: LinkProps): LinkProps {
    return {
        ...myProps,
        user: state.authentication.loggedInUser ? state.authentication.loggedInUser : getEmptyCawsUser(),
        prefs: state.authentication.preferences,
        loading: state.authentication.prefStatus ? state.authentication.prefStatus === AuthenticationStatus.ATTEMPT : false
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
        updateMyInfo: () => dispatch(userActions.updateLoggedInUser()),
        updatePreferences: (settings: SettingGroup) => dispatch(userActions.setUserPreferences(settings))

    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPreferences);
