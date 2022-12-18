import React, {ReactNode} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import logoImage from "../../assets/logos/xCAWS_logo_noText.png";
import ApplicationState from "../../state/ApplicationState";
import AuthenticationState, {AuthenticationStatus} from "../../state/AuthenticationState";
import {Dispatch} from "redux";
import FullPageForm from "./FullPageForm";
import {Button, Form, Header, Image, Message, Segment} from "semantic-ui-react";
import {checkPassword} from "../../utils/password-checker";
import {RegisterUserData} from "../../services";
import {organizationService} from "../../services/organization.service";

//Define the expected props
interface IncomingProps {
    //Define the props we expect
    authentication: AuthenticationState;
}

interface DispatchProps {
    //And the actions that must be done
    userActionRegister: (user: RegisterUserData) => any;
}

//Define the expected props
interface MyState {
    email: string,
    password: string,
    passwordCheck: string,
    submitted: boolean
}

/**
 * This page is designed to allow user to login
 */
class RegisterPage extends React.Component<IncomingProps & DispatchProps, MyState> {
    state = {
        email: '', password: '', passwordCheck: '', submitted: false
    }

    //When the user is done with the form add it
    handleSubmit(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Update the state to say it was submitted
        this.setState({submitted: true});

        //Extract the username from the local
        const {email, password, passwordCheck} = this.state;

        //Form a basic little user
        const userData: RegisterUserData = {
            email: email, password: password, organizationId: organizationService.getCurrentOrganizationId()
        }

        //Use the action
        if (email && password && (password === passwordCheck)) {
            this.props.userActionRegister(userData)
        }
    }

    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {
        //If the user has logged in redirect them to root
        if (this.props.authentication.loggedInStatus === AuthenticationStatus.TRUE) {
            return <Redirect to={{pathname: '/'}}/>;
        }
        //If the user has logged in redirect them to root
        if (this.props.authentication.registerUserStatus === AuthenticationStatus.TRUE) {
            return <Redirect to={{pathname: '/login'}}/>;
        }


        //Get the required params
        const {email, password, passwordCheck, submitted} = this.state;

        //Determine if we are in an error state and what it is
        let errorState = false;
        let msg: ReactNode[] = [];

        //Make sure the user set the password
        if (submitted && !email) {
            errorState = true;
            msg.push(<div>Email is required!</div>)
        }

        //Check if there is a password problem
        let passwordError = false;
        let passwordCheckError = false;
        //Check for password
        if (submitted && !password) {
            errorState = true;
            passwordError = true;
            msg.push(<div>A new password is required</div>)
        }
        //Check for password
        if (submitted && (password !== passwordCheck)) {
            errorState = true;
            passwordCheckError = true;

            msg.push(<div>The passwords do not match.</div>)
        }
        //Double-check the passwords
        const passwordProbs = checkPassword(this.state.password);
        if (submitted && passwordProbs.length > 0) {
            errorState = true;
            passwordError = true;

            passwordProbs.forEach(pb => msg.push(<div>{pb}</div>))
        }


        return (//Set up the page to take up the entire page
            <FullPageForm>
                <Header as='h2' textAlign='center'>
                    <Image src={logoImage}/>
                    Register New Account
                </Header>

                {/*Now add the required values to the form*/}
                <Form error={errorState} size='large' onSubmit={e => this.handleSubmit(e)}>
                    {/*Stacked segments*/}
                    <Segment stacked>
                        <Form.Input fluid icon='user' error={submitted && !email} iconPosition='left'
                                    placeholder='E-mail address' value={email}
                                    onChange={(e) => this.setState({email: e.target.value})}/>
                        <Form.Input
                            error={passwordError}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password} onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <Form.Input
                            error={passwordCheckError}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={passwordCheck} onChange={(e) => this.setState({passwordCheck: e.target.value})}
                        />
                        <Button disabled={this.props.authentication.registerUserStatus === AuthenticationStatus.ATTEMPT}
                                fluid size='large' primary>
                            Register
                        </Button>
                        <Message error>
                            {msg}
                        </Message>

                    </Segment>
                </Form>

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
        userActionRegister: (user: RegisterUserData) => dispatch(userActions.register(user)),
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
