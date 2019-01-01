import React from "react";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import CawsUser, {getEmptyCawsUser} from "../../models/CawsUser";
import {RouteComponentProps} from "react-router";
import {userActions} from "../../actions/user.actions";
import AppStatusWidget from "./AppStatusWidget";
import {Container, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user:CawsUser;

}


interface DispatchProps{
    //And the actions that must be done
    updateMyInfo: () => any;

}

/**
 * Provides a quick summary of that person
 * @param myProps
 * @constructor
 */
class AppStatusPage extends React.Component<LinkProps&DispatchProps> {

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {


        return (
            <Container>
                {/*Add the header info*/}
                <Header as="h2">Application Status</Header>
                <p>
                    Thank you for your interest in helping CAWS.  We can use help in a variety of placing including volunteering and dog/cat fostering.  If you are interested in helping in one of these ways, please follow the steps below.  The Next Step in each section will update as you complete each step. If this information is not correct, check to make sure the email used to sign-up for this site is the same provided to CAWS.
                </p>
                    {/*volunteering*/}
                <AppStatusWidget
                    user={this.props.user}
                    key='volunteering'
                    icon={<Icon name='hand paper outline'/>}
                    name={"Volunteering"}
                    status={[
                        {
                            name:"Apply and Review",
                            show:(
                                <p>We can use all the help we can get. If you are interested in volunteering please fill out a <a href="https://caws.org/volunteer-questionaire/"> volunteer application</a>. Please allow a few days for review. If you have any questions please email volunteers@caws.org</p>
                            )
                        },
                        {
                            name:"Orientation",
                            tag:"volunteer applicant",
                            show:(
                                <p>We have reviewed your application and would really appreciate your help. The next step is orientation.  Once you complete the orientation. wavier it may take a day to process.</p>
                            )
                        },
                        {
                            name:"Ready to Volunteer",
                            tag:"volunteer",
                            show:(
                                <p>Thank you for completing orientation. It is time to help! Check the Volunteer Opportunities link for the latest places to help.</p>
                            )
                        }

                    ]}


                />
                {/*Dog Fostering*/}
                <AppStatusWidget
                    user={this.props.user}
                    key='dog fostering'
                    icon={<Icon name='paw'/>}
                    name={"Dog Fostering"}
                    status={[
                        {
                            name:"Apply and Review",
                            show:(
                                <p>If you are interested in dog fostering please fill out a <a href="https://caws.org/foster-questionnaire/">foster application</a>. Please allow a few days for review. </p>
                            )
                        },
                        {
                            name:"Orientation",
                            tag:"dog fosterer applicant",
                            show:(
                                <p>We have reviewed your application and would really appreciate your help. The next step is orientation.  Once you complete the orientation. wavier it may take a day to process.</p>
                            )
                        },
                        {
                            name:"Ready to Foster Dogs",
                            tag:"dog fosterer",
                            show:(
                                <p>Thank you for completing orientation. It is time to help! Click the  <Link to={'/inneed'} >in-need </Link> page for dogs that need a foster.</p>
                            )
                        }

                    ]}
                />
                {/*cat Fostering*/}
                <AppStatusWidget
                    user={this.props.user}
                    key='cat fostering'
                    icon={<Icon name='paw'/>}
                    name={"Dog Fostering"}
                    status={[
                        {
                            name:"Apply and Review",
                            show:(
                                <p>If you are interested in volunteering please fill out a cat <a href="https://caws.org/foster-questionnaire/">foster application</a>. Please allow a few days for review.  </p>
                            )
                        },
                        {
                            name:"Orientation",
                            tag:"cat fosterer applicant",
                            show:(
                                <p>We have reviewed your application and would really appreciate your help. The next step is orientation.  Once you complete the orientation. wavier it may take a day to process.</p>
                            )
                        },
                        {
                            name:"Ready to Foster Cats",
                            tag:"cat fosterer",
                            show:(
                                <p>Thank you for completing orientation. It is time to help! Click the  <Link to={'/inneed'} >in-need </Link> page for cats that need a foster.</p>
                            )
                        }

                    ]}
                />

            </Container>
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
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any,any, any>):DispatchProps {
    return {
        updateMyInfo:() =>  dispatch(userActions.updateLoggedInUser())
    };

}

//https://stackoverflow.com/questions/48292707/strongly-typing-the-react-redux-connect-with-typescript
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(AppStatusPage);
