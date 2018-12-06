import { userService } from '../services';
import { success, error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {UserData} from "../models/UserData";


export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    DELETE_REQUEST: 'USERS_DELETE_REQUEST',
    DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
    DELETE_FAILURE: 'USERS_DELETE_FAILURE'
};

export const userActions = {
    login,
    logout,
    register
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * This is the user action to try to log in
 * @param username
 * @param password
 * @returns {Function}
 */
function login(email:string, password:string): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {
        //Dispatch the action of attempting to login
        dispatch({
            type: userConstants.LOGIN_REQUEST,
        });

        //Ask the user service to login
        userService.login(email, password)
            .then(
                //If successful a user will be returned
                user => {
                    //dispatch a login success
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        payload: user
                    });
                    dispatch(success("You logged in!"))

                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
                    //dispatch a login failure
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        payload: errorResponse
                    });
                    //Dispatch the error
                    try {
                        dispatch(error(errorResponse.response.data.message));
                    }catch(e){
                        dispatch(error(errorResponse.toString()));

                    }

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
function register(user: UserData): ThunkAction<any, any,any, any> {
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
                    //Else it failed
                    dispatch({
                        type: userConstants.REGISTER_FAILURE,
                        payload: errorResponse
                    });

                    //Dispatch a sucess message
                    dispatch(error(errorResponse.toString()));
                }
            );
    };

}
