import { userService } from '../services';
import { success, error } from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {UserData} from "../models/UserData";
import {animalService} from "../services/animal.service"
import {infoService} from "../services/info.service";

export const infoConstants = {
    FETCH_INFO_SUMMARY: 'FETCH_INFO_SUMMARY',

};

export const infoActions = {
    getInfoSummary,
    // logout,
    // getAll,
    // delete: _delete
};

/**
 * Update the info the summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getInfoSummary(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        infoService.getInfoSummary()
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: infoConstants.FETCH_INFO_SUMMARY,
                        payload: sum
                    });
                },
                //If there was an error, dispatch a login failure and alert the user why
                errorResponse => {
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

