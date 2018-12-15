import Action from "../actions/Action";
import AuthenticationState, {AuthenticationStatus} from "../state/AuthenticationState";
import {userConstants} from "../actions/user.actions";
import CawsUser from "../models/CawsUser";
import Permissions from "../models/Permissions";

//When the program first starts up we don't know the status of the user logged in.
let initialState:AuthenticationState = {};

//Check the local storage first
let userString = localStorage.getItem('currentUser');
let permString = localStorage.getItem('currentPermissions');

if(userString && permString) {
    let user = JSON.parse(userString);
    let perm = JSON.parse(permString);
    //    initialState = user ? {loggedIn: true, payload: new User()} : {};

    initialState = {
        loggedInUser: new CawsUser(user),
        loggedInStatus: AuthenticationStatus.TRUE,
        permissions: new Permissions(perm),
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
                ...initialState,
                loggedInStatus:AuthenticationStatus.ATTEMPT,
                loggedInUser: action.payload as CawsUser
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...initialState,
                loggedInStatus:AuthenticationStatus.TRUE,
                loggedInUser: action.payload as CawsUser
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...initialState,
                loggedInStatus:AuthenticationStatus.FALSE,
                loggedInUser: undefined,
                loggedInMsg: action.payload
            };
        case userConstants.LOGOUT:
            return {
                ...initialState,
                loggedInStatus:AuthenticationStatus.FALSE,
                loggedInUser: undefined,
                permissions:undefined
            };
        /////////////////////
        case userConstants.REGISTER_REQUEST:
            return {
                ...initialState,
                registerUserStatus:AuthenticationStatus.ATTEMPT,
                registerUserMsg: ""
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...initialState,
                registerUserStatus:AuthenticationStatus.TRUE,
                registerUserMsg: action.payload
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...initialState,
                registerUserStatus:AuthenticationStatus.FALSE,
                registerUserMsg: action.payload
            };
        /////////////////////
        case userConstants.ACTIVATION_REQUEST:
            return {
                ...initialState,
                activatedUserStatus:AuthenticationStatus.ATTEMPT,
                activatedUserMsg: ""
            };
        case userConstants.ACTIVATION_SUCCESS:
            return {
                ...initialState,
                activatedUserStatus:AuthenticationStatus.TRUE,
                activatedUserMsg: action.payload
            };
        case userConstants.ACTIVATION_FAILURE:
            return {
                ...initialState,
                activatedUserStatus:AuthenticationStatus.FALSE,
                activatedUserMsg: action.payload
            };
        /////////////////////
        case userConstants.PW_RESET_REQUEST:
            return {
                ...initialState,
                pwResetStatus:AuthenticationStatus.ATTEMPT,
                pwResetUserMsg: ""
            };
        case userConstants.PW_RESET_SUCCESS:
            return {
                ...initialState,
                pwResetStatus:AuthenticationStatus.TRUE,
                pwResetUserMsg: action.payload
            };
        case userConstants.PW_RESET_FAILURE:
            return {
                ...initialState,
                pwResetStatus:AuthenticationStatus.FALSE,
                pwResetUserMsg: action.payload
            };
        //Update the permissions
        case userConstants.FETCH_PERMISSIONS:
            return {
                ...initialState,
                permissions: action.payload
            };

        default:
            return state
    }
}