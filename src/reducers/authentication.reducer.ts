import {UserData} from '../models/UserData';
import Action from "../actions/Action";
import AuthenticationState, {AuthenticationStatus} from "../state/AuthenticationState";
import {userConstants} from "../actions/user.actions";
import CawsUser from "../models/CawsUser";

//When the program first starts up we don't know the status of the user logged in.
let initialState:AuthenticationState = {};

//Check the local storage first
let userString = localStorage.getItem('currentUser');
if(userString) {
    let user = JSON.parse(userString);
    //    initialState = user ? {loggedIn: true, payload: new User()} : {};

    initialState = {
        loggedInUser: new CawsUser(user),
        loggedInStatus: AuthenticationStatus.TRUE
    }
}

/**
 * The reducer updates the authentication state
 * @param state
 * @param action
 * @returns {*}
 */
export function authentication(state:AuthenticationState = initialState, action:Action): AuthenticationState  {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedInStatus:AuthenticationStatus.ATTEMPT,
                loggedInUser: action.payload as CawsUser
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedInStatus:AuthenticationStatus.TRUE,
                loggedInUser: action.payload as CawsUser
            };
        case userConstants.LOGIN_FAILURE:
            return {
            };
        case userConstants.LOGOUT:
            return {
            };
        default:
            return state
    }
}