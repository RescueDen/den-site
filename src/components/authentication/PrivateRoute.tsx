import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';


/**
 * This private route renders what was specified or skips it if the user does not have authority
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */

const PrivateRoute = ({ component: Component, ...rest }:any) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('currentUser')
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}}/>
        )}/>
    );
}

export default PrivateRoute;