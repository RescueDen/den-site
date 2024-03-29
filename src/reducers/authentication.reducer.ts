import Action from "../actions/Action";
import AuthenticationState, {AuthenticationStatus} from "../state/AuthenticationState";
import {userConstants} from "../actions/user.actions";
import ShelterUser from "../models/ShelterUser";
import Permissions from "../models/Permissions";

//When the program first starts up we don't know the status of the user logged in.
let initialState:AuthenticationState = {};

//Check the local storage first
let userString = localStorage.getItem('currentUser');
let permString = localStorage.getItem('currentPermissions');
let userPref = localStorage.getItem('currentPreferences');

if(userString && permString && userPref) {
    let user = JSON.parse(userString);
    let perm = JSON.parse(permString);
    //    initialState = user ? {loggedIn: true, payload: new User()} : {};

    initialState = {
        loggedInUser: new ShelterUser(user),
        loggedInStatus: AuthenticationStatus.TRUE,
        permissions: new Permissions(perm),
        preferences: JSON.parse(userPref),
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
                ...state,
                loggedInStatus:AuthenticationStatus.ATTEMPT,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedInStatus:AuthenticationStatus.TRUE,
                loggedInUser: action.payload as ShelterUser
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggedInStatus:AuthenticationStatus.FALSE,
                loggedInUser: undefined,
                loggedInMsg: action.payload
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                loggedInStatus:AuthenticationStatus.FALSE,
                loggedInUser: undefined,
                permissions:undefined
            };
        /////////////////////
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registerUserStatus:AuthenticationStatus.ATTEMPT,
                registerUserMsg: ""
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registerUserStatus:AuthenticationStatus.TRUE,
                registerUserMsg: action.payload
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registerUserStatus:AuthenticationStatus.FALSE,
                registerUserMsg: action.payload
            };
        /////////////////////
        case userConstants.ACTIVATION_REQUEST:
            return {
                ...state,
                activatedUserStatus:AuthenticationStatus.ATTEMPT,
                activatedUserMsg: ""
            };
        case userConstants.ACTIVATION_SUCCESS:
            return {
                ...state,
                activatedUserStatus:AuthenticationStatus.TRUE,
                activatedUserMsg: action.payload
            };
        case userConstants.ACTIVATION_FAILURE:
            return {
                ...state,
                activatedUserStatus:AuthenticationStatus.FALSE,
                activatedUserMsg: action.payload
            };
        /////////////////////
        case userConstants.PW_RESET_REQUEST:
            return {
                ...state,
                pwResetStatus:AuthenticationStatus.ATTEMPT,
                pwResetUserMsg: ""
            };
        case userConstants.PW_RESET_SUCCESS:
            return {
                ...state,
                pwResetStatus:AuthenticationStatus.TRUE,
                pwResetUserMsg: action.payload
            };
        case userConstants.PW_RESET_FAILURE:
            return {
                ...state,
                pwResetStatus:AuthenticationStatus.FALSE,
                pwResetUserMsg: action.payload
            };
        /////////////////////
        case userConstants.ONETIMEPASSWORD_REQUEST:
            return {
                ...state,
                oneTimePasswordStatus:AuthenticationStatus.ATTEMPT,
            };
        case userConstants.ONETIMEPASSWORD_SUCCESS:
            return {
                ...state,
                oneTimePasswordStatus:AuthenticationStatus.TRUE,
            };
        case userConstants.ONETIMEPASSWORD_REQUEST:
            return {
                ...state,
                oneTimePasswordStatus:AuthenticationStatus.FALSE,
            };

        //Update the permissions
        case userConstants.FETCH_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };
        /////////////////////////////
        //Update the user pref
        case userConstants.FETCH_USERPREF:
            return {
                ...state,
                preferences: action.payload,
                prefStatus:undefined

            };
        case userConstants.UPDATE_USERPREF:
            return {
                ...state,
                prefStatus: AuthenticationStatus.ATTEMPT,
            };

        default:
            return state
    }
}