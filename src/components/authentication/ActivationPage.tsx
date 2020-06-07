import React, {ReactNode} from 'react';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions/user.actions';
import logoImage from "../../assets/logos/xCAWS_logo_noText.png";
import ApplicationState from "../../state/ApplicationState";
import AuthenticationState, {AuthenticationStatus} from "../../state/AuthenticationState";
import {Dispatch} from "redux";
import {Button, Form, Header, Image, Message, Segment} from "semantic-ui-react";
import queryString from 'query-string';

import FullPageForm from "./FullPageForm";


//Define the expected props
interface IncomingProps extends RouteComponentProps<any>{
    //Define the props we expect
    authentication: AuthenticationState;

}

interface DispatchProps{
    //And the actions that must be done
    activateUser: (email:string,activation_token:string ) => any;

}

//Define the expected props
interface MyState{
    email: string,
    token:string,
    submitted:boolean
}



/**
 * This page is designed to allow user to login
 */
class ActivationPage extends React.Component<IncomingProps&DispatchProps, MyState> {
    state = {
        email:'',
        token:'',
        submitted:false
    }


    //After the component mounted, copy the params into state
    componentDidMount(){
        //Get the query string
        const string = this.props.location.search;

        //Get the params
        const params = queryString.parse(string)

        //If there is a token
        if(params.token){
            this.setState({token:params.token.toString()})
        }
        if(params.email){
            this.setState({email:params.email.toString()})
        }


    }

    //When the user is done with the form add it
    handleSubmit(e: React.FormEvent) {
        //Normal prevent default to prevent page from reloading
        e.preventDefault();

        //Extract the user name from the local
        const { email, token } = this.state;

        //Use the action
        if (email && token) {
            this.props.activateUser(email, token);
        }
    }

    /**
     * Re-render eveyr time this is called
     * @returns {*}
     */
    render() {

        //If the user has activated in redirect them to root
        if(this.props.authentication.activatedUserStatus === AuthenticationStatus.TRUE){
            return <Redirect to={{ pathname: '/login'}} />;
        }


        const { email, token, submitted } = this.state;

        //Determine if we are in an error state and what it is
        let errorState = false;
        let msg:ReactNode[] = [];

        //Make sure the user set the password
        if (submitted && !email){
            errorState = true;
            msg.push(<div>Email is required!</div> )
        }
        //Check for password
        if (submitted && !token){
            errorState = true;
            msg.push(<div>Token is required</div> )
        }

        return (
            //Setup the page to take up the entire page
            <FullPageForm>
                <Header as='h2' textAlign='center'>
                    <Image src={logoImage} />
                    Activate your account
                </Header>

                {/*Now add the required values to the form*/}
                <Form error={errorState} size='large' onSubmit={e => this.handleSubmit(e)}>
                    {/*Stacked segments*/}
                    <Segment stacked>
                        <Form.Input fluid icon='user' error={submitted && !email} iconPosition='left' placeholder='E-mail address' value={email} onChange={(e) => this.setState({email:e.target.value})}/>
                        <Form.Input fluid  error={submitted && !token} iconPosition='left' placeholder='Token' value={this.state.token} onChange={(e) => this.setState({token:e.target.value})}/>

                        <Button disabled={this.props.authentication.activatedUserStatus == AuthenticationStatus.ATTEMPT} fluid size='large' primary>
                            Activate
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
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,props:IncomingProps ): IncomingProps {
    return {
        ...props,
        authentication: state.authentication
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): {} {

    return {
        activateUser:(email:string, activation_token:string) => dispatch(userActions.activate(email, activation_token)),

    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivationPage);
