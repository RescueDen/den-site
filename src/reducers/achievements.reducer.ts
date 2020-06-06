import Action from '../actions/Action'
import AchievementsState from "../state/AchievementsState";
import {achievementsConstants} from "../actions/achievements.actions";

/**
 * The alert reducer maintains a list of alerts
 * @param state
 * @param action
 * @returns {*}
 */
export function achievements(state:AchievementsState = {achievements:{}}, action:Action): AchievementsState {

    //Ok, we now know that it is an alert action
    switch (action.type) {
        case achievementsConstants.FETCH_USER_ACHIEVEMENTS:
            //Copy the hide item state
            const achievementsState = {...state.achievements, ...action.payload};

            //Now update the state
            return {
                ...state,
                achievements:achievementsState
            };

        default:
            return state
    }
}