import Action from '../actions/Action'
import LoggingState from "../state/LoggingState";
import {CategoryInfoSummary, LogSummary} from "../models/Logging";
import {loggingConstants} from "../actions/logging.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function logging(state:LoggingState =
                            {
                                categorySummary:{} as CategoryInfoSummary,
                                loggingSummary:{} as LogSummary
                            }
                            , action:Action): LoggingState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case loggingConstants.FETCH_LOGGING_CAT_SUMMARY:
            //Add the new success to the list
            return {
                ...state,
                categorySummary:action.payload
            };
        case loggingConstants.UPDATE_LOGGING_SUMMARY:
            return {
                ...state,
                loggingSummary:action.payload,
                awaitingUpdate:false
            };
        case loggingConstants.LOG_DELETED_ATTEMPT:
        case loggingConstants.LOG_ADDED_ATTEMPT:
            return {
                ...state,
                awaitingUpdate:true
            };
        default:
            return state
    }
}