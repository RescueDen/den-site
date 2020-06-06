import Action from '../actions/Action'
import CawsAnimal from "../models/ShelterAnimal"
import {animalConstants} from "../actions/animal.actions";
import AnimalState from "../state/AnimalState";
import InfoState from "../state/InfoState";
import ArticlesSummary from "../models/ArticlesSummary";
import {infoConstants} from "../actions/info.actions";
import LoggingState from "../state/LoggingState";
import {CategoryInfoSummary, LogSummary} from "../models/Logging";
import {loggingActions, loggingConstants} from "../actions/logging.actions";

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