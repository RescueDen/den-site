import React from 'react';
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import ApplicationState from "../../state/ApplicationState";
import CawsUser from "../../models/CawsUser";
import {connect} from "react-redux";
import Permissions from "../../models/Permissions";

/**
 * This private route renders what was specified or skips it if the user does not have authority
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */


//Define a private route interface for props
interface PrivateRouteProps extends RouteComponentProps{
    exclude: string[]
    path:string
    component:any
    reqPermission?:string

    //Define the props we expect
    currentUser?:CawsUser;
    permissions?:Permissions;

    //Redirect to
    to:string;
    exactRoute?:boolean;
}



const PrivateRouteWithOutState = ({exactRoute, to, currentUser,reqPermission, permissions, exclude, component: Component, ...rest }:PrivateRouteProps) => {
    //Check to see if any of the routes are excluded

    if(exclude && exclude.indexOf(rest.location.pathname) > -1){
        //Return null, so we don't render
        return null;
    }

    //See if allowed to
    let allowed = false;

    //See if we are allowed to
    if (currentUser) {
        //See if we require permissions
        if (reqPermission == undefined){
            allowed = true;
        }else{
            //See if we are allowed to
            if(permissions && permissions.allowed(reqPermission)){
                allowed = true;

            }else{
                allowed = false;

            }


        }


    }else{
        //No way
        allowed = false;
    }

    //if there is some one logged in continue
    if(allowed){
        return <Route exact={exactRoute} {...rest} render ={props=>{
            return <Component {...props} />
        }}/>
    }else {
        //Redirect back to login
        return <Route {...rest} render={props => {return <Redirect to={{pathname: to}}/>}}/>

    }



}
/**
 * Map from the global state to things we need here
 * @param state
 * @returns {{authentication: WebAuthentication}}
 */
function mapStateToProps(state:ApplicationState,myProps:PrivateRouteProps ):PrivateRouteProps {
    return {
        ...myProps,
        currentUser:state.authentication.loggedInUser,
        permissions:state.authentication.permissions
    };
}


const PrivateRoute = connect (
    mapStateToProps
)(PrivateRouteWithOutState);



//Wrap with a withRouter so we get the current location
export default withRouter<PrivateRouteProps>(props => <PrivateRoute {...props}/>);