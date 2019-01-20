import CawsAnimal from "../models/CawsAnimal";
import ArticlesSummary from "../models/ArticlesSummary";
import FormsSummary from "../models/FormsSummary";
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
