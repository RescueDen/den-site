import {clearByMessage, error, success} from './alert.actions';
import {Action, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {contentService} from "../services/content.service";
import {loggingService} from "../services/logging.service";
import {LogData} from "../models/Logging";
import {formatDate} from "../utils/date-formater";

export const loggingConstants = {
    FETCH_LOGGING_CAT_SUMMARY: 'FETCH_LOGGING_CAT_SUMMARY',
    UPDATE_LOGGING_SUMMARY: 'UPDATE_LOGGING_SUMMARY',
    LOG_DELETED_ATTEMPT: 'LOG_DELETED_ATTEMPT',
    LOG_ADDED_ATTEMPT: 'LOG_ADDED_ATTEMPT',

};

export const loggingActions = {
    getCategorySummary,
    getLogSummary,
    addLog,
    removeLog
    // getAll,
    // delete: _delete
};

/**
 * Update the logging category summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getCategorySummary(): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        loggingService.getCategorySummary()
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: loggingConstants.FETCH_LOGGING_CAT_SUMMARY,
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

/**
 * Update the logging category summary
 * @param username
 * @param password
 * @returns {Function}
 */
function getLogSummary(asmId:number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        //Ask the user service to login
        loggingService.getLogSummary(asmId)
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: loggingConstants.UPDATE_LOGGING_SUMMARY,
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

/**
 * Update the logging category summary
 * @param username
 * @param password
 * @returns {Function}
 */
function addLog(log: LogData): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        dispatch({
            type: loggingConstants.LOG_ADDED_ATTEMPT,
        })

        //Ask the user service to login
        loggingService.addLog(log)
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: loggingConstants.UPDATE_LOGGING_SUMMARY,
                        payload: sum
                    });

                    //Build the alert messaged
                    const msg = "Log added for " + formatDate(log.date);
                    //Also dispatch a success message
                    dispatch(success(msg));

                    //After so many seconds dismiss it
                    setTimeout(() => {dispatch(clearByMessage(msg))}, 1000);

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


/**
 * Remove log
 * @param username
 * @param password
 * @returns {Function}
 */
function removeLog(type:string , logId:number): ThunkAction<any, any,any, any> {
    //Return a function that will be called by dispatch
    return (dispatch:Dispatch<Action>) => {

        dispatch({
            type: loggingConstants.LOG_DELETED_ATTEMPT,
        })

        //Ask the user service to login
        loggingService.removeLog(type, logId)
            .then(
                //If successful a user will be returned
                sum => {
                    //dispatch a login success
                    dispatch({
                        type: loggingConstants.UPDATE_LOGGING_SUMMARY,
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



