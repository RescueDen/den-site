import React, {ReactNode} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import logoImage from "../../assets/logos/xCAWS_logo_noText.png";

import ApplicationState from "../../state/ApplicationState";
import {Header, Grid, Image, Form, Segment, Button, Message, Icon} from 'semantic-ui-react'

import AuthenticationState, {AuthenticationStatus} from "../../state/AuthenticationState";
import {Dispatch} from "redux";
import FullPageForm from "./FullPageForm";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import {organizationService} from "../../services/organization.service";

//Define the expected props
interface IncomingProps{
    //Define the props we expect
    authentication: AuthenticationState;

}

interface DispatchProps{
    //And the actions that must be done
    userActionLogout: () => any;
    userActionLogin: (email:string, password:string, organizationId:number) => any;
    requestActivationToken: (email:string) => any;
    requestEmailReset: (email:string) => any;
    userActionLoginFacebook: (facebookToken:any) => any;
    userActionLoginGoogle: (googleToken:any) => any;
}

//Define the expected props
interface MyState{
    email: string,
    password: string,
    submitted: boolean
}



/**
 * This page is designed to allow user to login
 */
class LoginPage extends React.Component<IncomingProps&DispatchProps, MyState> {
    state = {email:'',
        password:'',
        submitted: false
    }

    /**
     * Gets called once when the page loads
     */
    componentDidMount(){
        // reset login status
        this.props.userActionLogout();

    };

    responseFacebook = (response:any) => {
        //See if there is an access token
        if(response.accessToken){
            this.props.userActionLoginFacebook(response);
        }


    }

    responseGoogle = (response:any) => {
        //See if there is an access token
        console.log(response.getAuthResponse())
        if(response.getAuthResponse()){
            this.props.userActionLoginGoogle(response.getAuthResponse());
        }



    }

    signOut = (response:any) => {
        //See if there is an access token
        console.log(response.getAuthResponse())


    }

    //When the user is done with the form add it
    handleSubmit(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Update the state to say it was submitted
        this.setState({ submitted: true });

        //Extract the user name from the local
        const { email, password } = this.state;

        //Use the action
        if (email && password) {
            this.props.userActionLogin(email, password, organizationService.getCurrentOrganizationId());
        }
    }

    //When the user is done with the form add it
    getNewActivationToken(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Update the state to say it was submitted
        this.props.requestActivationToken(this.state.email)
    }

    //When the user is done with the form add it
    getNewRequestEmailReset(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Update the state to say it was submitted
        this.props.requestEmailReset(this.state.email)
    }




    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {
        //If the user has logged in redirect them to root
        if(this.props.authentication.loggedInStatus === AuthenticationStatus.TRUE){
            return <Redirect to={{ pathname: '/'}} />;
        }

        const { email, password, submitted } = this.state;

        //Determine if we are in an error state and what it is
        let errorState = false;
        let msg:ReactNode[] = [];

        //Make sure the user set the password
        if (submitted && !email){
            errorState = true;
            msg.push(<div>Email is required!</div> )
        }
        //Check for password
        if (submitted && !password){
            errorState = true;
            msg.push(<div>Password is required!</div> )
        }
        //See if the user is not activated
        if(this.props.authentication.loggedInStatus == AuthenticationStatus.FALSE && this.props.authentication.loggedInMsg =="user_not_activated"){
            errorState = true;
            msg.push(<div>The user has not been activated. <Button onClick={(e) => this.getNewActivationToken(e) }>Request new activation email.</Button> </div> )

        }



        return (
            //Setup the page to take up the entire page
            <FullPageForm>
                <Header as='h2' textAlign='center'>
                    <Image src={logoImage} />
                    Log-in to your account
                </Header>
                <p>
                    Welcome to the new CAWS Volunteer and Foster Page (now called the den and available at den.caws.org).  If you had an old account you will have to register or login with Google or Facebook using the buttons below.
                </p>

                {/*Now add the required values to the form*/}
                <Form error={errorState} size='large' onSubmit={e => this.handleSubmit(e)}>
                    {/*Stacked segments*/}
                    <Segment stacked>
                        <Form.Input fluid icon='user' error={submitted && !email} iconPosition='left' placeholder='E-mail address' value={email} onChange={(e) => this.setState({email:e.target.value})}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password} onChange={(e) => this.setState({password:e.target.value})}
                        />
                        <Button disabled={this.props.authentication.loggedInStatus == AuthenticationStatus.ATTEMPT} fluid size='large' primary>
                            Login
                        </Button>
                        <Message error>
                            {msg}
                        </Message>

                    </Segment>
                </Form>
                <Message>
                    <Link to="/register" className="ui button">Register</Link>
                    <Button disabled={email.length == 0} onClick={e => this.getNewRequestEmailReset(e)}>
                        Reset Password
                    </Button>

                </Message>
                <br/>
                <p>or Login with Google without creating a new password!</p>

                {/*Keep all of the buttons in a group to make it look nice*/}
                <Button.Group>
                    {/*<FacebookLogin*/}
                    {/*    appId="377460049683618"*/}
                    {/*    autoLoad={false}*/}
                    {/*    scope="email"*/}
                    {/*    fields="email"*/}
                    {/*    callback={this.responseFacebook}*/}
                    {/*    disableMobileRedirect={true}*/}
                    {/*    render={(renderProps:any) => (*/}
                    {/*        <Button color='facebook' onClick={renderProps.onClick}>*/}
                    {/*            <Icon name='facebook' /> Facebook*/}
                    {/*        </Button>*/}
                    {/*    )}*/}

                    {/*/>*/}
                    <GoogleLogin
                        clientId="327122640256-6huu8nsbpa9jtj9u970gregpc9dviuef.apps.googleusercontent.com"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        render={(renderProps:any) => (
                            <Button color='google plus' onClick={renderProps.onClick}>
                                <Icon name='google' /> Google
                            </Button>
                        )}
                    />

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
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState): IncomingProps {
    return {
        authentication: state.authentication
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): {} {

    return {
        userActionLogin:(email:string, password:string, organizationId:number) => dispatch(userActions.login(email, password, organizationId)),
        userActionLogout:() => dispatch(userActions.logout()),
        requestActivationToken: (email:string) => dispatch(userActions.requestActivationToken(email)),
        requestEmailReset: (email:string)  => dispatch(userActions.requestEmailReset(email)),
        userActionLoginFacebook: (facebookToken:any) => dispatch(userActions.loginFacebook(facebookToken)),
        userActionLoginGoogle: (googleToken:any) => dispatch(userActions.loginGoogle(googleToken))
    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(LoginPage);
