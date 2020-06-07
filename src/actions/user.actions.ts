import {RegisterUserData, userService} from '../services';
import {error, success} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {extractMessageFromPossibleServerResponseStatus} from "../models/ServerStatus";
import {achievementsActions} from "./achievements.actions";
import {SettingGroup} from "../models/UserPreferences";
import ShelterUser from "../models/ShelterUser";
import {animalActions} from "./animal.actions";


export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    ONETIMEPASSWORD_REQUEST: 'ONETIMEPASSWORD_REQUEST',
    ONETIMEPASSWORD_SUCCESS: 'ONETIMEPASSWORD_SUCCESS',
    ONETIMEPASSWORD_FAILURE: 'ONETIMEPASSWORD__FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    ACTIVATION_REQUEST: 'USERS_ACTIVATION_REQUEST',
    ACTIVATION_SUCCESS: 'USERS_ACTIVATION_SUCCESS',
    ACTIVATION_FAILURE: 'USERS_ACTIVATION_FAILURE',

    PW_RESET_REQUEST: 'PW_RESET_REQUEST',
    PW_RESET_SUCCESS: 'PW_RESET_SUCCESS',
    PW_RESET_FAILURE: 'PW_RESET_FAILURE',

    FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',

    FETCH_USERPREF: 'FETCH_USERPREF',
    UPDATE_USERPREF: 'UPDATE_USERPREF',

    LOGOUT: 'USERS_LOGOUT',
};

export const userActions = {
    login,
    logout,
    register,
    requestActivationToken,
    activate,
    requestEmailReset,
    forcePasswordChange,
    updateLoggedInUser,
    loginFacebook,
    loginGoogle,
    setUserPreferences,
    requestOneTimePassword,
    loginWithOneTimePassword
};

/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function login(email:string, password:string, organizationId:number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.LOGIN_REQUEST,
        });

        //Ask the user service to login
        userService.login(email, password, organizationId)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });
                    //get the other user info
                    getOtherUserInfo(dispatch, user);
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: message
                    });

                    //Dispatch a success message
                    dispatch(error(message));
                }
            );
    };
}


/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function loginFacebook(facebookToken :any): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.LOGIN_REQUEST,
        });

        //Ask the user service to login
        userService.loginFacebook(facebookToken)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });
                    //get the other user info
                    getOtherUserInfo(dispatch, user);

                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));



                }
            );
    };
}
/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function loginGoogle(googleLogin :any): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.LOGIN_REQUEST,
        });

        //Ask the user service to login
        userService.loginGoogle(googleLogin)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });
                    //get the other user info
                    getOtherUserInfo(dispatch, user);
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));



                }
            );
    };
}

function requestOneTimePassword(email:string, organizationId: number): ThunkAction<any, any,any, any> {
    //Return a function that takes a dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.ONETIMEPASSWORD_REQUEST,
        });
        //Now ask the userService to register
        userService.requestOneTimePassword(email, organizationId)
            .then(
                response =>{
                    //If the status is true, the new user was created
                    if(response.status){
                        //Dispatch a success message
                        dispatch(success(response.message))
                        dispatch({
                            type: userConstants.ONETIMEPASSWORD_SUCCESS,
                        });
                    }else{

                        //Dispatch a sucess message
                        dispatch(error(response.message))
                    }
                },
                //If we get an error back
                errorResponse => {
                    dispatch({
                        type: userConstants.ONETIMEPASSWORD_FAILURE,
                    });

                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };
}


function loginWithOneTimePassword(email:string, token:string,  organizationId: number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.LOGIN_REQUEST,
        });

        //Ask the user service to login
        userService.loginWithOneTimePassword(email, token, organizationId)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });
                    //get the other user info
                    getOtherUserInfo(dispatch, user);
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };
}
/**
 * Now update the user permissions
 * @param username
 * @param password
 * @returns {Function}
 */
function updateUserPermissions(dispatch:Dispatch<Action>): void {

    //Ask the user service to login
    userService.getLoggedInUserPermissions()
        .then(
            //If successful a user will be returned
            perm => {
                //dispatch a login success
                dispatch({
                    type: userConstants.FETCH_PERMISSIONS,
                    payload: perm
                });
            },
            //If there was an error, dispatch a login failure and alert the user why
            errorResponse => {
                //Get the message
                const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                //Dispatch a sucess message
                dispatch(error(message));
            }
        );
}

/**
 * Now update the user pref
 * @param username
 * @param password
 * @returns {Function}
 */
function updateUserPreferences(dispatch:Dispatch<Action>): void {

    //Ask the user service to login
    userService.getLoggedInUserPreferences()
        .then(
            //If successful a user will be returned
            perm => {
                //dispatch a login success
                dispatch({
                    type: userConstants.FETCH_USERPREF,
                    payload: perm
                });
            },
            //If there was an error, dispatch a login failure and alert the user why
            errorResponse => {
                //Get the message
                const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                //Dispatch a sucess message
                dispatch(error(message));



            }
        );
}

/**
 * set the suer preferences on the server
 * @param username
 * @param password
 * @returns {Function}
 */
function setUserPreferences(newSetting:SettingGroup): ThunkAction<any, any,any, any> {

    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //dispatch a login success
        dispatch({
            type: userConstants.UPDATE_USERPREF,
        });

        //Ask the user service to login
        userService.setLoggedInUserPreferences(newSetting)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.FETCH_USERPREF,
                        payload: user
                    });

                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: message
                    });

                }
            );
    };

}

/**
 * download the other user info
 * @param dispatch
 * @param user
 */
function getOtherUserInfo(dispatch:Dispatch<Action>,user:ShelterUser ):void{

    //Now update the user permissions
    updateUserPermissions(dispatch);

    //Update the user pref
    updateUserPreferences(dispatch);

    //Also get this persons achievements
    achievementsActions.getAchievementsWithDispatch(dispatch)

    //Get info for each foster
    if(user.data.currentFosters){
        user.data.currentFosters.forEach(aniId =>{
            animalActions.getAnimalWithDispatch(dispatch, aniId);
        })
    }


}


/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function updateLoggedInUser(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        userService.updateLoggedInUser()
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });

                    //get the other user info
                    getOtherUserInfo(dispatch, user);


                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);
                }
            );
    };
}



/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function activate(email:string, activationToken:string): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.ACTIVATION_REQUEST,
        });

        //Ask the user service to login
        userService.activateUser(email, activationToken)
            .then(
                //If successful a user will be returned
                response => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.ACTIVATION_SUCCESS,
                        payload: response
                    });
                    dispatch(success(response.message))

                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {


                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.ACTIVATION_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };
}

/**
 * This action log outs the user
 * @returns {{simType: string}}
 */
function logout() :Action {
    //Logout is an instant process
    userService.logout();
    //No need to dispatch because this is an instant process
    return { type: userConstants.LOGOUT };
}

/**
 * Register this new user with the system
 * @param user
 * @returns {Function}
 */
function requestActivationToken(email:string): ThunkAction<any, any,any, any> {
    //Return a function that takes a dispatch
    return (dispatch:Dispatch<Action>) => {


        //Now ask the userService to register
        userService.requestActivationToken(email)
            .then(
                response =>{
                    //If the status is true, the new user was created
                    if(response.status){

                        //Dispatch a success message
                        dispatch(success(response.message))
                    }else{

                        //Dispatch a sucess message
                        dispatch(error(response.message))
                    }


                },
                //If we get an error back
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };

}

/**
 * requestEmailReset
 * @param user
 * @returns {Function}
 */
function requestEmailReset(email:string): ThunkAction<any, any,any, any> {
    //Return a function that takes a dispatch
    return (dispatch:Dispatch<Action>) => {


        //Now ask the userService to register
        userService.requestEmailReset(email)
            .then(
                response =>{
                    //If the status is true, the new user was created
                    if(response.status){

                        //Dispatch a success message
                        dispatch(success(response.message))
                    }else{

                        //Dispatch a sucess message
                        dispatch(error(response.message))
                    }


                },
                //If we get an error back
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };

}

/**
 * Function to force a password change with a token
 */
function forcePasswordChange(email:string, reset_token:string, password:string): ThunkAction<any, any,any, any> {
    //Return a function that takes a dispatch
    return (dispatch: Dispatch<Action>) => {

        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.PW_RESET_REQUEST,
        });

        //Ask the user service to login
        userService.forcePasswordChange(email, reset_token, password)
            .then(
                //If successful a user will be returned
                resposne => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.PW_RESET_SUCCESS,
                        payload: resposne
                    });
                    dispatch(success(resposne.message))

                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {


                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.ACTIVATION_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    }
}

/**
 * Register this new user with the system
 * @param user
 * @returns {Function}
 */
function register(user: RegisterUserData): ThunkAction<any, any,any, any> {
    //Return a function that takes a dispatch
    return (dispatch:Dispatch<Action>) => {
        //dispatch the fact we re trying to register
        dispatch(
            //Dispatch a new action
            { type: userConstants.REGISTER_REQUEST,
                payload: user
            }
        );

        //Now ask the userService to register
        userService.registerNewUser(user)
            .then(
                response =>{
                    //If the status is true, the new user was created
                    if(response.status){
                        //dispatch a login success
                        dispatch({
                            type: userConstants.REGISTER_SUCCESS,
                            payload: response.message
                        });

                        //Dispatch a sucess message
                        dispatch(success(response.message))
                    }else{
                        //Else it failed
                        dispatch({
                            type: userConstants.REGISTER_FAILURE,
                            payload: response.message
                        });

                        //Dispatch a sucess message
                        dispatch(error(response.message))
                    }


                },
                //If we get an error back
                errorResponse => {
                    //Get the message
                    const message = extractMessageFromPossibleServerResponseStatus(errorResponse);

                    //Else it failed
                    dispatch({
                        type: userConstants.REGISTER_FAILURE,
                        payload: message
                    });

                    //Dispatch a sucess message
                    dispatch(error(message));
                }
            );
    };

}
