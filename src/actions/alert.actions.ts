import Action from "./Action";
import {Alert, AlertType} from "../models/Alert";

export const alertConstants = {
    ACTION_SUCCESS: 'ALERT_SUCCESS',
    ACTION_ERROR: 'ALERT_ERROR',
    ACTION_CLEAR: 'ALERT_CLEAR'
};


/**
 * Create new success message
 * @param message
 */
export function success(message: string): Action {
    return {
        type: alertConstants.ACTION_SUCCESS,
        payload: new Alert(AlertType.POSITIVE, message)

    };
}

export function error(message: string): Action {
    return {
        type: alertConstants.ACTION_ERROR,
        payload: new Alert(AlertType.NEGATIVE, message)

    };
}

export function clearAll(): Action {
    return {
        type: alertConstants.ACTION_CLEAR,
        payload: undefined
    };
}

export function clear(alert: Alert): Action {
    return {
        type: alertConstants.ACTION_CLEAR,
        payload: alert
    };
}