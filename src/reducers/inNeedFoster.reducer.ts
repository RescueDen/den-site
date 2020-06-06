import Action from '../actions/Action'
import InNeedOfFoster from "../models/InNeedOfFosterModel";
import {inNeedConstants} from "../actions/inNeedFoster.actions";
import InNeedState from "../state/InNeedState";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function inNeedFoster(state:InNeedState = {
    inNeed:new InNeedOfFoster({from_database:[]}, ""),
    busy:false}
    , action:Action): InNeedState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case inNeedConstants.FETCH_INNEEDOFFOSTER:
            //Add the new success to the list
            return {
                inNeed:action.payload,
                busy:false
            };
        case inNeedConstants.UPLOAD_INNEED_ANIMAL:
            //Add the new success to the list
            return {
                ...state,
                busy:true
            };
        case inNeedConstants.DELETE_INNEED_ANIMAL:
            //Add the new success to the list
            return {
                ...state,
                busy:true
            };
        default:
            return state
    }
}