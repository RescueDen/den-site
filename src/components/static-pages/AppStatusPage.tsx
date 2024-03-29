import React from "react";
import {connect} from "react-redux";
import ApplicationState from "../../state/ApplicationState";
import {ThunkDispatch} from "redux-thunk";
import ShelterUser, {getEmptyCawsUser} from "../../models/ShelterUser";
import {RouteComponentProps} from "react-router";
import {userActions} from "../../actions/user.actions";
import AppStatusWidget from "./AppStatusWidget";
import {Container, Header, Icon, SemanticICONS} from "semantic-ui-react";
import {Link} from "react-router-dom";

//Define the expected props
interface LinkProps extends RouteComponentProps<any> {
    //Define the props we expect
    user:ShelterUser;

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
                <Header as="h2">Getting Started</Header>
                <p>
                    Thank you for your interest in helping CAWS.  We can use help in a variety of ways including volunteering and dog/cat fostering.  If you are interested in helping in one of these ways, please follow the steps below.  The Next Step in each section will update as you complete each step. If this information is not correct, check to make sure the email used to sign-up for this site is the same provided to CAWS.
                </p>
                    {/*volunteering*/}
                <AppStatusWidget
                    user={this.props.user}
                    key='volunteering'
                    icon={<Icon name='hand paper outline'/>}
                    name={"Volunteering"}
                    status={[
                        {
                            name:"Orientation",
                            comment:"learn the ins-and-outs",
                            icon:'university' as SemanticICONS,
                            show:(
                                <p key='volunteer applicant'>We can use all the help we can get!  The first step is learning what is involved in volunteering, where we need, and how you can make a difference. <Link to={'learn/1Xnu06lxx5GB_vn7S8vLW-DCbv048Jf6N'}>Complete the online orientation.</Link>  We can't do this with out you. </p>
                            ),
                            link:"learn/1Xnu06lxx5GB_vn7S8vLW-DCbv048Jf6N"
                        },
                        {
                            name:"Ready to Volunteer",
                            tag:"volunteer",
                            icon:'handshake outline' as SemanticICONS,
                            show:(
                                <p key='volunteer'>Thank you for completing orientation. It is time to help! Check the Volunteer Opportunities link for the latest places to help.</p>
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
                            comment:"fill out the on-line application",
                            icon:'edit' as SemanticICONS,
                            show:(
                                <p key='Apply and Review'>If you are interested in dog fostering please fill out a <a href="https://caws.org/foster-questionnaire/">foster application</a>. Please allow a few days for review. </p>
                            )
                        },
                        {
                            name:"Orientation",
                            tag:"dog fosterer applicant",
                            comment:"learn the ins-and-outs",
                            icon:'university' as SemanticICONS,
                            show:(
                                <p  key='dog fosterer applicant'>We have reviewed your application and would really appreciate your help. <Link to="learn/1IXKRpTS9fz129Fh2gUp4bksMtw33MMhV">The next step is orientation.</Link>  Once you complete the orientation. wavier it may take a day to process.</p>
                            ),
                            link:"learn/1IXKRpTS9fz129Fh2gUp4bksMtw33MMhV"
                        },
                        {
                            name:"Ready to Foster Dogs",
                            tag:"dog fosterer",
                            icon:'paw' as SemanticICONS,
                            show:(
                                <p  key='dog fosterer'>Thank you for completing orientation. It is time to help! Click the  <Link to={'/inneed'} >in-need </Link> page for dogs that need a foster.</p>
                            )
                        }

                    ]}
                />
                {/*/!*cat Fostering*!/*/}
                {/*<AppStatusWidget*/}
                {/*    user={this.props.user}*/}
                {/*    key='cat fostering'*/}
                {/*    icon={<Icon name='paw'/>}*/}
                {/*    name={"Cat Fostering"}*/}
                {/*    status={[*/}
                {/*        {*/}
                {/*            name:"Apply and Review",*/}
                {/*            comment:"Fill out the on-line application",*/}
                {/*            icon:'edit' as SemanticICONS,*/}
                {/*            show:(*/}
                {/*                <p  key='Apply and Review'>If you are interested in volunteering please fill out a cat <a href="https://caws.org/foster-questionnaire/">foster application</a>. Please allow a few days for review.  </p>*/}
                {/*            )*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name:"Orientation",*/}
                {/*            tag:"cat fosterer applicant",*/}
                {/*            comment:"learn the ins-and-outs",*/}
                {/*            icon:'university' as SemanticICONS,*/}
                {/*            show:(*/}
                {/*                <p  key='cat fosterer applicant'>We have reviewed your application and would really appreciate your help. <Link to="learn/19sXvZvoJE2zXM7b1pyHpCpRAx-SF-gkUhRk-UXZzll4">The next step is orientation.</Link>  Once you complete the orientation. wavier it may take a day to process.</p>*/}
                {/*            )*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name:"Ready to Foster Cats",*/}
                {/*            tag:"cat fosterer",*/}
                {/*            icon:'paw' as SemanticICONS,*/}
                {/*            show:(*/}
                {/*                <p  key='cat fosterer'>Thank you for completing orientation. It is time to help! Click the  <Link to={'/inneed'} >in-need </Link> page for cats that need a foster.</p>*/}
                {/*            )*/}
                {/*        }*/}

                {/*    ]}*/}
                {/*/>*/}

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
