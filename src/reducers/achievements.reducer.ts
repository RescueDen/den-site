import Action from '../actions/Action'
import AchievementsState from "../state/AchievementsState";
import {achievementsConstants} from "../actions/achievements.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function achievements(state:AchievementsState = {achievements:[]}, action:Action): AchievementsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case achievementsConstants.FETCH_USER_ACHIEVEMENTS:
            return {
                achievements:action.payload
            };
        default:
            return state
    }
}