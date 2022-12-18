import Action from '../actions/Action'
import FeedState from "../state/FeedState";
import {feedConstants} from "../actions/feed.actions";
import {FeedItemData} from "../models/Feed";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function feed(state: FeedState = {
    feedShown: false,
    feedItems: [] as FeedItemData[]
}, action: Action): FeedState {


    //Ok, we now know that it is an alert action
    switch (action.type) {
        case feedConstants.FEED_TOGGLE:
            return {
                ...state, feedShown: !state.feedShown
            }
        case feedConstants.FEED_UPDATE:
            return {
                ...state, feedItems: action.payload
            }

        default:
            return state
    }
}