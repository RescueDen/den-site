import React from 'react';
import {Redirect, Route, RouteComponentProps, withRouter} from 'react-router-dom';
import ApplicationState from "../../state/ApplicationState";
import ShelterUser from "../../models/ShelterUser";
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
interface PrivateRouteProps extends RouteComponentProps<any> {
    exclude: string[]
    path: string
    component: any
    reqPermission?: string

    //Define the props we expect
    currentUser?: ShelterUser;
    permissions?: Permissions;

    //Redirect to
    to: string;
    exactRoute?: boolean;
}


const Includes = (pathname: string, exclude: string[]): boolean => {
    for (let testPath of exclude) {
        if (pathname.startsWith(testPath)) {
            return true;
        }
    }
    return false;
}

const PrivateRouteWithOutState = ({
                                      exactRoute,
                                      to,
                                      currentUser,
                                      reqPermission,
                                      permissions,
                                      exclude,
                                      component: Component,
                                      ...rest
                                  }: PrivateRouteProps) => {
    //Check to see if any of the routes are excluded

    if (exclude && Includes(rest.location.pathname, exclude)) {
        //Return null, so we don't render
        return null;
    }

    //See if allowed to
    let allowed: boolean;

    //See if we are allowed to
    if (currentUser) {
        //See if we require permissions
        if (reqPermission == undefined) {
            allowed = true;
        } else {
            //See if we are allowed to
            allowed = !!(permissions && permissions.allowed(reqPermission));
        }


    } else {
        //No way
        allowed = false;
    }

    //if there is someone logged in continue
    if (allowed) {
        return <Route exact={exactRoute} {...rest} render={props => {
            return <Component {...props} />
        }}/>
    } else {
        //Redirect back to log in
        return <Route {...rest} render={() => {
            return <Redirect to={{pathname: to}}/>
        }}/>

    }


}

/**
 * Map from the global state to things we need here
 * @param state
 * @param myProps
 */
function mapStateToProps(state: ApplicationState, myProps: PrivateRouteProps): PrivateRouteProps {
    return {
        ...myProps,
        currentUser: state.authentication.loggedInUser,
        permissions: state.authentication.permissions
    };
}

//Wrap with a withRouter so we get the current location
export default withRouter(connect(mapStateToProps)(PrivateRouteWithOutState))
