import React from 'react';
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

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
}



const PrivateRoute = ({ exclude, component: Component, ...rest }:PrivateRouteProps) => {
    //Check to see if any of the routes are excluded

    if(exclude && exclude.indexOf(rest.location.pathname) > -1){
        //Return null, so we don't render
        return null;
    }

    //Now get the current user
    const currentUser = localStorage.getItem('currentUser');

    //if there is some one logged in continue
    if(currentUser){
        return <Route {...rest} render ={props=>{
            return <Component {...props} />
        }}/>
    }else {
        //Redirect back to login
        return <Route {...rest} render={props => {return <Redirect to={{pathname: '/login'}}/>}}/>

    }



}
//Wrap with a withRouter so we get the current location
export default withRouter<PrivateRouteProps>(props => <PrivateRoute {...props}/>);