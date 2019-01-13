/**
 * This model describes the current
 */
import {FeedItemData} from "../models/Feed";

export default interface FeedState {
    feedShown: boolean
    feedItems:FeedItemData[]

}

