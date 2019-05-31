import React from 'react';
import {connect} from 'react-redux';

import ApplicationState from "../../../state/ApplicationState";

import {
    Segment,
    Container,
    Header,
    Dimmer,
    Loader,
    Placeholder,
    Dropdown,
    DropdownItemProps
} from "semantic-ui-react";
import CawsUser, {getEmptyCawsUser} from "../../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {userActions} from "../../../actions/user.actions";
import {AchievementData} from "../../../models/Achievements";
import AchievementList from "./AchievementList";
import {achievementsService} from "../../../services/achievements.service";
import FormsSummary, {isFormItemData} from "../../../models/FormsSummary";
import {formsActions} from "../../../actions/forms.actions";
import FormViewer from "../../forms/FormViewer";
import {WidgetProps} from "react-jsonschema-form-semanticui-fixed";


//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user?:CawsUser;
    achievements?:AchievementData[]
    //Define the props we expect
    formsSummary: FormsSummary

}

const badgeFormId = "1De0pmAfbOK44B0oc23UATg6pvTTQ6UYF";


//Also show all possible achievements
interface State {
    allAchievements:AchievementData[]
}

interface DispatchProps{
    //And the actions that must be done
    updateMyInfo: () => any;
    getFormsSummary: () => any;

}

/**
 * This page shows the person Achievements and all possible ones
 */
class Achievements extends React.Component<LinkProps&DispatchProps, State> {
    state={allAchievements:[] as AchievementData[]}

    //Update the user if there are any changes
    componentDidMount(){
        this.props.updateMyInfo();
        this.props.getFormsSummary();

        //Get all possible achievements
        achievementsService.getAllAchievements().then(
            listOf =>{
                this.setState({allAchievements:listOf})
            }

        )

    }

    /**
     * Get the drop down items
     */
    getBadgeItems(): DropdownItemProps[] {
        return this.state.allAchievements.map(ach =>{
            return   {
                text: ach.name,
                value: ach.id + ":" + ach.name,
                image: { src: ach.badgeUrl},
            }
        })




    }
    /**
     * Define a custom widget for animalId
     * @param props
     * @constructor
     */
    badgeWidget = (props:WidgetProps) => {
        return (
            <Dropdown
                placeholder='Select Achievement'
                fluid
                selection
                onChange={(event, value) => props.onChange(value.value)}
                value={props.value}
                options={this.getBadgeItems()}
            />
        );
    };

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If undefined show a loading icon
        const badgeRequestForm  = this.props.formsSummary.findArticleItem(badgeFormId)

        //Get the animal details
        return (
            <div>
                <Container text>
                    {/*If we have achievements*/}
                    {this.props.achievements &&
                    <Segment>
                        <Header as="h2">My Achievements</Header>
                        <AchievementList achievements={this.props.achievements}/>
                        {/*Add the form to request information*/}
                        {badgeRequestForm && isFormItemData(badgeRequestForm)  &&
                        <FormViewer
                            key={badgeRequestForm.id + this.state.allAchievements.length }
                            formData={badgeRequestForm}
                            formWidgets={{"badgeWidget":this.badgeWidget} }
                        />
                        }
                    </Segment>
                    }
                    {this.state.allAchievements.length > 0 &&
                    <Segment>
                        <Header as="h2">Possible Achievements</Header>
                        <AchievementList achievements={this.state.allAchievements}/>
                    </Segment>
                    }

                    {/*Else show a loading screen*/}
                    {this.state.allAchievements.length == 0 &&
                    <Segment>
                        <Header as="h2">Possible Achievements</Header>
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                        <Placeholder>
                            <Placeholder.Paragraph />
                        </Placeholder>
                    </Segment>
                    }
                </Container>
            </div>
        );

    }
}


/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:LinkProps ):LinkProps {
    return {
        ...myProps,
        user:state.authentication.loggedInUser? state.authentication.loggedInUser : getEmptyCawsUser(),
        achievements:state.authentication.loggedInUser && state.achievements? state.achievements.achievements[state.authentication.loggedInUser.data.asmid] :[],
        formsSummary:state.forms.formsSummary,

    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser()),
        getFormsSummary:() =>  dispatch(formsActions.getFormsSummary())

    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Achievements);
