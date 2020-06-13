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
    inNeed:new InNeedOfFoster({shelter:[]}),
    busy:false}
    , action:Action): InNeedState {

    switch (action.type) {
        case inNeedConstants.FETCH_INNEEDOFFOSTER:
            return {
                inNeed:action.payload,
                busy:false
            };
        case inNeedConstants.UPLOAD_INNEED_ANIMAL:
            return {
                ...state,
                busy:true
            };
        case inNeedConstants.UPLOADED_INNEED_ANIMAL:

            return {
                ...state,
                inNeed:state.inNeed.addNonShelterAnimalAndCopy(action.payload),
                busy:false
            };
        case inNeedConstants.DELETE_INNEED_ANIMAL:
            return {
                ...state,
                busy:true
            };
        case inNeedConstants.DELETED_INNEED_ANIMAL:

            return {
                ...state,
                inNeed:state.inNeed.removeNonShelterAnimalAndCopy(action.payload),
                busy:false
            };
        default:
            return state
    }
}