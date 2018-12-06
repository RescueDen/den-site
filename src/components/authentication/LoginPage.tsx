import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import logoImage from "../../assets/logos/xCAWS_logo_noText.png";
import backGroundImage from "../../assets/pictures/loginImage.jpg";

import ApplicationState from "../../state/ApplicationState";
import {Header, Grid, Image,Form , Segment, Button, Message} from 'semantic-ui-react'

import AuthenticationState, {AuthenticationStatus} from "../../state/AuthenticationState";
import {Dispatch} from "redux";


//Define the expected props
interface IncomingProps{
    //Define the props we expect
    authentication: AuthenticationState;

}

interface DispatchProps{
    //And the actions that must be done
    userActionLogout: () => any;
    userActionLogin: (email:string, password:string) => any;
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
            this.props.userActionLogin(email, password);
        }
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

        const { email, password } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src={logoImage} /> Log-in to your CAWS account
                    </Header>
                    <Form size='large' onSubmit={e => this.handleSubmit(e)}>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={email} onChange={(e) => this.setState({email:e.target.value})}/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password} onChange={(e) => this.setState({password:e.target.value})}
                            />

                            <Button  fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>



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
        userActionLogin:(email:string, password:string) => dispatch(userActions.login(email, password)),
        userActionLogout:() => dispatch(userActions.logout()),
    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(LoginPage);
