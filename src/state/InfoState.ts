/**
 * This model describes the authorisation
 */
import {Listing} from "../models/ContentListing";

export default interface InfoState {
    infoSummary: Listing;
    insideSummary?:Listing;
}
