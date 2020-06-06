import Action from '../actions/Action'
import ContentState from "../state/ContentState";
import {contentConstants} from "../actions/content.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function content(state:ContentState = {contentListings:{}}, action:Action): ContentState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case contentConstants.FETCH_CONTENT_SUMMARY:
            return {contentListings:{...state.contentListings, [action.payload.category]:action.payload.listing}};
        default:
            return state
    }
}