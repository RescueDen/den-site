import React, {ReactNode} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import logoImage from "../../assets/logos/xCAWS_logo_noText.png";

import ApplicationState from "../../state/ApplicationState";
import {Button, Form, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'

import AuthenticationState, {AuthenticationStatus} from "../../state/AuthenticationState";
import {Dispatch} from "redux";
import FullPageForm from "./FullPageForm";
// @ts-ignore
import {organizationService} from "../../services/organization.service";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

//Define the expected props
interface IncomingProps {
    //Define the props we expect
    authentication: AuthenticationState;

}

interface DispatchProps {
    //And the actions that must be done
    userActionLogout: () => any;
    userEmailLogin: (email: string, organizationId: number) => any;
    userActionLoginGoogle: (googleToken: any) => any;
}

//Define the expected props
interface MyState {
    email: string,
    submitted: boolean
}


class LoginPage extends React.Component<IncomingProps & DispatchProps, MyState> {
    state = {
        email: '',
        submitted: false
    }

    componentDidMount() {
        // reset login status
        this.props.userActionLogout();
    };

    responseGoogle = (response: any) => {
        //See if there is an access token
        this.props.userActionLoginGoogle(response);
    }

    //When the user is done with the form add it
    handleSubmit(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Update the state to say it was submitted
        this.setState({submitted: true});

        //Extract the user name from the local
        const {email} = this.state;

        //Use the action
        if (email) {
            this.props.userEmailLogin(email, organizationService.getCurrentOrganizationId());
        }
    }

    render() {
        //If the user has logged in redirect them to root
        if (this.props.authentication.loggedInStatus === AuthenticationStatus.TRUE) {
            return <Redirect to={{pathname: '/'}}/>;
        }

        const {email, submitted} = this.state;

        //Determine if we are in an error state and what it is
        let errorState = false;
        let msg: ReactNode[] = [];

        //Make sure the user set the password
        if (submitted && !email) {
            errorState = true;
            msg.push(<div>Email is required!</div>)
        }

        return (
            //Setup the page to take up the entire page
            <FullPageForm>
                <Header as='h2' textAlign='center'>
                    <Image src={logoImage}/>
                    Log-in to your account
                </Header>
                <p>
                    Welcome to the RescueDen. Login by getting an link in your email, Den UserName and Password or
                    Google.
                </p>

                {/*Now add the required values to the form*/}
                <Form error={errorState} size='large' onSubmit={e => this.handleSubmit(e)}>
                    {/*Stacked segments*/}
                    <Segment stacked>
                        <Form.Input fluid icon='user' error={submitted && !email} iconPosition='left'
                                    placeholder='E-mail address' value={email}
                                    onChange={(e) => this.setState({email: e.target.value})}/>
                        <Button
                            disabled={this.props.authentication.loggedInStatus === AuthenticationStatus.ATTEMPT || this.props.authentication.oneTimePasswordStatus === AuthenticationStatus.ATTEMPT}
                            fluid size='large' primary>
                            send login link to email
                        </Button>
                        <Message error>
                            {msg}
                        </Message>

                    </Segment>
                </Form>
                <br/>
                <p>or select one of the following methods to login</p>

                {/*Keep all of the buttons in a group to make it look nice*/}
                <Button.Group>
                    <Link className="ui blue button" to="/loginpassword">Email & Password</Link>
                    <GoogleOAuthProvider
                        clientId="600827371850-7vvj7b0immtj6pa5sm02fplpgvnhmp8t.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={this.responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                    </GoogleOAuthProvider>
                </Button.Group>

                {/*Add a help button*/}
                <br/><br/>
                <Link to="/loginhelp" className="ui button"><Icon name='help circle'/>Help</Link>
            </FullPageForm>


        );
    }
}

/**
 * Map from the global state to things we need here
 * @param state
 */
function mapStateToProps(state: ApplicationState): IncomingProps {
    return {
        authentication: state.authentication
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): {} {

    return {
        userEmailLogin: (email: string, organizationId: number) => dispatch(userActions.requestOneTimePassword(email, organizationId)),
        userActionLogout: () => dispatch(userActions.logout()),
        userActionLoginGoogle: (googleToken: any) => dispatch(userActions.loginGoogle(googleToken))
    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
