import Action from "./Action";
import {Alert, AlertType} from "../models/Alert";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

export const alertConstants = {
    ACTION_SUCCESS: 'ALERT_SUCCESS',
    ACTION_ERROR: 'ALERT_ERROR',
    ACTION_CLEAR: 'ALERT_CLEAR',
    ACTION_CLEAR_BY_ALERT: 'ACTION_CLEAR_BY_ALERT'

};

/**
 * Create new success message
 * @param message
 */
export function success(message: string): Action {
    return {
        type: alertConstants.ACTION_SUCCESS, payload: new Alert(AlertType.POSITIVE, message)

    };
}

export function error(message: string): Action {
    return {
        type: alertConstants.ACTION_ERROR, payload: new Alert(AlertType.NEGATIVE, message)

    };
}

export function clearByMessage(message: string): Action {
    //After so many seconds dismiss it
    return {
        type: alertConstants.ACTION_CLEAR_BY_ALERT, payload: new Alert(AlertType.POSITIVE, message)
    }
}
export function clear(alert: Alert): Action {
    return {
        type: alertConstants.ACTION_CLEAR, payload: alert
    };
}


/**
 * Update the logging category summary
 * @returns {Function}
 * @param message
 * @param time
 */
export function successAutoDismiss(message: string, time: number): ThunkAction<any, any, any, any> {
    //Return a function that will be called by dispatch
    return (dispatch: Dispatch<Action>) => {

        dispatch(success(message))

        //After so many seconds dismiss it
        setTimeout(() => {
            dispatch(clearByMessage(message))
        }, time);

    };

}