import Action from '../actions/Action'
import ContentState from "../state/ContentState";
import {contentConstants} from "../actions/content.actions";

export function content(state: ContentState = {contentListings: {}}, action: Action): ContentState {
    switch (action.type) {
        case contentConstants.FETCH_CONTENT_SUMMARY:
            return {contentListings: {...state.contentListings, [action.payload.category]: action.payload.listing}};
        default:
            return state
    }
}