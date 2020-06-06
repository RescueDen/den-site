import {CategoryInfoSummary, LogSummary} from "../models/Logging";

/**
 * This model describes the authorisation
 */
export default interface LoggingStateState {
    categorySummary: CategoryInfoSummary;
    //Store the users summary
    loggingSummary:LogSummary

    //Mark if an awaiting update
    awaitingUpdate?:boolean
}
